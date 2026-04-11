import { Module } from '@nestjs/common';
import { ArchivosProyectoService } from './archivos_proyecto.service';
import { ArchivosProyectoController } from './archivos_proyecto.controller';
import { ArchivosProyecto } from './entities/archivos_proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArchivosProyecto])],
  controllers: [ArchivosProyectoController],
  providers: [ArchivosProyectoService],
})
export class ArchivosProyectoModule {}
