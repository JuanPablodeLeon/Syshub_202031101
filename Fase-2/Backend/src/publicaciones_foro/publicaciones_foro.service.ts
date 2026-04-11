import { Injectable } from '@nestjs/common';
import { CreatePublicacionesForoDto } from './dto/create-publicaciones_foro.dto';
import { UpdatePublicacionesForoDto } from './dto/update-publicaciones_foro.dto';

@Injectable()
export class PublicacionesForoService {
  create(createPublicacionesForoDto: CreatePublicacionesForoDto) {
    return 'This action adds a new publicacionesForo';
  }

  findAll() {
    return `This action returns all publicacionesForo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicacionesForo`;
  }

  update(id: number, updatePublicacionesForoDto: UpdatePublicacionesForoDto) {
    return `This action updates a #${id} publicacionesForo`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicacionesForo`;
  }
}
