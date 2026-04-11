import { Injectable } from '@nestjs/common';
import { CreateUsuarioCarreraDto } from './dto/create-usuario_carrera.dto';
import { UpdateUsuarioCarreraDto } from './dto/update-usuario_carrera.dto';

@Injectable()
export class UsuarioCarrerasService {
  create(createUsuarioCarreraDto: CreateUsuarioCarreraDto) {
    return 'This action adds a new usuarioCarrera';
  }

  findAll() {
    return `This action returns all usuarioCarreras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioCarrera`;
  }

  update(id: number, updateUsuarioCarreraDto: UpdateUsuarioCarreraDto) {
    return `This action updates a #${id} usuarioCarrera`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioCarrera`;
  }
}
