import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogArticulosService } from './blog_articulos.service';
import { CreateBlogArticuloDto } from './dto/create-blog_articulo.dto';
import { UpdateBlogArticuloDto } from './dto/update-blog_articulo.dto';

@Controller('blog-articulos')
export class BlogArticulosController {
  constructor(private readonly blogArticulosService: BlogArticulosService) {}

  @Post()
  create(@Body() createBlogArticuloDto: CreateBlogArticuloDto) {
    return this.blogArticulosService.create(createBlogArticuloDto);
  }

  @Get()
  findAll() {
    return this.blogArticulosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogArticulosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogArticuloDto: UpdateBlogArticuloDto) {
    return this.blogArticulosService.update(+id, updateBlogArticuloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogArticulosService.remove(+id);
  }
}
