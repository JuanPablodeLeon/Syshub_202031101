import { Module } from '@nestjs/common';
import { UsuarioCarrerasService } from './usuario_carreras.service';
import { UsuarioCarrerasController } from './usuario_carreras.controller';
import { UsuarioCarrera } from './entities/usuario_carrera.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioCarrera])],
  controllers: [UsuarioCarrerasController],
  providers: [UsuarioCarrerasService],
})
export class UsuarioCarrerasModule {}
