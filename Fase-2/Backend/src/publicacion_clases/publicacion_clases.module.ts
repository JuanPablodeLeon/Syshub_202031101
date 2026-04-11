import { Module } from '@nestjs/common';
import { PublicacionClasesService } from './publicacion_clases.service';
import { PublicacionClasesController } from './publicacion_clases.controller';
import { PublicacionClase } from './entities/publicacion_clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PublicacionClase])],
  controllers: [PublicacionClasesController],
  providers: [PublicacionClasesService],
})
export class PublicacionClasesModule {}
