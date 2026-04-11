import { Module } from '@nestjs/common';
import { PublicacionesEtiquetasService } from './publicaciones_etiquetas.service';
import { PublicacionesEtiquetasController } from './publicaciones_etiquetas.controller';
import { PublicacionesEtiqueta } from './entities/publicaciones_etiqueta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PublicacionesEtiqueta])],
  controllers: [PublicacionesEtiquetasController],
  providers: [PublicacionesEtiquetasService],
})
export class PublicacionesEtiquetasModule {}
