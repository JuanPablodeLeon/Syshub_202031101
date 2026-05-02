import { Actividade } from "src/actividades/entities/actividade.entity";
import { BlogArticulo } from "src/blog_articulos/entities/blog_articulo.entity";
import { Carrera } from "src/carreras/entities/carrera.entity";
import { ClasesGrabada } from "src/clases_grabadas/entities/clases_grabada.entity";
import { CursoEspacio } from "src/curso_espacios/entities/curso_espacio.entity";
import { EstadoPerfil } from "src/estado_perfil/entities/estado_perfil.entity";
import { MaterialExtra } from "src/material_extra/entities/material_extra.entity";
import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { PublicacionesForo } from "src/publicaciones_foro/entities/publicaciones_foro.entity";
import { Respuesta } from "src/respuestas/entities/respuesta.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Usuario {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellidos: string;

    @Column({unique: true})
    correo: string;
    
    @Column()
    password: string;

    @Column({nullable: true})
    description: string;

    @ManyToOne(() => Role, (role) => role.id, {
        eager: true
    })
    @JoinColumn({ name: 'rol_id' })
    rol: Role;

    @ManyToOne(() => EstadoPerfil, (ep) => ep.usuarios, { eager: true })
    @JoinColumn({ name: 'estado_perfil_id' })
    estadoPerfil: EstadoPerfil;

    @ManyToMany(() => Carrera, (carrera) => carrera.usuarios)
  @JoinTable({
    name: 'usuario_carreras',
    joinColumn:        { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'carrera_id', referencedColumnName: 'id' },
  })
  carreras: Carrera[];

    @Column({
      nullable: true,
    })
    creado_en: Date;


    
    @Column({
      nullable: true,
    })
    ultimo_acceso: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Proyecto, (p) => p.creador)
  proyectos: Proyecto[];

  @OneToMany(() => ClasesGrabada, (c) => c.creador)
  clasesGrabadas: ClasesGrabada[];

  @OneToMany(() => MaterialExtra, (m) => m.creador)
  materialesExtra: MaterialExtra[];

  @OneToMany(() => CursoEspacio, (ce) => ce.catedratico)
  cursosComoDocente: CursoEspacio[];

  @ManyToMany(() => CursoEspacio, (ce) => ce.auxiliares)
  cursosComoAuxiliar: CursoEspacio[];

  @ManyToMany(() => CursoEspacio, (ce) => ce.estudiantes)
  cursosComoEstudiante: CursoEspacio[];

  @OneToMany(() => Respuesta, (r) => r.creador)
  respuestas: Respuesta[];

  @OneToMany(() => PublicacionesForo, (pf) => pf.creador)
  publicacionesForo: PublicacionesForo[];

  @OneToMany(() => BlogArticulo, (b) => b.creador)
  blogArticulos: BlogArticulo[];

  @OneToMany(() => Actividade, (a) => a.usuario)
  actividades: Actividade[];


}
