import { Injectable } from '@nestjs/common';
import { CreatePublicacionMaterialDto } from './dto/create-publicacion_material.dto';
import { UpdatePublicacionMaterialDto } from './dto/update-publicacion_material.dto';

@Injectable()
export class PublicacionMaterialService {
  create(createPublicacionMaterialDto: CreatePublicacionMaterialDto) {
    return 'This action adds a new publicacionMaterial';
  }

  findAll() {
    return `This action returns all publicacionMaterial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicacionMaterial`;
  }

  update(id: number, updatePublicacionMaterialDto: UpdatePublicacionMaterialDto) {
    return `This action updates a #${id} publicacionMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicacionMaterial`;
  }
}
