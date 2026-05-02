import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEtiquetaDto } from './dto/create-etiqueta.dto';
import { UpdateEtiquetaDto } from './dto/update-etiqueta.dto';
import { Etiqueta } from './entities/etiqueta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicacionesForo } from 'src/publicaciones_foro/entities/publicaciones_foro.entity';
import { BlogArticulo } from 'src/blog_articulos/entities/blog_articulo.entity';

@Injectable()
export class EtiquetasService {
  constructor(
    @InjectRepository(Etiqueta)
    private readonly etiquetaRepository: Repository<Etiqueta>,
    @InjectRepository(PublicacionesForo)
    private readonly foroRepository: Repository<PublicacionesForo>,
    @InjectRepository(BlogArticulo)
    private readonly blogRepository: Repository<BlogArticulo>,
    
  ) {}

  async create(dto: CreateEtiquetaDto): Promise<Etiqueta> {
    const existing = await this.etiquetaRepository.findOneBy({ nombre: dto.nombre });
    if (existing) return existing;
    const etiqueta = this.etiquetaRepository.create({ nombre: dto.nombre });
    return this.etiquetaRepository.save(etiqueta);
  }

  async findAll(): Promise<Etiqueta[]> {
    return this.etiquetaRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Etiqueta> {
    const e = await this.etiquetaRepository.findOneBy({ id });
    if (!e) throw new NotFoundException(`Etiqueta #${id} no encontrada`);
    return e;
  }

  async remove(id: number): Promise<void> {
    const e = await this.findOne(id);
    await this.etiquetaRepository.remove(e);
  }

  /**
   * Devuelve todas las publicaciones de foro y blogs que tengan la etiqueta indicada.
   * GET /etiquetas/:id/contenido
   */
  async findContenidoByEtiqueta(id: number): Promise<{
    etiqueta: Etiqueta;
    foro: PublicacionesForo[];
    blog: BlogArticulo[];
  }> {
    const etiqueta = await this.findOne(id);

    const foro = await this.foroRepository
      .createQueryBuilder('pf')
      .innerJoin('pf.etiquetas', 'e', 'e.id = :id', { id })
      .leftJoinAndSelect('pf.creador', 'creador')
      .leftJoinAndSelect('pf.etiquetas', 'etiquetas')
      .orderBy('pf.horaCreacion', 'DESC')
      .getMany();

    const blog = await this.blogRepository
      .createQueryBuilder('b')
      .innerJoin('b.etiquetas', 'e', 'e.id = :id', { id })
      .leftJoinAndSelect('b.creador', 'creador')
      .leftJoinAndSelect('b.etiquetas', 'etiquetas')
      .orderBy('b.horaCreacion', 'DESC')
      .getMany();

    return { etiqueta, foro, blog };
  }
}
