import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class MaterialExtra {

    @Column({ primary: true, generated: true })
    id: number;

    /*@ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_creador' })*/
  @Column()
  id_creador: string;

  /*@ManyToOne(() => Proyecto, { nullable: false, unique: true })
  @JoinColumn({ name: 'proyecto_id' })*/
  @Column()
  proyecto_id: string;

  @CreateDateColumn()
  fecha_subido: Date;

  @UpdateDateColumn()
  fecha_modificado: Date;
}
