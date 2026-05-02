import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { BlogArticulosService } from './blog_articulos.service';
import { CreateBlogArticuloDto } from './dto/create-blog_articulo.dto';
import { UpdateBlogArticuloDto } from './dto/update-blog_articulo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRespuestaDto } from 'src/respuestas/dto/create-respuesta.dto';

@Controller('blog-articulos')
export class BlogArticulosController {
  constructor(private readonly blogArticulosService: BlogArticulosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateBlogArticuloDto) {
    return this.blogArticulosService.create(req.user.correo, dto);
  }

  @Get()
  findAll() {
    return this.blogArticulosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogArticulosService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/votar')
  votar(
    @Param('id', ParseIntPipe) id: number,
    @Body('valor') valor: 1 | -1,
  ) {
    return this.blogArticulosService.votar(id, valor);
  }

  @UseGuards(AuthGuard)
  @Post(':id/respuestas')
  agregarRespuesta(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() dto: CreateRespuestaDto,
  ) {
    return this.blogArticulosService.agregarRespuesta(
      id,
      req.user.correo,
      dto,
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() dto: UpdateBlogArticuloDto,
  ) {
    return this.blogArticulosService.update(id, req.user.correo, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.blogArticulosService.remove(id, req.user.correo);
  }
}
