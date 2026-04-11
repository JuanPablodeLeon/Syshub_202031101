import { Module } from '@nestjs/common';
import { BlogArticulosService } from './blog_articulos.service';
import { BlogArticulosController } from './blog_articulos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogArticulo } from './entities/blog_articulo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BlogArticulo])],
  controllers: [BlogArticulosController],
  providers: [BlogArticulosService],
})
export class BlogArticulosModule {}
