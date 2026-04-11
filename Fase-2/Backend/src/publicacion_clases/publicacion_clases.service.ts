import { Injectable } from '@nestjs/common';
import { CreatePublicacionClaseDto } from './dto/create-publicacion_clase.dto';
import { UpdatePublicacionClaseDto } from './dto/update-publicacion_clase.dto';

@Injectable()
export class PublicacionClasesService {
  create(createPublicacionClaseDto: CreatePublicacionClaseDto) {
    return 'This action adds a new publicacionClase';
  }

  findAll() {
    return `This action returns all publicacionClases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicacionClase`;
  }

  update(id: number, updatePublicacionClaseDto: UpdatePublicacionClaseDto) {
    return `This action updates a #${id} publicacionClase`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicacionClase`;
  }
}
