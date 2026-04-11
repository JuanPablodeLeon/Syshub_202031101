import { Module } from '@nestjs/common';
import { ClasesGrabadasService } from './clases_grabadas.service';
import { ClasesGrabadasController } from './clases_grabadas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasesGrabada } from './entities/clases_grabada.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ClasesGrabada])],
  controllers: [ClasesGrabadasController],
  providers: [ClasesGrabadasService],
})
export class ClasesGrabadasModule {}
