import { Module } from '@nestjs/common';
import { BlogEtiquetasService } from './blog_etiquetas.service';
import { BlogEtiquetasController } from './blog_etiquetas.controller';
import { BlogEtiqueta } from './entities/blog_etiqueta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([BlogEtiqueta])],
  controllers: [BlogEtiquetasController],
  providers: [BlogEtiquetasService],
})
export class BlogEtiquetasModule {}
