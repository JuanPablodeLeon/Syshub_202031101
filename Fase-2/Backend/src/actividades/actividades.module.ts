import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividade } from './entities/actividade.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { BlogArticulo } from 'src/blog_articulos/entities/blog_articulo.entity';
import { BlogArticulosModule } from 'src/blog_articulos/blog_articulos.module';

@Module({
  imports:[TypeOrmModule.forFeature([Actividade, Usuario]), BlogArticulosModule],
  controllers: [ActividadesController],
  providers: [ActividadesService, UsuariosService],
  exports: [TypeOrmModule, ActividadesService],
})
export class ActividadesModule {}
