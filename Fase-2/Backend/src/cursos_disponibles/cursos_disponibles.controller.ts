import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CursosDisponiblesService } from './cursos_disponibles.service';
import { CreateCursosDisponibleDto } from './dto/create-cursos_disponible.dto';
import { UpdateCursosDisponibleDto } from './dto/update-cursos_disponible.dto';

@Controller('cursos-disponibles')
export class CursosDisponiblesController {
  constructor(private readonly cursosDisponiblesService: CursosDisponiblesService) {}

  @Post()
  create(@Body() createCursosDisponibleDto: CreateCursosDisponibleDto) {
    return this.cursosDisponiblesService.create(createCursosDisponibleDto);
  }

  @Get()
  findAll() {
    return this.cursosDisponiblesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursosDisponiblesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursosDisponibleDto: UpdateCursosDisponibleDto) {
    return this.cursosDisponiblesService.update(+id, updateCursosDisponibleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursosDisponiblesService.remove(+id);
  }
}
