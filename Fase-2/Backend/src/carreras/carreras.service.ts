import { Injectable } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';

@Injectable()
export class CarrerasService {

  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>
  ){}
  async create(createCarreraDto: CreateCarreraDto) {
    const carrera = this.carreraRepository.create(createCarreraDto);

    return await this.carreraRepository.save(carrera);
  }

  async findAll() {
    return await this.carreraRepository.find();
  }

  async findOne(id: number) {
    return await this.carreraRepository.findOneBy({id});
  }

  async update(id: number, updateCarreraDto: UpdateCarreraDto) {
    return await this.carreraRepository.update(id, updateCarreraDto);
  }

  async remove(id: number) {
    return await this.carreraRepository.softDelete({id});
  }
}
