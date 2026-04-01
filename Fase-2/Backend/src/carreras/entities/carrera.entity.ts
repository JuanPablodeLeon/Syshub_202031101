import { Type } from "class-transformer";
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Carrera {
    

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @Column({
        nullable: true
    })
    descripcion: string;

    @DeleteDateColumn()
    deletedAt: Date;

}
