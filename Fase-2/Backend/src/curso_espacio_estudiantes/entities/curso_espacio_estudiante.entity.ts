import { Column, Entity } from "typeorm";

@Entity()
export class CursoEspacioEstudiante {
    
    @Column({ primary: true})
    curso_espacio_id: number;

    @Column({ primary: true})
    estudiante_id: number;
}
