import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEstadoPerfilDto } from './dto/create-estado_perfil.dto';
import { UpdateEstadoPerfilDto } from './dto/update-estado_perfil.dto';
import { In, Repository } from 'typeorm';
import { EstadoPerfil } from './entities/estado_perfil.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstadoPerfilService {

  constructor(
    @InjectRepository(EstadoPerfil)
    private estadoPerfilRepository: Repository<EstadoPerfil>,
  ) {}

  async create(createEstadoPerfilDto: CreateEstadoPerfilDto) {
    const estado = await this.estadoPerfilRepository.findOneBy({ nombre: createEstadoPerfilDto.nombre });
    if(estado) {
      throw new BadRequestException('El estado de perfil ya existe');
    }
    const estadoSave = this.estadoPerfilRepository.create(createEstadoPerfilDto);
    return await this.estadoPerfilRepository.save(estadoSave);
  }

  async findAll() {
    return await this.estadoPerfilRepository.find();
  }

  async findOne(id: number) {
    return await this.estadoPerfilRepository.findOneBy({ id });
  }

  async update(id: number, updateEstadoPerfilDto: UpdateEstadoPerfilDto) {
    return await this.estadoPerfilRepository.update(id, updateEstadoPerfilDto);
  }

  async remove(id: number) {
    return await this.estadoPerfilRepository.softDelete(id);
  }
}
