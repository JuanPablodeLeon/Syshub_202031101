import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursosDisponibleDto } from './dto/create-cursos_disponible.dto';
import { UpdateCursosDisponibleDto } from './dto/update-cursos_disponible.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CursosDisponible } from './entities/cursos_disponible.entity';
import { Repository } from 'typeorm';
import { Carrera } from 'src/carreras/entities/carrera.entity';

@Injectable()
export class CursosDisponiblesService {
  constructor(
    @InjectRepository(CursosDisponible)
    private readonly cursosDisponibleRepository: Repository<CursosDisponible>,
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>
  ) {}
async create(dto: CreateCursosDisponibleDto): Promise<CursosDisponible> {
    const carrera = await this.carreraRepository.findOneBy({ id: dto.carreraId });
    if (!carrera) throw new NotFoundException(`Carrera #${dto.carreraId} no encontrada`);

    const curso = this.cursosDisponibleRepository.create({
      nombre: dto.nombre,
      codigo: dto.codigo,
      creditos: dto.creditos,
      obligatorio: dto.obligatorio ?? true,
      clar: dto.clar ?? false,
      descripcion: dto.descripcion ?? null,
      carrera,
    });

    return this.cursosDisponibleRepository.save(curso);
  }

  async findAll(): Promise<CursosDisponible[]> {
    return this.cursosDisponibleRepository.find({
      relations: ['carrera'],
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<CursosDisponible> {
    const curso = await this.cursosDisponibleRepository.findOne({
      where: { id },
      relations: ['carrera'],
    });
    if (!curso) throw new NotFoundException(`Curso disponible #${id} no encontrado`);
    return curso;
  }

  async update(id: number, dto: UpdateCursosDisponibleDto): Promise<CursosDisponible> {
    const curso = await this.findOne(id);

    if (dto.carreraId !== undefined) {
      const carrera = await this.carreraRepository.findOneBy({ id: dto.carreraId });
      if (!carrera) throw new NotFoundException(`Carrera #${dto.carreraId} no encontrada`);
      curso.carrera = carrera;
    }

    Object.assign(curso, {
      nombre:      dto.nombre      ?? curso.nombre,
      codigo:      dto.codigo      ?? curso.codigo,
      creditos:    dto.creditos    ?? curso.creditos,
      obligatorio: dto.obligatorio ?? curso.obligatorio,
      clar:        dto.clar        ?? curso.clar,
      descripcion: dto.descripcion ?? curso.descripcion,
    });

    return this.cursosDisponibleRepository.save(curso);
  }

  async remove(id: number): Promise<void> {
    const curso = await this.findOne(id);
    await this.cursosDisponibleRepository.softRemove(curso);
  }
}
