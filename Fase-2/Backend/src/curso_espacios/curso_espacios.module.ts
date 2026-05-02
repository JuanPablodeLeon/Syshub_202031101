import { Module } from '@nestjs/common';
import { CursoEspaciosService } from './curso_espacios.service';
import { CursoEspaciosController } from './curso_espacios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEspacio } from './entities/curso_espacio.entity';
import { CursosDisponiblesModule } from 'src/cursos_disponibles/cursos_disponibles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { CursosDisponiblesService } from 'src/cursos_disponibles/cursos_disponibles.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CursosDisponible } from 'src/cursos_disponibles/entities/cursos_disponible.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CursoEspacio, CursosDisponible, Usuario]), CursosDisponiblesModule, UsuariosModule],
  controllers: [CursoEspaciosController],
  providers: [CursoEspaciosService],
  exports:[TypeOrmModule, CursoEspaciosService]
})
export class CursoEspaciosModule {}
