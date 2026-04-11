import { Module } from '@nestjs/common';
import { ProyectoEtiquetasService } from './proyecto_etiquetas.service';
import { ProyectoEtiquetasController } from './proyecto_etiquetas.controller';
import { ProyectoEtiqueta } from './entities/proyecto_etiqueta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEtiqueta])],
  controllers: [ProyectoEtiquetasController],
  providers: [ProyectoEtiquetasService],
})
export class ProyectoEtiquetasModule {}
