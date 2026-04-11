import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionesEtiquetasService } from './publicaciones_etiquetas.service';
import { CreatePublicacionesEtiquetaDto } from './dto/create-publicaciones_etiqueta.dto';
import { UpdatePublicacionesEtiquetaDto } from './dto/update-publicaciones_etiqueta.dto';

@Controller('publicaciones-etiquetas')
export class PublicacionesEtiquetasController {
  constructor(private readonly publicacionesEtiquetasService: PublicacionesEtiquetasService) {}

  @Post()
  create(@Body() createPublicacionesEtiquetaDto: CreatePublicacionesEtiquetaDto) {
    return this.publicacionesEtiquetasService.create(createPublicacionesEtiquetaDto);
  }

  @Get()
  findAll() {
    return this.publicacionesEtiquetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionesEtiquetasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacionesEtiquetaDto: UpdatePublicacionesEtiquetaDto) {
    return this.publicacionesEtiquetasService.update(+id, updatePublicacionesEtiquetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionesEtiquetasService.remove(+id);
  }
}
