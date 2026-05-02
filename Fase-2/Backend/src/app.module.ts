import { Module } from '@nestjs/common';
import { CarrerasModule } from './carreras/carreras.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { EstadoPerfilModule } from './estado_perfil/estado_perfil.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { EtiquetasModule } from './etiquetas/etiquetas.module';
import { ArchivosProyectoModule } from './archivos_proyecto/archivos_proyecto.module';
import { ClasesGrabadasModule } from './clases_grabadas/clases_grabadas.module';
import { MaterialExtraModule } from './material_extra/material_extra.module';
import { CursosDisponiblesModule } from './cursos_disponibles/cursos_disponibles.module';
import { YearPensumModule } from './year_pensum/year_pensum.module';
import { PensumModule } from './pensum/pensum.module';
import { PublicacionesCursoModule } from './publicaciones_curso/publicaciones_curso.module';
import { CursoEspaciosModule } from './curso_espacios/curso_espacios.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { PublicacionesForoModule } from './publicaciones_foro/publicaciones_foro.module';
import { BlogArticulosModule } from './blog_articulos/blog_articulos.module';
import { ActividadesModule } from './actividades/actividades.module';
import { AuthModule } from './auth/auth.module';
import { ReportesModule } from './reportes/reportes.module';


@Module({
  imports: [
    CarrerasModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3307,
      username: "user_syshub",
      password: "root_syshub",
      database: "syshub_db_crud",
      autoLoadEntities: true,
      synchronize: true, //en produccion volver false
    }),
    UsuariosModule,
    RolesModule,
    EstadoPerfilModule,
    ProyectosModule,
    EtiquetasModule,
    ArchivosProyectoModule,
    ClasesGrabadasModule,
    MaterialExtraModule,
    CursosDisponiblesModule,
    YearPensumModule,
    PensumModule,
    PublicacionesCursoModule,
    CursoEspaciosModule,
    RespuestasModule,
    PublicacionesForoModule,
    BlogArticulosModule,
    ActividadesModule,
    AuthModule,
    ReportesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
