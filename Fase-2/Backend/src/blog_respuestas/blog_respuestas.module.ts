import { Module } from '@nestjs/common';
import { BlogRespuestasService } from './blog_respuestas.service';
import { BlogRespuestasController } from './blog_respuestas.controller';
import { BlogRespuesta } from './entities/blog_respuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([BlogRespuesta])],
  controllers: [BlogRespuestasController],
  providers: [BlogRespuestasService],
})
export class BlogRespuestasModule {}
