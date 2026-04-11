import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogEtiquetasService } from './blog_etiquetas.service';
import { CreateBlogEtiquetaDto } from './dto/create-blog_etiqueta.dto';
import { UpdateBlogEtiquetaDto } from './dto/update-blog_etiqueta.dto';

@Controller('blog-etiquetas')
export class BlogEtiquetasController {
  constructor(private readonly blogEtiquetasService: BlogEtiquetasService) {}

  @Post()
  create(@Body() createBlogEtiquetaDto: CreateBlogEtiquetaDto) {
    return this.blogEtiquetasService.create(createBlogEtiquetaDto);
  }

  @Get()
  findAll() {
    return this.blogEtiquetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogEtiquetasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogEtiquetaDto: UpdateBlogEtiquetaDto) {
    return this.blogEtiquetasService.update(+id, updateBlogEtiquetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogEtiquetasService.remove(+id);
  }
}
