import { Column, Entity } from "typeorm";

@Entity()
export class Role {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    nombre: string;

    @Column({
        nullable: true,
    })
    descripcion: string;
}
