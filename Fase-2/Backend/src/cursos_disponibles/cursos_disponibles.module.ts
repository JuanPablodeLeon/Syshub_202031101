import { Module } from '@nestjs/common';
import { CursosDisponiblesService } from './cursos_disponibles.service';
import { CursosDisponiblesController } from './cursos_disponibles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosDisponible } from './entities/cursos_disponible.entity';
import { CarrerasModule } from 'src/carreras/carreras.module';
import { CarrerasService } from 'src/carreras/carreras.service';

@Module({
  imports: [TypeOrmModule.forFeature([CursosDisponible]), CarrerasModule],
  controllers: [CursosDisponiblesController],
  providers: [CursosDisponiblesService, CarrerasService],
  exports:[TypeOrmModule, CursosDisponiblesService]
})
export class CursosDisponiblesModule {}
