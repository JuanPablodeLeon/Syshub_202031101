import { Column, Entity } from "typeorm";

@Entity()
export class PublicacionClase {

    @Column({ primary: true })
    publicacion_id: number;

    @Column({primary: true})
    clase_id: number;
}
