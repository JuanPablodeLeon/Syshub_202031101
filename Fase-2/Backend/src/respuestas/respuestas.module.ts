import { Module } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { RespuestasController } from './respuestas.controller';
import { Respuesta } from './entities/respuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta]), UsuariosModule],
  controllers: [RespuestasController],
  providers: [RespuestasService, UsuariosService],
  exports: [TypeOrmModule, RespuestasService],
})
export class RespuestasModule {}
