import { Module } from '@nestjs/common';
import { EtiquetasService } from './etiquetas.service';
import { EtiquetasController } from './etiquetas.controller';
import { Etiqueta } from './entities/etiqueta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicacionesForo } from 'src/publicaciones_foro/entities/publicaciones_foro.entity';
import { BlogArticulo } from 'src/blog_articulos/entities/blog_articulo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etiqueta, PublicacionesForo, BlogArticulo])],
  controllers: [EtiquetasController],
  providers: [EtiquetasService],
  exports: [TypeOrmModule, EtiquetasService],
})
export class EtiquetasModule {}
