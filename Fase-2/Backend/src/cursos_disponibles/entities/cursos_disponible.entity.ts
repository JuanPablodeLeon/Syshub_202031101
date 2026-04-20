import { Carrera } from "src/carreras/entities/carrera.entity";
import { CursoEspacio } from "src/curso_espacios/entities/curso_espacio.entity";
import { Pensum } from "src/pensum/entities/pensum.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class CursosDisponible {

    @Column({ primary: true, generated: true })
    id: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  codigo: string;

  @Column({ type: 'tinyint', unsigned: true })
  creditos: number;

  @Column({ type: 'boolean', default: true })
  obligatorio: boolean;

  @Column({ type: 'boolean', default: false })
  clar: boolean;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @ManyToOne(() => Carrera, (c) => c.cursosDisponibles)
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;

  @ManyToMany(() => CursosDisponible, (c) => c.requeridoPor)
  @JoinTable({
    name: 'curso_prerequisitos',
    joinColumn:        { name: 'curso_id',        referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'prerequisito_id', referencedColumnName: 'id' },
  })
  prerequisitos: CursosDisponible[];

  @ManyToMany(() => CursosDisponible, (c) => c.prerequisitos)
  requeridoPor: CursosDisponible[];

  @OneToMany(() => Pensum, (p) => p.cursoDisponible)
  pensums: Pensum[];

  @OneToMany(() => CursoEspacio, (ce) => ce.cursoDisponible)
  espacios: CursoEspacio[];
}
