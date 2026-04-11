import { Module } from '@nestjs/common';
import { CursosDisponiblesService } from './cursos_disponibles.service';
import { CursosDisponiblesController } from './cursos_disponibles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosDisponible } from './entities/cursos_disponible.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CursosDisponible])],
  controllers: [CursosDisponiblesController],
  providers: [CursosDisponiblesService],
})
export class CursosDisponiblesModule {}
