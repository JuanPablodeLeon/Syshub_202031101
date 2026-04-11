import { Injectable } from '@nestjs/common';
import { CreateCursoEspacioDto } from './dto/create-curso_espacio.dto';
import { UpdateCursoEspacioDto } from './dto/update-curso_espacio.dto';

@Injectable()
export class CursoEspaciosService {
  create(createCursoEspacioDto: CreateCursoEspacioDto) {
    return 'This action adds a new cursoEspacio';
  }

  findAll() {
    return `This action returns all cursoEspacios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cursoEspacio`;
  }

  update(id: number, updateCursoEspacioDto: UpdateCursoEspacioDto) {
    return `This action updates a #${id} cursoEspacio`;
  }

  remove(id: number) {
    return `This action removes a #${id} cursoEspacio`;
  }
}
