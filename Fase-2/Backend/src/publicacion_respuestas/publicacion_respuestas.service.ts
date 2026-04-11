import { Injectable } from '@nestjs/common';
import { CreatePublicacionRespuestaDto } from './dto/create-publicacion_respuesta.dto';
import { UpdatePublicacionRespuestaDto } from './dto/update-publicacion_respuesta.dto';

@Injectable()
export class PublicacionRespuestasService {
  create(createPublicacionRespuestaDto: CreatePublicacionRespuestaDto) {
    return 'This action adds a new publicacionRespuesta';
  }

  findAll() {
    return `This action returns all publicacionRespuestas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicacionRespuesta`;
  }

  update(id: number, updatePublicacionRespuestaDto: UpdatePublicacionRespuestaDto) {
    return `This action updates a #${id} publicacionRespuesta`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicacionRespuesta`;
  }
}
