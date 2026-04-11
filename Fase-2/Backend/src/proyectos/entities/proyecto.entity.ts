import { Collection, Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Proyecto {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    id_creador: number;

    @Column()
    titulo: string;

    @Column({
        type: 'text'
    })
    descripcion: string;

    @Column({
        nullable: true, type: 'text'
    })
    stack: string;

    @CreateDateColumn()
    fecha_publicado: Date;

}
