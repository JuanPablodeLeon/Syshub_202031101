import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EtiquetasService } from './etiquetas.service';
import { CreateEtiquetaDto } from './dto/create-etiqueta.dto';
import { UpdateEtiquetaDto } from './dto/update-etiqueta.dto';

@Controller('etiquetas')
export class EtiquetasController {
  constructor(private readonly etiquetasService: EtiquetasService) {}

  @Post()
  create(@Body() createEtiquetaDto: CreateEtiquetaDto) {
    return this.etiquetasService.create(createEtiquetaDto);
  }

  @Get()
  findAll() {
    return this.etiquetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.etiquetasService.findOne(id);
  }

  /** GET /etiquetas/:id/contenido — foro + blog con esta etiqueta */
  @Get(':id/contenido')
  findContenido(@Param('id', ParseIntPipe) id: number) {
    return this.etiquetasService.findContenidoByEtiqueta(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.etiquetasService.remove(id);
  }
}
