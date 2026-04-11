import { Module } from '@nestjs/common';
import { PublicacionProyectosService } from './publicacion_proyectos.service';
import { PublicacionProyectosController } from './publicacion_proyectos.controller';
import { PublicacionProyecto } from './entities/publicacion_proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PublicacionProyecto])],
  controllers: [PublicacionProyectosController],
  providers: [PublicacionProyectosService],
})
export class PublicacionProyectosModule {}
