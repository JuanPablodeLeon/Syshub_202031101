import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateReporteDto) {
    return this.reportesService.create(req.user.correo, dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.reportesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Patch(':id/estado')
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body('estado') estado: 'revisado' | 'descartado',
  ) {
    return this.reportesService.updateEstado(id, estado);
  }
}
