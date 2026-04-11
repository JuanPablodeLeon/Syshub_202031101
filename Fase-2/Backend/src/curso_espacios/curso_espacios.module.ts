import { Module } from '@nestjs/common';
import { CursoEspaciosService } from './curso_espacios.service';
import { CursoEspaciosController } from './curso_espacios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEspacio } from './entities/curso_espacio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CursoEspacio])],
  controllers: [CursoEspaciosController],
  providers: [CursoEspaciosService],
})
export class CursoEspaciosModule {}
