import { Column, Entity } from "typeorm";

@Entity()
export class CursosDisponible {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
  nombre: string;

  @Column({unique: true })
  codigo: string;

  @Column()
  creditos: number;

  @Column({ type: 'boolean', default: false })
  obligatorio: boolean;

  @Column({ type: 'boolean', default: false })
  clar: boolean;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  /*@ManyToOne(() => Carrera, { nullable: false })
  @JoinColumn({ name: 'carrera_id' })*/
  @Column()
  carrera: string;
}
