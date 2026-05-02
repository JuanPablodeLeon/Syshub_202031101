import { Module } from '@nestjs/common';
import { PensumService } from './pensum.service';
import { PensumController } from './pensum.controller';
import { Pensum } from './entities/pensum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearPensumModule } from 'src/year_pensum/year_pensum.module';
import { CarrerasModule } from 'src/carreras/carreras.module';
import { CursosDisponiblesModule } from 'src/cursos_disponibles/cursos_disponibles.module';
import { YearPensumService } from 'src/year_pensum/year_pensum.service';
import { CarrerasService } from 'src/carreras/carreras.service';
import { CursosDisponiblesService } from 'src/cursos_disponibles/cursos_disponibles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pensum]), YearPensumModule, CarrerasModule, CursosDisponiblesModule],
  controllers: [PensumController],
  providers: [PensumService, YearPensumService, CarrerasService, CursosDisponiblesService],
})
export class PensumModule {}
