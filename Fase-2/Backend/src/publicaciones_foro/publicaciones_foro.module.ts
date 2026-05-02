import { Module } from '@nestjs/common';
import { PublicacionesForoService } from './publicaciones_foro.service';
import { PublicacionesForoController } from './publicaciones_foro.controller';
import { PublicacionesForo } from './entities/publicaciones_foro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Etiqueta } from 'src/etiquetas/entities/etiqueta.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicacionesForo, Usuario, Etiqueta, Respuesta, Actividade])],
  controllers: [PublicacionesForoController],
  providers: [PublicacionesForoService, UsuariosService],
  exports: [TypeOrmModule, PublicacionesForoService, UsuariosService],
})
export class PublicacionesForoModule {}
