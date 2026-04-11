import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionProyectosService } from './publicacion_proyectos.service';
import { CreatePublicacionProyectoDto } from './dto/create-publicacion_proyecto.dto';
import { UpdatePublicacionProyectoDto } from './dto/update-publicacion_proyecto.dto';

@Controller('publicacion-proyectos')
export class PublicacionProyectosController {
  constructor(private readonly publicacionProyectosService: PublicacionProyectosService) {}

  @Post()
  create(@Body() createPublicacionProyectoDto: CreatePublicacionProyectoDto) {
    return this.publicacionProyectosService.create(createPublicacionProyectoDto);
  }

  @Get()
  findAll() {
    return this.publicacionProyectosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionProyectosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacionProyectoDto: UpdatePublicacionProyectoDto) {
    return this.publicacionProyectosService.update(+id, updatePublicacionProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionProyectosService.remove(+id);
  }
}
