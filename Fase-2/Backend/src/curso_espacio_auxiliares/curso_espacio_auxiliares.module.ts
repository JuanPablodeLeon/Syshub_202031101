import { Module } from '@nestjs/common';
import { CursoEspacioAuxiliaresService } from './curso_espacio_auxiliares.service';
import { CursoEspacioAuxiliaresController } from './curso_espacio_auxiliares.controller';
import { CursoEspacioAuxiliare } from './entities/curso_espacio_auxiliare.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CursoEspacioAuxiliare])],
  controllers: [CursoEspacioAuxiliaresController],
  providers: [CursoEspacioAuxiliaresService],
})
export class CursoEspacioAuxiliaresModule {}
