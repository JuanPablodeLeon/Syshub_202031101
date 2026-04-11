import { Injectable } from '@nestjs/common';
import { CreateBlogArticuloDto } from './dto/create-blog_articulo.dto';
import { UpdateBlogArticuloDto } from './dto/update-blog_articulo.dto';

@Injectable()
export class BlogArticulosService {
  create(createBlogArticuloDto: CreateBlogArticuloDto) {
    return 'This action adds a new blogArticulo';
  }

  findAll() {
    return `This action returns all blogArticulos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogArticulo`;
  }

  update(id: number, updateBlogArticuloDto: UpdateBlogArticuloDto) {
    return `This action updates a #${id} blogArticulo`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogArticulo`;
  }
}
