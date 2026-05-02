import { Module } from '@nestjs/common';
import { ArchivosProyectoService } from './archivos_proyecto.service';
import { ArchivosProyectoController } from './archivos_proyecto.controller';
import { ArchivosProyecto } from './entities/archivos_proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosModule } from 'src/proyectos/proyectos.module';
import { ProyectosService } from 'src/proyectos/proyectos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArchivosProyecto]), ProyectosModule],
  controllers: [ArchivosProyectoController],
  providers: [ArchivosProyectoService, ProyectosService],
})
export class ArchivosProyectoModule {}
