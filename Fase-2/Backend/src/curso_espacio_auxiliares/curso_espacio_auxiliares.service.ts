import { Injectable } from '@nestjs/common';
import { CreateCursoEspacioAuxiliareDto } from './dto/create-curso_espacio_auxiliare.dto';
import { UpdateCursoEspacioAuxiliareDto } from './dto/update-curso_espacio_auxiliare.dto';

@Injectable()
export class CursoEspacioAuxiliaresService {
  create(createCursoEspacioAuxiliareDto: CreateCursoEspacioAuxiliareDto) {
    return 'This action adds a new cursoEspacioAuxiliare';
  }

  findAll() {
    return `This action returns all cursoEspacioAuxiliares`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cursoEspacioAuxiliare`;
  }

  update(id: number, updateCursoEspacioAuxiliareDto: UpdateCursoEspacioAuxiliareDto) {
    return `This action updates a #${id} cursoEspacioAuxiliare`;
  }

  remove(id: number) {
    return `This action removes a #${id} cursoEspacioAuxiliare`;
  }
}
