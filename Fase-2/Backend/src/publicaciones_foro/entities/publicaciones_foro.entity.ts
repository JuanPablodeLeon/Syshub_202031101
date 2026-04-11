import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class PublicacionesForo {

    @Column({ primary: true, generated: true })
    id: number;
/*
      @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_creador' })*/
  creador: string;

  @Column()
  titulo: string;

  @Column({ length: 2500 })
  descripcion: string;

  @Column({ default: 0 })
  cant_valoracion: number;

  @CreateDateColumn()
  hora_creacion: Date;

  @UpdateDateColumn()
  hora_modificado: Date;
}
