import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicacionesForoDto } from './dto/create-publicaciones_foro.dto';
import { UpdatePublicacionesForoDto } from './dto/update-publicaciones_foro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicacionesForo } from './entities/publicaciones_foro.entity';
import { In, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Etiqueta } from 'src/etiquetas/entities/etiqueta.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { CreateRespuestaDto } from 'src/respuestas/dto/create-respuesta.dto';

@Injectable()
export class PublicacionesForoService {
  constructor(
    @InjectRepository(PublicacionesForo)
    private publicacionesForoRepository: Repository<PublicacionesForo>, 
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
        @InjectRepository(Etiqueta)
    private readonly etiquetaRepository: Repository<Etiqueta>,
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
  ) {}
async create(
    correoUsuario: string,
    dto: CreatePublicacionesForoDto,
  ): Promise<PublicacionesForo> {
    const creador = await this.usuarioRepository.findOneBy({
      correo: correoUsuario,
    });
    if (!creador) throw new NotFoundException('Usuario no encontrado');

    const etiquetas = dto.etiquetaIds?.length
      ? await this.etiquetaRepository.findBy({ id: In(dto.etiquetaIds) })
      : [];

    const pub = this.publicacionesForoRepository.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      creador,
      etiquetas,
    });

    return this.publicacionesForoRepository.save(pub);
  }  

  findAll(): Promise<PublicacionesForo[]> {
    return this.publicacionesForoRepository.find({
      relations: ['creador', 'etiquetas'],
      order: { horaCreacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<PublicacionesForo> {
    const pub = await this.publicacionesForoRepository.findOne({
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
    if (!pub) throw new NotFoundException(`Publicación #${id} no encontrada`);
    return pub;
  }

    async votar(id: number, valor: 1 | -1): Promise<PublicacionesForo> {
    const pub = await this.publicacionesForoRepository.findOneBy({ id });
    if (!pub) throw new NotFoundException(`Publicación #${id} no encontrada`);
    pub.cantValoracion += valor;
    return this.publicacionesForoRepository.save(pub);
  }

  async agregarRespuesta(
    id: number,
    correoUsuario: string,
    dto: CreateRespuestaDto,
  ): Promise<PublicacionesForo> {
    const pub = await this.publicacionesForoRepository.findOne({
      where: { id },
      relations: ['respuestas'],
    });
    if (!pub) throw new NotFoundException(`Publicación #${id} no encontrada`);

    const creador = await this.usuarioRepository.findOneBy({
      correo: correoUsuario,
    });
    if (!creador) throw new NotFoundException('Usuario no encontrado');

    const respuesta = this.respuestaRepository.create({
      descripcion: dto.descripcion,
      creador,
    });

    // Sub-respuesta anidada
    if (dto.padreId) {
      const padre = await this.respuestaRepository.findOneBy({
        id: dto.padreId,
      });
      if (!padre)
        throw new NotFoundException(`Respuesta padre #${dto.padreId} no existe`);
      respuesta.padre = padre;
    }

    const savedRespuesta = await this.respuestaRepository.save(respuesta);
    pub.respuestas = [...(pub.respuestas ?? []), savedRespuesta];
    return this.publicacionesForoRepository.save(pub);
  }

  async update(
    id: number,
    correoUsuario: string,
    dto: UpdatePublicacionesForoDto,
  ): Promise<PublicacionesForo> {
    const pub = await this.publicacionesForoRepository.findOne({
      where: { id },
      relations: ['creador', 'etiquetas'],
    });
    if (!pub) throw new NotFoundException(`Publicación #${id} no encontrada`);
    if (pub.creador.correo !== correoUsuario)
      throw new ForbiddenException('Solo el creador puede editar esta publicación');

    if (dto.titulo)       pub.titulo       = dto.titulo;
    if (dto.descripcion)  pub.descripcion  = dto.descripcion;

    if (dto.etiquetaIds !== undefined) {
      pub.etiquetas = dto.etiquetaIds.length
        ? await this.etiquetaRepository.findBy({ id: In(dto.etiquetaIds) })
        : [];
    }

    return this.publicacionesForoRepository.save(pub);
  }


  async remove(id: number, correoUsuario: string): Promise<void> {
    const pub = await this.publicacionesForoRepository.findOne({
      where: { id },
      relations: ['creador'],
    });
    if (!pub) throw new NotFoundException(`Publicación #${id} no encontrada`);
    if (pub.creador.correo !== correoUsuario)
      throw new ForbiddenException(
        'Solo el creador puede eliminar esta publicación',
      );
    await this.publicacionesForoRepository.softRemove(pub);
  }
}
