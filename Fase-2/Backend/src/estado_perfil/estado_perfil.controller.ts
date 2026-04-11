import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoPerfilService } from './estado_perfil.service';
import { CreateEstadoPerfilDto } from './dto/create-estado_perfil.dto';
import { UpdateEstadoPerfilDto } from './dto/update-estado_perfil.dto';

@Controller('estado-perfil')
export class EstadoPerfilController {
  constructor(private readonly estadoPerfilService: EstadoPerfilService) {}

  @Post()
  create(@Body() createEstadoPerfilDto: CreateEstadoPerfilDto) {
    return this.estadoPerfilService.create(createEstadoPerfilDto);
  }

  @Get()
  findAll() {
    return this.estadoPerfilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoPerfilService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoPerfilDto: UpdateEstadoPerfilDto) {
    return this.estadoPerfilService.update(+id, updateEstadoPerfilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoPerfilService.remove(+id);
  }
}
