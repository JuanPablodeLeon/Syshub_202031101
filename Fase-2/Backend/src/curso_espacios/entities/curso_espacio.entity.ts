import { Column, Entity, JoinColumn } from "typeorm";

@Entity()
export class CursoEspacio {

    @Column({ primary: true, generated: true })
    id: number;

      /*@ManyToOne(() => CursoDisponible, { nullable: false })
  @JoinColumn({ name: 'curso_disponible_id' })*/
  @Column()
  curso_disponible_id: number;

  @Column()
  seccion: string;

 /* @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'catedratico_id' })*/
    @Column()
  catedratico_id: string;
/*
  @ManyToOne(() => PublicacionCurso, { nullable: true })
  @JoinColumn({ name: 'publicacion_id' })*/
  @Column({ nullable: true })
  publicacion_id: string;

  @Column()
  semestre: number; // CHECK IN (1,2) en BD

  @Column({ type: 'year' })
  anio: number;
/*
  @OneToMany(() => CursoEspacioAuxiliar, (cea) => cea.cursoEspacio)
  auxiliares: CursoEspacioAuxiliar[];

  @OneToMany(() => CursoEspacioEstudiante, (cee) => cee.cursoEspacio)
  estudiantes: CursoEspacioEstudiante[];
  */
}
