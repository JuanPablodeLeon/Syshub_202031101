import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CursoEspacioAuxiliaresService } from './curso_espacio_auxiliares.service';
import { CreateCursoEspacioAuxiliareDto } from './dto/create-curso_espacio_auxiliare.dto';
import { UpdateCursoEspacioAuxiliareDto } from './dto/update-curso_espacio_auxiliare.dto';

@Controller('curso-espacio-auxiliares')
export class CursoEspacioAuxiliaresController {
  constructor(private readonly cursoEspacioAuxiliaresService: CursoEspacioAuxiliaresService) {}

  @Post()
  create(@Body() createCursoEspacioAuxiliareDto: CreateCursoEspacioAuxiliareDto) {
    return this.cursoEspacioAuxiliaresService.create(createCursoEspacioAuxiliareDto);
  }

  @Get()
  findAll() {
    return this.cursoEspacioAuxiliaresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoEspacioAuxiliaresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoEspacioAuxiliareDto: UpdateCursoEspacioAuxiliareDto) {
    return this.cursoEspacioAuxiliaresService.update(+id, updateCursoEspacioAuxiliareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoEspacioAuxiliaresService.remove(+id);
  }
}
