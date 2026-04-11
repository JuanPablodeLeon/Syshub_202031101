import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionRespuestasService } from './publicacion_respuestas.service';
import { CreatePublicacionRespuestaDto } from './dto/create-publicacion_respuesta.dto';
import { UpdatePublicacionRespuestaDto } from './dto/update-publicacion_respuesta.dto';

@Controller('publicacion-respuestas')
export class PublicacionRespuestasController {
  constructor(private readonly publicacionRespuestasService: PublicacionRespuestasService) {}

  @Post()
  create(@Body() createPublicacionRespuestaDto: CreatePublicacionRespuestaDto) {
    return this.publicacionRespuestasService.create(createPublicacionRespuestaDto);
  }

  @Get()
  findAll() {
    return this.publicacionRespuestasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionRespuestasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacionRespuestaDto: UpdatePublicacionRespuestaDto) {
    return this.publicacionRespuestasService.update(+id, updatePublicacionRespuestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionRespuestasService.remove(+id);
  }
}
