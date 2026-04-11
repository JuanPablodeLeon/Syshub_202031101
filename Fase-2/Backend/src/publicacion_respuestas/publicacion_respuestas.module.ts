import { Module } from '@nestjs/common';
import { PublicacionRespuestasService } from './publicacion_respuestas.service';
import { PublicacionRespuestasController } from './publicacion_respuestas.controller';
import { PublicacionRespuesta } from './entities/publicacion_respuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PublicacionRespuesta])],
  controllers: [PublicacionRespuestasController],
  providers: [PublicacionRespuestasService],
})
export class PublicacionRespuestasModule {}
