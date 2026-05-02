import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { Reporte } from './entities/reporte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Actividade } from 'src/actividades/entities/actividade.entity';
import { ActividadesService } from 'src/actividades/actividades.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte, Usuario, Actividade])],
  controllers: [ReportesController],
  providers: [ReportesService, UsuariosService, ActividadesService],
  exports: [TypeOrmModule, ReportesService],
})
export class ReportesModule {}
