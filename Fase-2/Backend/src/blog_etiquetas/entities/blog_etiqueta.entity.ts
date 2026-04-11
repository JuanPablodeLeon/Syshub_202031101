import { Column, Entity } from "typeorm";

@Entity()
export class BlogEtiqueta {
    @Column({ primary: true})
    blog_id: number;

    @Column({ primary: true})
    etiqueta_id: number;
}
