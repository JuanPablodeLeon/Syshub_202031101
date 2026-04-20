import { Carrera } from "src/carreras/entities/carrera.entity";
import { CursosDisponible } from "src/cursos_disponibles/entities/cursos_disponible.entity";
import { YearPensum } from "src/year_pensum/entities/year_pensum.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Pensum {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
  semestre: number;


  @ManyToOne(() => YearPensum, (ap) => ap.pensums)
  @JoinColumn({ name: 'year_pensum_id' })
  yearPensum: YearPensum;

  @ManyToOne(() => Carrera, (c) => c.pensums)
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;

  @ManyToOne(() => CursosDisponible, (cd) => cd.pensums)
  @JoinColumn({ name: 'curso_disponible_id' })
  cursoDisponible: CursosDisponible; 
}
