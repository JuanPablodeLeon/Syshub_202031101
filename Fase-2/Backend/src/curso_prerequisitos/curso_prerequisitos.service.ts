import { Injectable } from '@nestjs/common';
import { CreateCursoPrerequisitoDto } from './dto/create-curso_prerequisito.dto';
import { UpdateCursoPrerequisitoDto } from './dto/update-curso_prerequisito.dto';

@Injectable()
export class CursoPrerequisitosService {
  create(createCursoPrerequisitoDto: CreateCursoPrerequisitoDto) {
    return 'This action adds a new cursoPrerequisito';
  }

  findAll() {
    return `This action returns all cursoPrerequisitos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cursoPrerequisito`;
  }

  update(id: number, updateCursoPrerequisitoDto: UpdateCursoPrerequisitoDto) {
    return `This action updates a #${id} cursoPrerequisito`;
  }

  remove(id: number) {
    return `This action removes a #${id} cursoPrerequisito`;
  }
}
