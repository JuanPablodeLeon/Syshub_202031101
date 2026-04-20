import { CursosDisponible } from "src/cursos_disponibles/entities/cursos_disponible.entity";
import { PublicacionesCurso } from "src/publicaciones_curso/entities/publicaciones_curso.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class CursoEspacio {

    @Column({ primary: true, generated: true })
    id: number;

  @ManyToOne(() => CursosDisponible, (cd) => cd.espacios)
  @JoinColumn({ name: 'curso_disponible_id' })
  cursoDisponible: CursosDisponible;

  @Column({ type: 'varchar', length: 10 })
  seccion: string;

  @ManyToOne(() => Usuario, (u) => u.cursosComoDocente)
  @JoinColumn({ name: 'catedratico_id' })
  catedratico: Usuario;

  @OneToOne(() => PublicacionesCurso, { nullable: true })
  @JoinColumn({ name: 'publicacion_id' })
  publicacion: PublicacionesCurso;

  @Column({ type: 'tinyint', unsigned: true })
  semestre: number; 

  @Column({ type: 'year' })
  year: number;

  @ManyToMany(() => Usuario, (u) => u.cursosComoAuxiliar)
  @JoinTable({
    name: 'curso_espacio_auxiliares',
    joinColumn:        { name: 'curso_espacio_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'auxiliar_id',      referencedColumnName: 'id' },
  })
  auxiliares: Usuario[];

  // Estudiantes inscritos (agrega el administrador)
  @ManyToMany(() => Usuario, (u) => u.cursosComoEstudiante)
  @JoinTable({
    name: 'curso_espacio_estudiantes',
    joinColumn:        { name: 'curso_espacio_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'estudiante_id',    referencedColumnName: 'id' },
  })
  estudiantes: Usuario[];
}
