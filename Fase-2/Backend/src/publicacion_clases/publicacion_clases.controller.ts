import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionClasesService } from './publicacion_clases.service';
import { CreatePublicacionClaseDto } from './dto/create-publicacion_clase.dto';
import { UpdatePublicacionClaseDto } from './dto/update-publicacion_clase.dto';

@Controller('publicacion-clases')
export class PublicacionClasesController {
  constructor(private readonly publicacionClasesService: PublicacionClasesService) {}

  @Post()
  create(@Body() createPublicacionClaseDto: CreatePublicacionClaseDto) {
    return this.publicacionClasesService.create(createPublicacionClaseDto);
  }

  @Get()
  findAll() {
    return this.publicacionClasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionClasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacionClaseDto: UpdatePublicacionClaseDto) {
    return this.publicacionClasesService.update(+id, updatePublicacionClaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionClasesService.remove(+id);
  }
}
