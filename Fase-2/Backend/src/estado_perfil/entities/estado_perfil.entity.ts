import { Column, Entity } from "typeorm";

@Entity()
export class EstadoPerfil {
    
    @Column({ primary: true, generated: true })
    id: number;

    @Column({unique: true})
    nombre: string;
}
