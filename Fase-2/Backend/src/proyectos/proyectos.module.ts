import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Proyecto } from './entities/proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto]), UsuariosModule],
  controllers: [ProyectosController],
  providers: [ProyectosService, UsuariosService],
  exports: [TypeOrmModule],
})
export class ProyectosModule {}
