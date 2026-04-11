import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClasesGrabadasService } from './clases_grabadas.service';
import { CreateClasesGrabadaDto } from './dto/create-clases_grabada.dto';
import { UpdateClasesGrabadaDto } from './dto/update-clases_grabada.dto';

@Controller('clases-grabadas')
export class ClasesGrabadasController {
  constructor(private readonly clasesGrabadasService: ClasesGrabadasService) {}

  @Post()
  create(@Body() createClasesGrabadaDto: CreateClasesGrabadaDto) {
    return this.clasesGrabadasService.create(createClasesGrabadaDto);
  }

  @Get()
  findAll() {
    return this.clasesGrabadasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clasesGrabadasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClasesGrabadaDto: UpdateClasesGrabadaDto) {
    return this.clasesGrabadasService.update(+id, updateClasesGrabadaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clasesGrabadasService.remove(+id);
  }
}
