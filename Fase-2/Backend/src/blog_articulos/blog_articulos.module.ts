import { Module } from '@nestjs/common';
import { BlogArticulosService } from './blog_articulos.service';
import { BlogArticulosController } from './blog_articulos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogArticulo } from './entities/blog_articulo.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Etiqueta } from 'src/etiquetas/entities/etiqueta.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BlogArticulo, Usuario, Etiqueta, Respuesta, Actividade])],
  controllers: [BlogArticulosController],
  providers: [BlogArticulosService, UsuariosService],
  exports: [TypeOrmModule, BlogArticulosService],
})
export class BlogArticulosModule {}
