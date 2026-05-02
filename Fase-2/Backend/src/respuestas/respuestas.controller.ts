import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateRespuestaDto) {
    return this.respuestasService.create(req.user.correo, dto);
  }


  @Get()
  findAll() {
    return this.respuestasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.respuestasService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/votar')
  votar(
    @Param('id', ParseIntPipe) id: number,
    @Body('valor') valor: 1 | -1,
  ) {
    return this.respuestasService.votar(id, valor);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() dto: UpdateRespuestaDto,
  ) {
    return this.respuestasService.update(id, req.user.correo, dto);
  }

  /**
   * DELETE /respuestas/:id
   * Solo el creador puede borrarla.
   */
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.respuestasService.remove(id, req.user.correo);
  }
}
