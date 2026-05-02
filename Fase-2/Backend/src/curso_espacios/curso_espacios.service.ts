import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoEspacioDto } from './dto/create-curso_espacio.dto';
import { UpdateCursoEspacioDto } from './dto/update-curso_espacio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CursoEspacio } from './entities/curso_espacio.entity';
import { Repository } from 'typeorm';
import { CursosDisponible } from 'src/cursos_disponibles/entities/cursos_disponible.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class CursoEspaciosService {
  constructor(
    @InjectRepository(CursoEspacio)
    private readonly cursoEspacioRepository: Repository<CursoEspacio>,
    @InjectRepository(CursosDisponible)
    private readonly cursosDisponibleRepository: Repository<CursosDisponible>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  async create(dto: CreateCursoEspacioDto): Promise<CursoEspacio> {
    const cursoDisponible = await this.cursosDisponibleRepository.findOneBy({ id: dto.cursoDisponibleId });
    if (!cursoDisponible) throw new NotFoundException(`Curso disponible #${dto.cursoDisponibleId} no encontrado`);

    const catedratico = await this.usuarioRepository.findOne({
      where: { id: dto.catedraticoId },
      relations: ['rol'],
    });
    if (!catedratico) throw new NotFoundException(`Catedrático #${dto.catedraticoId} no encontrado`);
    if (catedratico.rol?.nombre !== 'catedratico')
      throw new BadRequestException('El usuario seleccionado no tiene rol de catedrático');

    // Auxiliares opcionales
    const auxiliares: Usuario[] = [];
    if (dto.auxiliarIds?.length) {
      for (const auxId of dto.auxiliarIds) {
        const aux = await this.usuarioRepository.findOne({ where: { id: auxId }, relations: ['rol'] });
        if (!aux) throw new NotFoundException(`Auxiliar #${auxId} no encontrado`);
        if (aux.rol?.nombre !== 'auxiliar')
          throw new BadRequestException(`El usuario #${auxId} no tiene rol de auxiliar`);
        auxiliares.push(aux);
      }
    }

    const espacio = this.cursoEspacioRepository.create({
      cursoDisponible,
      catedratico,
      auxiliares,
      seccion:  dto.seccion,
      semestre: dto.semestre,
      year:     dto.year,
    });

    return this.cursoEspacioRepository.save(espacio);
  }

  async findAll(): Promise<CursoEspacio[]> {
    return this.cursoEspacioRepository.find({
      relations: ['cursoDisponible', 'cursoDisponible.carrera', 'catedratico', 'auxiliares'],
      order: { year: 'DESC', semestre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<CursoEspacio> {
    const espacio = await this.cursoEspacioRepository.findOne({
      where: { id },
      relations: [
        'cursoDisponible', 'cursoDisponible.carrera',
        'catedratico', 'auxiliares', 'estudiantes',
      ],
    });
    if (!espacio) throw new NotFoundException(`Espacio #${id} no encontrado`);
    return espacio;
  }

  /** Agrega un estudiante por correo al espacio */
  async agregarEstudiantePorCorreo(espacioId: number, correo: string): Promise<CursoEspacio> {
    const espacio = await this.findOne(espacioId);

    const usuario = await this.usuarioRepository.findOneBy({ correo });
    if (!usuario) throw new NotFoundException(`No existe ningún usuario con el correo "${correo}"`);

    const yaInscrito = espacio.estudiantes?.some(e => e.id === usuario.id);
    if (yaInscrito) throw new BadRequestException('El usuario ya está inscrito en este espacio');

    espacio.estudiantes = [...(espacio.estudiantes ?? []), usuario];
    return this.cursoEspacioRepository.save(espacio);
  }

  /** Agrega un auxiliar por correo al espacio */
  async agregarAuxiliarPorCorreo(espacioId: number, correo: string): Promise<CursoEspacio> {
    const espacio = await this.findOne(espacioId);

    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
      relations: ['rol'],
    });
    if (!usuario) throw new NotFoundException(`No existe ningún usuario con el correo "${correo}"`);
    if (usuario.rol?.nombre !== 'auxiliar')
      throw new BadRequestException('El usuario no tiene rol de auxiliar');

    const yaEstaAux = espacio.auxiliares?.some(a => a.id === usuario.id);
    if (yaEstaAux) throw new BadRequestException('El auxiliar ya está en este espacio');

    espacio.auxiliares = [...(espacio.auxiliares ?? []), usuario];
    return this.cursoEspacioRepository.save(espacio);
  }

  /** Devuelve los espacios donde el usuario es catedrático o auxiliar */
  async findByDocente(usuarioId: number): Promise<CursoEspacio[]> {
    return this.cursoEspacioRepository
      .createQueryBuilder('ce')
      .leftJoinAndSelect('ce.cursoDisponible', 'cd')
      .leftJoinAndSelect('cd.carrera', 'carrera')
      .leftJoinAndSelect('ce.catedratico', 'catedratico')
      .leftJoinAndSelect('ce.auxiliares', 'auxiliares')
      .leftJoinAndSelect('ce.estudiantes', 'estudiantes')
      .where('ce.catedratico.id = :id', { id: usuarioId })
      .orWhere('auxiliares.id = :id', { id: usuarioId })
      .orderBy('ce.year', 'DESC')
      .getMany();
  }

  /** Devuelve los espacios donde el usuario es estudiante */
  async findByEstudiante(usuarioId: number): Promise<CursoEspacio[]> {
    return this.cursoEspacioRepository
      .createQueryBuilder('ce')
      .leftJoinAndSelect('ce.cursoDisponible', 'cd')
      .leftJoinAndSelect('cd.carrera', 'carrera')
      .leftJoinAndSelect('ce.catedratico', 'cat')
      .innerJoin('ce.estudiantes', 'est', 'est.id = :id', { id: usuarioId })
      .orderBy('ce.year', 'DESC')
      .getMany();
  }

  async update(id: number, dto: UpdateCursoEspacioDto): Promise<CursoEspacio> {
    const espacio = await this.findOne(id);
    Object.assign(espacio, {
      seccion:  dto.seccion  ?? espacio.seccion,
      semestre: dto.semestre ?? espacio.semestre,
      year:     dto.year     ?? espacio.year,
    });
    return this.cursoEspacioRepository.save(espacio);
  }

  async remove(id: number): Promise<void> {
    const espacio = await this.findOne(id);
    await this.cursoEspacioRepository.remove(espacio);
  }
}
