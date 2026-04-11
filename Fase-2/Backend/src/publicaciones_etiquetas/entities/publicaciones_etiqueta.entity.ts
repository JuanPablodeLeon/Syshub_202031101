import { Column, Entity } from "typeorm";

@Entity()
export class PublicacionesEtiqueta {

    @Column({ primary: true })
    publicacion_id: number;

    @Column({ primary: true })
    etiqueta_id: number;
}
