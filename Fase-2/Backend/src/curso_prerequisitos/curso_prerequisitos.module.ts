import { Module } from '@nestjs/common';
import { CursoPrerequisitosService } from './curso_prerequisitos.service';
import { CursoPrerequisitosController } from './curso_prerequisitos.controller';
import { CursoPrerequisito } from './entities/curso_prerequisito.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CursoPrerequisito])],
  controllers: [CursoPrerequisitosController],
  providers: [CursoPrerequisitosService],
})
export class CursoPrerequisitosModule {}
