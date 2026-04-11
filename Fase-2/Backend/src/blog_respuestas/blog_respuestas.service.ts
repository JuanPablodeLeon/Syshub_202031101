import { Injectable } from '@nestjs/common';
import { CreateBlogRespuestaDto } from './dto/create-blog_respuesta.dto';
import { UpdateBlogRespuestaDto } from './dto/update-blog_respuesta.dto';

@Injectable()
export class BlogRespuestasService {
  create(createBlogRespuestaDto: CreateBlogRespuestaDto) {
    return 'This action adds a new blogRespuesta';
  }

  findAll() {
    return `This action returns all blogRespuestas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogRespuesta`;
  }

  update(id: number, updateBlogRespuestaDto: UpdateBlogRespuestaDto) {
    return `This action updates a #${id} blogRespuesta`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogRespuesta`;
  }
}
