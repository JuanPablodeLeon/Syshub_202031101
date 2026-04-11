import { Module } from '@nestjs/common';
import { PublicacionesForoService } from './publicaciones_foro.service';
import { PublicacionesForoController } from './publicaciones_foro.controller';
import { PublicacionesForo } from './entities/publicaciones_foro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PublicacionesForo])],
  controllers: [PublicacionesForoController],
  providers: [PublicacionesForoService],
})
export class PublicacionesForoModule {}
