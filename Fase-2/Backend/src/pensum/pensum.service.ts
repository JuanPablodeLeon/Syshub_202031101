import { Injectable } from '@nestjs/common';
import { CreatePensumDto } from './dto/create-pensum.dto';
import { UpdatePensumDto } from './dto/update-pensum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pensum } from './entities/pensum.entity';
import { Repository } from 'typeorm';
import { YearPensum } from 'src/year_pensum/entities/year_pensum.entity';
import { Carrera } from 'src/carreras/entities/carrera.entity';
import { CursosDisponible } from 'src/cursos_disponibles/entities/cursos_disponible.entity';

@Injectable()
export class PensumService {
  constructor(
    @InjectRepository(Pensum)
    private pensumRepository: Repository<Pensum>,
    @InjectRepository(YearPensum)
    private yearPensumRepository: Repository<YearPensum>,
    @InjectRepository(Carrera)
    private carreraRepository: Repository<Carrera>,
    @InjectRepository(CursosDisponible)
    private cursosDisponibleRepository: Repository<CursosDisponible>,
    
  ) {}
  create(createPensumDto: CreatePensumDto) {
    return 'This action adds a new pensum';
  }

  findAll() {
    return `This action returns all pensum`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pensum`;
  }

  update(id: number, updatePensumDto: UpdatePensumDto) {
    return `This action updates a #${id} pensum`;
  }

  remove(id: number) {
    return `This action removes a #${id} pensum`;
  }
}
