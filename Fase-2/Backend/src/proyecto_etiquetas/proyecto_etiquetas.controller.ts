import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectoEtiquetasService } from './proyecto_etiquetas.service';
import { CreateProyectoEtiquetaDto } from './dto/create-proyecto_etiqueta.dto';
import { UpdateProyectoEtiquetaDto } from './dto/update-proyecto_etiqueta.dto';

@Controller('proyecto-etiquetas')
export class ProyectoEtiquetasController {
  constructor(private readonly proyectoEtiquetasService: ProyectoEtiquetasService) {}

  @Post()
  create(@Body() createProyectoEtiquetaDto: CreateProyectoEtiquetaDto) {
    return this.proyectoEtiquetasService.create(createProyectoEtiquetaDto);
  }

  @Get()
  findAll() {
    return this.proyectoEtiquetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoEtiquetasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoEtiquetaDto: UpdateProyectoEtiquetaDto) {
    return this.proyectoEtiquetasService.update(+id, updateProyectoEtiquetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoEtiquetasService.remove(+id);
  }
}
