import { Injectable } from '@nestjs/common';
import { CreateCursosDisponibleDto } from './dto/create-cursos_disponible.dto';
import { UpdateCursosDisponibleDto } from './dto/update-cursos_disponible.dto';

@Injectable()
export class CursosDisponiblesService {
  create(createCursosDisponibleDto: CreateCursosDisponibleDto) {
    return 'This action adds a new cursosDisponible';
  }

  findAll() {
    return `This action returns all cursosDisponibles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cursosDisponible`;
  }

  update(id: number, updateCursosDisponibleDto: UpdateCursosDisponibleDto) {
    return `This action updates a #${id} cursosDisponible`;
  }

  remove(id: number) {
    return `This action removes a #${id} cursosDisponible`;
  }
}
