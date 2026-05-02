import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogArticuloDto } from './dto/create-blog_articulo.dto';
import { UpdateBlogArticuloDto } from './dto/update-blog_articulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogArticulo } from './entities/blog_articulo.entity';
import { In, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Rol } from 'src/common/enums/rol.enum';
import { Etiqueta } from 'src/etiquetas/entities/etiqueta.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { CreateRespuestaDto } from 'src/respuestas/dto/create-respuesta.dto';

const ROLES_PERMITIDOS_CREAR: string[] = [
  Rol.ADMIN,
  Rol.CATEDRATICO,
  Rol.AUXILIAR,
  Rol.INVESTIGADOR,
];

@Injectable()
export class BlogArticulosService {
  constructor(
    @InjectRepository(BlogArticulo)
    private readonly blogArticuloRepository: Repository<BlogArticulo>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Etiqueta)
    private readonly etiquetaRepository: Repository<Etiqueta>,
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
  ) {}
  async create(
    correoUsuario: string,
    dto: CreateBlogArticuloDto,
  ): Promise<BlogArticulo> {
    const creador = await this.usuarioRepository.findOne({
      where: { correo: correoUsuario },
      relations: ['rol'],
    });
    if (!creador) throw new NotFoundException('Usuario no encontrado');

    if (!ROLES_PERMITIDOS_CREAR.includes(creador.rol?.nombre)) {
      throw new ForbiddenException(
        'Tu rol no tiene permiso para crear blogs o artículos',
      );
    }

    const etiquetas = dto.etiquetaIds?.length
      ? await this.etiquetaRepository.findBy({ id: In(dto.etiquetaIds) })
      : [];

    const blog = this.blogArticuloRepository.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      creador,
      etiquetas,
    });

    return this.blogArticuloRepository.save(blog);
  }

  findAll(): Promise<BlogArticulo[]> {
    return this.blogArticuloRepository.find({
      relations: ['creador', 'etiquetas'],
      order: { horaCreacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<BlogArticulo> {
    const blog = await this.blogArticuloRepository.findOne({
      where: { id },
      relations: [
        'creador',
        'etiquetas',
        'respuestas',
        'respuestas.creador',
        'respuestas.subRespuestas',
        'respuestas.subRespuestas.creador',
      ],
    });
    if (!blog) throw new NotFoundException(`Blog/Artículo #${id} no encontrado`);
    return blog;
  }

  async votar(id: number, valor: 1 | -1): Promise<BlogArticulo> {
    const blog = await this.blogArticuloRepository.findOneBy({ id });
    if (!blog) throw new NotFoundException(`Blog/Artículo #${id} no encontrado`);
    blog.cantValoracion += valor;
    return this.blogArticuloRepository.save(blog);
  }

  // ── Agregar respuesta/comentario (cualquier usuario logueado) ─
  async agregarRespuesta(
    id: number,
    correoUsuario: string,
    dto: CreateRespuestaDto,
  ): Promise<BlogArticulo> {
    const blog = await this.blogArticuloRepository.findOne({
      where: { id },
      relations: ['respuestas'],
    });
    if (!blog) throw new NotFoundException(`Blog/Artículo #${id} no encontrado`);

    const creador = await this.usuarioRepository.findOneBy({
      correo: correoUsuario,
    });
    if (!creador) throw new NotFoundException('Usuario no encontrado');

    const respuesta = this.respuestaRepository.create({
      descripcion: dto.descripcion,
      creador,
    });

    if (dto.padreId) {
      const padre = await this.respuestaRepository.findOneBy({
        id: dto.padreId,
      });
      if (!padre)
        throw new NotFoundException(`Respuesta padre #${dto.padreId} no existe`);
      respuesta.padre = padre;
    }

    const saved = await this.respuestaRepository.save(respuesta);
    blog.respuestas = [...(blog.respuestas ?? []), saved];
    return this.blogArticuloRepository.save(blog);
  }

  // ── Editar (solo el creador) ─────────────────────────────────
  async update(
    id: number,
    correoUsuario: string,
    dto: UpdateBlogArticuloDto,
  ): Promise<BlogArticulo> {
    const blog = await this.blogArticuloRepository.findOne({
      where: { id },
      relations: ['creador', 'etiquetas'],
    });
    if (!blog) throw new NotFoundException(`Blog/Artículo #${id} no encontrado`);
    if (blog.creador.correo !== correoUsuario)
      throw new ForbiddenException('Solo el creador puede editar este artículo');

    if (dto.titulo)       blog.titulo       = dto.titulo;
    if (dto.descripcion)  blog.descripcion  = dto.descripcion;

    if (dto.etiquetaIds !== undefined) {
      blog.etiquetas = dto.etiquetaIds.length
        ? await this.etiquetaRepository.findBy({ id: In(dto.etiquetaIds) })
        : [];
    }

    return this.blogArticuloRepository.save(blog);
  }

  // ── Eliminar (solo el creador) ───────────────────────────────
  async remove(id: number, correoUsuario: string): Promise<void> {
    const blog = await this.blogArticuloRepository.findOne({
      where: { id },
      relations: ['creador'],
    });
    if (!blog) throw new NotFoundException(`Blog/Artículo #${id} no encontrado`);
    if (blog.creador.correo !== correoUsuario)
      throw new ForbiddenException(
        'Solo el creador puede eliminar este artículo',
      );
    await this.blogArticuloRepository.softRemove(blog);
  }
}
