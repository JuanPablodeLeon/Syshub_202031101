import { Column, Entity } from "typeorm";

@Entity()
export class ClasesGrabada {
    
    @Column({ primary: true, generated: true})
    id: number;

     /* @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_creador' })*/
  creador: string;

  @Column()
  nombre: string;

  @Column()
  fecha: Date; // Date en formato 'YYYY-MM-DD'

  @Column()
  enlace: string;

  @Column()
  clasificacion: string;
}
