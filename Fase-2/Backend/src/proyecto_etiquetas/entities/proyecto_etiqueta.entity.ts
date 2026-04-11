import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class ProyectoEtiqueta {


    /*@ManyToOne(() => Proyecto, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'proyecto_id' })*/
    @Column({primary: true})
    proyecto_id: string;

  /*  @ManyToOne(() => Etiqueta)
    @JoinColumn({ name: 'etiqueta_id' })*/
    @Column({primary: true})
    etiqueta_id: string;
}
