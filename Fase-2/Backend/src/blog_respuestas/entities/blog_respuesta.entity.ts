import { Column, Entity } from "typeorm";

@Entity()
export class BlogRespuesta {
    @Column({ primary: true})
    blog_id: number;

    @Column({ primary: true})
    respuesta_id: number;
}
