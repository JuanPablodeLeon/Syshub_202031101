import { Collection, Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Respuesta {

    @Column({ primary: true, generated: true })
    id: number;

    /*  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_creador' })*/
@Column()
  id_creador: number;

  @Column()
  descripcion: string;

  @Column({ default: 0 })
  cant_valoracion: number;
/*
  @ManyToOne(() => Respuesta, { nullable: true })
  @JoinColumn({ name: 'respuesta_padre' })*/
  @Column({ nullable: true })
  respuesta_padre: string;
/*
  @OneToMany(() => Respuesta, (r) => r.respuestaPadre)
  respuestasHijas: Respuesta[];*/

  @CreateDateColumn({ name: 'creado_en' })
  creado_en: Date;
}
