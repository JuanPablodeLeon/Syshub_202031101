import { Column, Entity } from "typeorm";

@Entity()
export class UsuarioCarrera {
    @Column({ primary: true })
    usuario_id: number;

    @Column({ primary: true })
    carrera_id: number;
}
