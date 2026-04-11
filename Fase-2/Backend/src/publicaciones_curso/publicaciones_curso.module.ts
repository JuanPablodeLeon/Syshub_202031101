import { Module } from '@nestjs/common';
import { PublicacionesCursoService } from './publicaciones_curso.service';
import { PublicacionesCursoController } from './publicaciones_curso.controller';
import { PublicacionesCurso } from './entities/publicaciones_curso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PublicacionesCurso])],
  controllers: [PublicacionesCursoController],
  providers: [PublicacionesCursoService],
})
export class PublicacionesCursoModule {}
