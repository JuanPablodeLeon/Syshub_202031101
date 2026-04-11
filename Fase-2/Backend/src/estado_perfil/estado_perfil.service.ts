import { Injectable } from '@nestjs/common';
import { CreateEstadoPerfilDto } from './dto/create-estado_perfil.dto';
import { UpdateEstadoPerfilDto } from './dto/update-estado_perfil.dto';

@Injectable()
export class EstadoPerfilService {
  create(createEstadoPerfilDto: CreateEstadoPerfilDto) {
    return 'This action adds a new estadoPerfil';
  }

  findAll() {
    return `This action returns all estadoPerfil`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoPerfil`;
  }

  update(id: number, updateEstadoPerfilDto: UpdateEstadoPerfilDto) {
    return `This action updates a #${id} estadoPerfil`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoPerfil`;
  }
}
