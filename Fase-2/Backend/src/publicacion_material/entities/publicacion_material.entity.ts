import { Column, Entity } from "typeorm";

@Entity()
export class PublicacionMaterial {

    @Column({ primary: true })
    publicacion_id: number;

    @Column({ primary: true })
    material_id: number;
}
