import { Column, Entity } from "typeorm";

@Entity()
export class PublicacionesCurso {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({nullable: true})
    destacado_id: number;
}
