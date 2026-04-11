import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterialExtraService } from './material_extra.service';
import { CreateMaterialExtraDto } from './dto/create-material_extra.dto';
import { UpdateMaterialExtraDto } from './dto/update-material_extra.dto';

@Controller('material-extra')
export class MaterialExtraController {
  constructor(private readonly materialExtraService: MaterialExtraService) {}

  @Post()
  create(@Body() createMaterialExtraDto: CreateMaterialExtraDto) {
    return this.materialExtraService.create(createMaterialExtraDto);
  }

  @Get()
  findAll() {
    return this.materialExtraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialExtraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialExtraDto: UpdateMaterialExtraDto) {
    return this.materialExtraService.update(+id, updateMaterialExtraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialExtraService.remove(+id);
  }
}
