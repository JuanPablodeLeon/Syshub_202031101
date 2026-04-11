import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CursoPrerequisitosService } from './curso_prerequisitos.service';
import { CreateCursoPrerequisitoDto } from './dto/create-curso_prerequisito.dto';
import { UpdateCursoPrerequisitoDto } from './dto/update-curso_prerequisito.dto';

@Controller('curso-prerequisitos')
export class CursoPrerequisitosController {
  constructor(private readonly cursoPrerequisitosService: CursoPrerequisitosService) {}

  @Post()
  create(@Body() createCursoPrerequisitoDto: CreateCursoPrerequisitoDto) {
    return this.cursoPrerequisitosService.create(createCursoPrerequisitoDto);
  }

  @Get()
  findAll() {
    return this.cursoPrerequisitosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoPrerequisitosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoPrerequisitoDto: UpdateCursoPrerequisitoDto) {
    return this.cursoPrerequisitosService.update(+id, updateCursoPrerequisitoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoPrerequisitosService.remove(+id);
  }
}
