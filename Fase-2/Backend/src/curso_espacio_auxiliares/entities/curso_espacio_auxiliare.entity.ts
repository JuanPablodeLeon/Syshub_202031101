import { Column, Entity } from "typeorm";

@Entity()
export class CursoEspacioAuxiliare {
    
    @Column({ primary: true})
    curso_espacio_id: number;

    @Column( { primary: true})
    auxiliar_id: string;
}
