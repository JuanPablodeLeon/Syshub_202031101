import { Module } from '@nestjs/common';
import { CarrerasModule } from './carreras/carreras.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { EstadoPerfilModule } from './estado_perfil/estado_perfil.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { UsuarioCarrerasModule } from './usuario_carreras/usuario_carreras.module';
import { EtiquetasModule } from './etiquetas/etiquetas.module';
import { ArchivosProyectoModule } from './archivos_proyecto/archivos_proyecto.module';
import { ProyectoEtiquetasModule } from './proyecto_etiquetas/proyecto_etiquetas.module';
import { ClasesGrabadasModule } from './clases_grabadas/clases_grabadas.module';
import { MaterialExtraModule } from './material_extra/material_extra.module';
import { CursosDisponiblesModule } from './cursos_disponibles/cursos_disponibles.module';
import { CursoPrerequisitosModule } from './curso_prerequisitos/curso_prerequisitos.module';
import { YearPensumModule } from './year_pensum/year_pensum.module';
import { PensumModule } from './pensum/pensum.module';
import { PublicacionesCursoModule } from './publicaciones_curso/publicaciones_curso.module';
import { PublicacionProyectosModule } from './publicacion_proyectos/publicacion_proyectos.module';
import { PublicacionClasesModule } from './publicacion_clases/publicacion_clases.module';
import { PublicacionMaterialModule } from './publicacion_material/publicacion_material.module';
import { CursoEspaciosModule } from './curso_espacios/curso_espacios.module';
import { CursoEspacioAuxiliaresModule } from './curso_espacio_auxiliares/curso_espacio_auxiliares.module';
import { CursoEspacioEstudiantesModule } from './curso_espacio_estudiantes/curso_espacio_estudiantes.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { PublicacionesForoModule } from './publicaciones_foro/publicaciones_foro.module';
import { PublicacionesEtiquetasModule } from './publicaciones_etiquetas/publicaciones_etiquetas.module';
import { PublicacionRespuestasModule } from './publicacion_respuestas/publicacion_respuestas.module';
import { BlogArticulosModule } from './blog_articulos/blog_articulos.module';
import { BlogEtiquetasModule } from './blog_etiquetas/blog_etiquetas.module';
import { BlogRespuestasModule } from './blog_respuestas/blog_respuestas.module';
import { ActividadesModule } from './actividades/actividades.module';


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
    UsuarioCarrerasModule,
    EtiquetasModule,
    ArchivosProyectoModule,
    ProyectoEtiquetasModule,
    ClasesGrabadasModule,
    MaterialExtraModule,
    CursosDisponiblesModule,
    CursoPrerequisitosModule,
    YearPensumModule,
    PensumModule,
    PublicacionesCursoModule,
    PublicacionProyectosModule,
    PublicacionClasesModule,
    PublicacionMaterialModule,
    CursoEspaciosModule,
    CursoEspacioAuxiliaresModule,
    CursoEspacioEstudiantesModule,
    RespuestasModule,
    PublicacionesForoModule,
    PublicacionesEtiquetasModule,
    PublicacionRespuestasModule,
    BlogArticulosModule,
    BlogEtiquetasModule,
    BlogRespuestasModule,
    ActividadesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
