import { Module } from '@nestjs/common';
import { EstadoPerfilService } from './estado_perfil.service';
import { EstadoPerfilController } from './estado_perfil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoPerfil } from './entities/estado_perfil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoPerfil])],
  controllers: [EstadoPerfilController],
  providers: [EstadoPerfilService],
})
export class EstadoPerfilModule {}
