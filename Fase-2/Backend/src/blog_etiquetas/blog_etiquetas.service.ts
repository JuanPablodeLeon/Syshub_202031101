import { Injectable } from '@nestjs/common';
import { CreateBlogEtiquetaDto } from './dto/create-blog_etiqueta.dto';
import { UpdateBlogEtiquetaDto } from './dto/update-blog_etiqueta.dto';

@Injectable()
export class BlogEtiquetasService {
  create(createBlogEtiquetaDto: CreateBlogEtiquetaDto) {
    return 'This action adds a new blogEtiqueta';
  }

  findAll() {
    return `This action returns all blogEtiquetas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogEtiqueta`;
  }

  update(id: number, updateBlogEtiquetaDto: UpdateBlogEtiquetaDto) {
    return `This action updates a #${id} blogEtiqueta`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogEtiqueta`;
  }
}
