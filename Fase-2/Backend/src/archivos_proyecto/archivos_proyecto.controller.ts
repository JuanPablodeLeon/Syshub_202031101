import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArchivosProyectoService } from './archivos_proyecto.service';
import { CreateArchivosProyectoDto } from './dto/create-archivos_proyecto.dto';
import { UpdateArchivosProyectoDto } from './dto/update-archivos_proyecto.dto';

@Controller('archivos-proyecto')
export class ArchivosProyectoController {
  constructor(private readonly archivosProyectoService: ArchivosProyectoService) {}

  @Post()
  create(@Body() createArchivosProyectoDto: CreateArchivosProyectoDto) {
    return this.archivosProyectoService.create(createArchivosProyectoDto);
  }

  @Get()
  findAll() {
    return this.archivosProyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archivosProyectoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArchivosProyectoDto: UpdateArchivosProyectoDto) {
    return this.archivosProyectoService.update(+id, updateArchivosProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivosProyectoService.remove(+id);
  }
}
