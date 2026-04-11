import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionesForoService } from './publicaciones_foro.service';
import { CreatePublicacionesForoDto } from './dto/create-publicaciones_foro.dto';
import { UpdatePublicacionesForoDto } from './dto/update-publicaciones_foro.dto';

@Controller('publicaciones-foro')
export class PublicacionesForoController {
  constructor(private readonly publicacionesForoService: PublicacionesForoService) {}

  @Post()
  create(@Body() createPublicacionesForoDto: CreatePublicacionesForoDto) {
    return this.publicacionesForoService.create(createPublicacionesForoDto);
  }

  @Get()
  findAll() {
    return this.publicacionesForoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionesForoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacionesForoDto: UpdatePublicacionesForoDto) {
    return this.publicacionesForoService.update(+id, updatePublicacionesForoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionesForoService.remove(+id);
  }
}
