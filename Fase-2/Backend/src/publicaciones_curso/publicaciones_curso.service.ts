import { Injectable } from '@nestjs/common';
import { CreatePublicacionesCursoDto } from './dto/create-publicaciones_curso.dto';
import { UpdatePublicacionesCursoDto } from './dto/update-publicaciones_curso.dto';

@Injectable()
export class PublicacionesCursoService {
  create(createPublicacionesCursoDto: CreatePublicacionesCursoDto) {
    return 'This action adds a new publicacionesCurso';
  }

  findAll() {
    return `This action returns all publicacionesCurso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicacionesCurso`;
  }

  update(id: number, updatePublicacionesCursoDto: UpdatePublicacionesCursoDto) {
    return `This action updates a #${id} publicacionesCurso`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicacionesCurso`;
  }
}
