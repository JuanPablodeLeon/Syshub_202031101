import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CursoEspaciosService } from './curso_espacios.service';
import { CreateCursoEspacioDto } from './dto/create-curso_espacio.dto';
import { UpdateCursoEspacioDto } from './dto/update-curso_espacio.dto';

@Controller('curso-espacios')
export class CursoEspaciosController {
  constructor(private readonly cursoEspaciosService: CursoEspaciosService) {}

  @Post()
  create(@Body() createCursoEspacioDto: CreateCursoEspacioDto) {
    return this.cursoEspaciosService.create(createCursoEspacioDto);
  }

  @Get()
  findAll() {
    return this.cursoEspaciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoEspaciosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoEspacioDto: UpdateCursoEspacioDto) {
    return this.cursoEspaciosService.update(+id, updateCursoEspacioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoEspaciosService.remove(+id);
  }
}
