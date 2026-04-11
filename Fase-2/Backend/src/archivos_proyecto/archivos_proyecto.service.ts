import { Injectable } from '@nestjs/common';
import { CreateArchivosProyectoDto } from './dto/create-archivos_proyecto.dto';
import { UpdateArchivosProyectoDto } from './dto/update-archivos_proyecto.dto';

@Injectable()
export class ArchivosProyectoService {
  create(createArchivosProyectoDto: CreateArchivosProyectoDto) {
    return 'This action adds a new archivosProyecto';
  }

  findAll() {
    return `This action returns all archivosProyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} archivosProyecto`;
  }

  update(id: number, updateArchivosProyectoDto: UpdateArchivosProyectoDto) {
    return `This action updates a #${id} archivosProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} archivosProyecto`;
  }
}
