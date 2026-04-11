import { Column, Entity } from "typeorm";

@Entity()
export class PublicacionRespuesta {
    
    @Column({ primary: true})
    publicacion_id: number;

    @Column({ primary: true})
    respuesta_id: number;
}
