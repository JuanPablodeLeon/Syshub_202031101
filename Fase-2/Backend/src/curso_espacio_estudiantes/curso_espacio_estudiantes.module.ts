import { Module } from '@nestjs/common';
import { CursoEspacioEstudiantesService } from './curso_espacio_estudiantes.service';
import { CursoEspacioEstudiantesController } from './curso_espacio_estudiantes.controller';
import { CursoEspacioEstudiante } from './entities/curso_espacio_estudiante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CursoEspacioEstudiante])],
  controllers: [CursoEspacioEstudiantesController],
  providers: [CursoEspacioEstudiantesService],
})
export class CursoEspacioEstudiantesModule {}
