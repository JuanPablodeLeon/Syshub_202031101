import { Injectable } from '@nestjs/common';
import { CreateCursoEspacioEstudianteDto } from './dto/create-curso_espacio_estudiante.dto';
import { UpdateCursoEspacioEstudianteDto } from './dto/update-curso_espacio_estudiante.dto';

@Injectable()
export class CursoEspacioEstudiantesService {
  create(createCursoEspacioEstudianteDto: CreateCursoEspacioEstudianteDto) {
    return 'This action adds a new cursoEspacioEstudiante';
  }

  findAll() {
    return `This action returns all cursoEspacioEstudiantes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cursoEspacioEstudiante`;
  }

  update(id: number, updateCursoEspacioEstudianteDto: UpdateCursoEspacioEstudianteDto) {
    return `This action updates a #${id} cursoEspacioEstudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} cursoEspacioEstudiante`;
  }
}
