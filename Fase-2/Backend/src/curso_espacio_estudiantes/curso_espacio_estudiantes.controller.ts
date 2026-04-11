import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CursoEspacioEstudiantesService } from './curso_espacio_estudiantes.service';
import { CreateCursoEspacioEstudianteDto } from './dto/create-curso_espacio_estudiante.dto';
import { UpdateCursoEspacioEstudianteDto } from './dto/update-curso_espacio_estudiante.dto';

@Controller('curso-espacio-estudiantes')
export class CursoEspacioEstudiantesController {
  constructor(private readonly cursoEspacioEstudiantesService: CursoEspacioEstudiantesService) {}

  @Post()
  create(@Body() createCursoEspacioEstudianteDto: CreateCursoEspacioEstudianteDto) {
    return this.cursoEspacioEstudiantesService.create(createCursoEspacioEstudianteDto);
  }

  @Get()
  findAll() {
    return this.cursoEspacioEstudiantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoEspacioEstudiantesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoEspacioEstudianteDto: UpdateCursoEspacioEstudianteDto) {
    return this.cursoEspacioEstudiantesService.update(+id, updateCursoEspacioEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoEspacioEstudiantesService.remove(+id);
  }
}
