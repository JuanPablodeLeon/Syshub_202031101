import { Injectable } from '@nestjs/common';
import { CreatePublicacionesEtiquetaDto } from './dto/create-publicaciones_etiqueta.dto';
import { UpdatePublicacionesEtiquetaDto } from './dto/update-publicaciones_etiqueta.dto';

@Injectable()
export class PublicacionesEtiquetasService {
  create(createPublicacionesEtiquetaDto: CreatePublicacionesEtiquetaDto) {
    return 'This action adds a new publicacionesEtiqueta';
  }

  findAll() {
    return `This action returns all publicacionesEtiquetas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicacionesEtiqueta`;
  }

  update(id: number, updatePublicacionesEtiquetaDto: UpdatePublicacionesEtiquetaDto) {
    return `This action updates a #${id} publicacionesEtiqueta`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicacionesEtiqueta`;
  }
}
