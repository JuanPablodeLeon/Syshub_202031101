import { Column, Entity } from "typeorm";

@Entity()
export class Pensum {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
  semestre: number; // CHECK manual en BD: 1-12

  /*@ManyToOne(() => AnioPensum, { nullable: false })
  @JoinColumn({ name: 'anio_pensum_id' })*/
  @Column()
  year_pensum: number;

  /*@ManyToOne(() => Carrera, { nullable: false })
  @JoinColumn({ name: 'carrera_id' })*/
  @Column()
  carrera: string;

  /*@ManyToOne(() => CursoDisponible, { nullable: false })
  @JoinColumn({ name: 'curso_disponible_id' })*/
  @Column()
  cursoDisponible: string;
}
