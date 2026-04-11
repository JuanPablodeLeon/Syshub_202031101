import { Injectable } from '@nestjs/common';
import { CreateMaterialExtraDto } from './dto/create-material_extra.dto';
import { UpdateMaterialExtraDto } from './dto/update-material_extra.dto';

@Injectable()
export class MaterialExtraService {
  create(createMaterialExtraDto: CreateMaterialExtraDto) {
    return 'This action adds a new materialExtra';
  }

  findAll() {
    return `This action returns all materialExtra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materialExtra`;
  }

  update(id: number, updateMaterialExtraDto: UpdateMaterialExtraDto) {
    return `This action updates a #${id} materialExtra`;
  }

  remove(id: number) {
    return `This action removes a #${id} materialExtra`;
  }
}
