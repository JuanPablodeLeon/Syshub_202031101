import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class BlogArticulo {
    @Column({ primary: true, generated: true})
    id: number;


  /*@ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_creador' })*/
  @Column()
  id_creador: string;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'int', default: 0 })
  cant_valoracion: number;

  @CreateDateColumn()
  hora_creacion: Date;

  @UpdateDateColumn()
  hora_modificado: Date;
}
