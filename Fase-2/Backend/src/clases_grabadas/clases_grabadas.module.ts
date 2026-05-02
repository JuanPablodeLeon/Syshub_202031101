import { Module } from '@nestjs/common';
import { ClasesGrabadasService } from './clases_grabadas.service';
import { ClasesGrabadasController } from './clases_grabadas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasesGrabada } from './entities/clases_grabada.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  imports:[TypeOrmModule.forFeature([ClasesGrabada]), UsuariosModule],
  controllers: [ClasesGrabadasController],
  providers: [ClasesGrabadasService, UsuariosService],
})
export class ClasesGrabadasModule {}
