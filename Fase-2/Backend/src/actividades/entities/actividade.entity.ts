import { Entity, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Actividade {

    @Column({ primary: true, generated: true})
    id: number;
/*
      @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })*/
  usuario_id: string;

  @Column()
  tipoAccion: string;

  @Column({ nullable: true })
  referencia_id: number;

  @Column({ type: 'text', nullable: true })
  detalle: string | null;

  @CreateDateColumn()
  creado_en: Date;
}
