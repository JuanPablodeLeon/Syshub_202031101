import { Column, Entity } from "typeorm";

@Entity()
export class PublicacionProyecto {
    
    @Column({ primary: true})
    publicacion_id: number;

    @Column({primary: true})
    proyecto_id: number;

}
