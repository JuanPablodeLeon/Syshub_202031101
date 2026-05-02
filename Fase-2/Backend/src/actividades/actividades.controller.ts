import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.actividadesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('usuario/:id')
  findByUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.actividadesService.findByUsuario(id);
  }

}
