import { Column, Entity } from "typeorm";

@Entity()
export class CursoPrerequisito {

    @Column({ primary: true})
    curso_id: number;

    @Column({ primary: true})
    prerequisito_id: number;
}
