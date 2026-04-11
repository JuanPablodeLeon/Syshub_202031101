import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogRespuestasService } from './blog_respuestas.service';
import { CreateBlogRespuestaDto } from './dto/create-blog_respuesta.dto';
import { UpdateBlogRespuestaDto } from './dto/update-blog_respuesta.dto';

@Controller('blog-respuestas')
export class BlogRespuestasController {
  constructor(private readonly blogRespuestasService: BlogRespuestasService) {}

  @Post()
  create(@Body() createBlogRespuestaDto: CreateBlogRespuestaDto) {
    return this.blogRespuestasService.create(createBlogRespuestaDto);
  }

  @Get()
  findAll() {
    return this.blogRespuestasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogRespuestasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogRespuestaDto: UpdateBlogRespuestaDto) {
    return this.blogRespuestasService.update(+id, updateBlogRespuestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogRespuestasService.remove(+id);
  }
}
