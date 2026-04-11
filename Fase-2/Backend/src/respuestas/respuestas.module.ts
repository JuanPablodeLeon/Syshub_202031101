import { Module } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { RespuestasController } from './respuestas.controller';
import { Respuesta } from './entities/respuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta])],
  controllers: [RespuestasController],
  providers: [RespuestasService],
})
export class RespuestasModule {}
