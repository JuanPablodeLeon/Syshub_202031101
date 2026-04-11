import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioCarrerasService } from './usuario_carreras.service';
import { CreateUsuarioCarreraDto } from './dto/create-usuario_carrera.dto';
import { UpdateUsuarioCarreraDto } from './dto/update-usuario_carrera.dto';

@Controller('usuario-carreras')
export class UsuarioCarrerasController {
  constructor(private readonly usuarioCarrerasService: UsuarioCarrerasService) {}

  @Post()
  create(@Body() createUsuarioCarreraDto: CreateUsuarioCarreraDto) {
    return this.usuarioCarrerasService.create(createUsuarioCarreraDto);
  }

  @Get()
  findAll() {
    return this.usuarioCarrerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioCarrerasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioCarreraDto: UpdateUsuarioCarreraDto) {
    return this.usuarioCarrerasService.update(+id, updateUsuarioCarreraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioCarrerasService.remove(+id);
  }
}
