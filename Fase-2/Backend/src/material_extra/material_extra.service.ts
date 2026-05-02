import { Injectable } from '@nestjs/common';
import { CreateMaterialExtraDto } from './dto/create-material_extra.dto';
import { UpdateMaterialExtraDto } from './dto/update-material_extra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialExtra } from './entities/material_extra.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class MaterialExtraService {
  constructor(
    @InjectRepository(MaterialExtra)
    private materialExtraRepository: Repository<MaterialExtra>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) {}
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
