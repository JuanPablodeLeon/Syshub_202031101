import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CursoEspaciosService } from './curso_espacios.service';
import { CreateCursoEspacioDto } from './dto/create-curso_espacio.dto';
import { UpdateCursoEspacioDto } from './dto/update-curso_espacio.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('curso-espacios')
export class CursoEspaciosController {
  constructor(private readonly cursoEspaciosService: CursoEspaciosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateCursoEspacioDto) {
    return this.cursoEspaciosService.create(dto);
  }

  @Get()
  findAll() {
    return this.cursoEspaciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cursoEspaciosService.findOne(id);
  }

  /** GET /curso-espacios/docente/:userId — espacios donde el usuario es catedrático o auxiliar */
  @UseGuards(AuthGuard)
  @Get('docente/:userId')
  findByDocente(@Param('userId', ParseIntPipe) userId: number) {
    return this.cursoEspaciosService.findByDocente(userId);
  }

  /** GET /curso-espacios/estudiante/:userId — espacios donde el usuario es estudiante */
  @UseGuards(AuthGuard)
  @Get('estudiante/:userId')
  findByEstudiante(@Param('userId', ParseIntPipe) userId: number) {
    return this.cursoEspaciosService.findByEstudiante(userId);
  }

  /** POST /curso-espacios/:id/agregar-estudiante — agrega un estudiante por correo */
  @UseGuards(AuthGuard)
  @Post(':id/agregar-estudiante')
  agregarEstudiante(
    @Param('id', ParseIntPipe) id: number,
    @Body('correo') correo: string,
  ) {
    return this.cursoEspaciosService.agregarEstudiantePorCorreo(id, correo);
  }

  /** POST /curso-espacios/:id/agregar-auxiliar — agrega un auxiliar por correo */
  @UseGuards(AuthGuard)
  @Post(':id/agregar-auxiliar')
  agregarAuxiliar(
    @Param('id', ParseIntPipe) id: number,
    @Body('correo') correo: string,
  ) {
    return this.cursoEspaciosService.agregarAuxiliarPorCorreo(id, correo);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCursoEspacioDto) {
    return this.cursoEspaciosService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cursoEspaciosService.remove(id);
  }
}
