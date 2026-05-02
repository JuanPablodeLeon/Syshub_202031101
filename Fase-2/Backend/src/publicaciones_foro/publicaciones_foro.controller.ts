import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { PublicacionesForoService } from './publicaciones_foro.service';
import { CreatePublicacionesForoDto } from './dto/create-publicaciones_foro.dto';
import { UpdatePublicacionesForoDto } from './dto/update-publicaciones_foro.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRespuestaDto } from 'src/respuestas/dto/create-respuesta.dto';

@Controller('publicaciones-foro')
export class PublicacionesForoController {
  constructor(private readonly publicacionesForoService: PublicacionesForoService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreatePublicacionesForoDto) {
    return this.publicacionesForoService.create(req.user.correo, dto);
  }

  @Get()
  findAll() {
    return this.publicacionesForoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicacionesForoService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/votar')
  votar(
    @Param('id', ParseIntPipe) id: number,
    @Body('valor') valor: 1 | -1,
  ) {
    return this.publicacionesForoService.votar(id, valor);
  }

    @UseGuards(AuthGuard)
  @Post(':id/respuestas')
  agregarRespuesta(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() dto: CreateRespuestaDto,
  ) {
    return this.publicacionesForoService.agregarRespuesta(
      id,
      req.user.correo,
      dto,
    );
  }

  /**
   * PATCH /home/foro/:id
   * Edita la publicación. Solo el creador.
   */
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() dto: UpdatePublicacionesForoDto,
  ) {
    return this.publicacionesForoService.update(id, req.user.correo, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.publicacionesForoService.remove(id, req.user.correo);
  }
}
