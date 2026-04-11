import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionesCursoService } from './publicaciones_curso.service';
import { CreatePublicacionesCursoDto } from './dto/create-publicaciones_curso.dto';
import { UpdatePublicacionesCursoDto } from './dto/update-publicaciones_curso.dto';

@Controller('publicaciones-curso')
export class PublicacionesCursoController {
  constructor(private readonly publicacionesCursoService: PublicacionesCursoService) {}

  @Post()
  create(@Body() createPublicacionesCursoDto: CreatePublicacionesCursoDto) {
    return this.publicacionesCursoService.create(createPublicacionesCursoDto);
  }

  @Get()
  findAll() {
    return this.publicacionesCursoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionesCursoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacionesCursoDto: UpdatePublicacionesCursoDto) {
    return this.publicacionesCursoService.update(+id, updatePublicacionesCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionesCursoService.remove(+id);
  }
}
