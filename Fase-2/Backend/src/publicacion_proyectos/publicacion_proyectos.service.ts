import { Injectable } from '@nestjs/common';
import { CreatePublicacionProyectoDto } from './dto/create-publicacion_proyecto.dto';
import { UpdatePublicacionProyectoDto } from './dto/update-publicacion_proyecto.dto';

@Injectable()
export class PublicacionProyectosService {
  create(createPublicacionProyectoDto: CreatePublicacionProyectoDto) {
    return 'This action adds a new publicacionProyecto';
  }

  findAll() {
    return `This action returns all publicacionProyectos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicacionProyecto`;
  }

  update(id: number, updatePublicacionProyectoDto: UpdatePublicacionProyectoDto) {
    return `This action updates a #${id} publicacionProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicacionProyecto`;
  }
}
