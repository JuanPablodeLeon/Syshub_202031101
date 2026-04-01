import { Column } from "typeorm";

export class Usuario {

    @Column({ primary: true, generated: true})
    id: number;
}
