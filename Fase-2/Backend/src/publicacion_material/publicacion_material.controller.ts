import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionMaterialService } from './publicacion_material.service';
import { CreatePublicacionMaterialDto } from './dto/create-publicacion_material.dto';
import { UpdatePublicacionMaterialDto } from './dto/update-publicacion_material.dto';

@Controller('publicacion-material')
export class PublicacionMaterialController {
  constructor(private readonly publicacionMaterialService: PublicacionMaterialService) {}

  @Post()
  create(@Body() createPublicacionMaterialDto: CreatePublicacionMaterialDto) {
    return this.publicacionMaterialService.create(createPublicacionMaterialDto);
  }

  @Get()
  findAll() {
    return this.publicacionMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionMaterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacionMaterialDto: UpdatePublicacionMaterialDto) {
    return this.publicacionMaterialService.update(+id, updatePublicacionMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionMaterialService.remove(+id);
  }
}
