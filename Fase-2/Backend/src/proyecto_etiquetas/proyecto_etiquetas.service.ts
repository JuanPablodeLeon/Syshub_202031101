import { Injectable } from '@nestjs/common';
import { CreateProyectoEtiquetaDto } from './dto/create-proyecto_etiqueta.dto';
import { UpdateProyectoEtiquetaDto } from './dto/update-proyecto_etiqueta.dto';

@Injectable()
export class ProyectoEtiquetasService {
  create(createProyectoEtiquetaDto: CreateProyectoEtiquetaDto) {
    return 'This action adds a new proyectoEtiqueta';
  }

  findAll() {
    return `This action returns all proyectoEtiquetas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proyectoEtiqueta`;
  }

  update(id: number, updateProyectoEtiquetaDto: UpdateProyectoEtiquetaDto) {
    return `This action updates a #${id} proyectoEtiqueta`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyectoEtiqueta`;
  }
}
