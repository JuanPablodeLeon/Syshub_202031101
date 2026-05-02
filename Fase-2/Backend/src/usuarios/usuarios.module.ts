import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { RolesModule } from 'src/roles/roles.module';
import { EstadoPerfilModule } from 'src/estado_perfil/estado_perfil.module';
import { RolesService } from 'src/roles/roles.service';
import { EstadoPerfilService } from 'src/estado_perfil/estado_perfil.service';
import { Actividade } from 'src/actividades/entities/actividade.entity';
import { ReportesModule } from 'src/reportes/reportes.module';



@Module({
  imports:[TypeOrmModule.forFeature([Usuario, Actividade ]), RolesModule, EstadoPerfilModule, ReportesModule],
  controllers: [UsuariosController],
  providers: [UsuariosService, RolesService, EstadoPerfilService],
  exports: [TypeOrmModule, UsuariosService],
})
export class UsuariosModule {}
