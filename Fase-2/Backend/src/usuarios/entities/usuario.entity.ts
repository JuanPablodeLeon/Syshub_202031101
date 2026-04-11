import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Usuario {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellidos: string;

    @Column({unique: true})
    correo: string;
    
    @Column()
    password: string;

    @Column()
    description: string;

    @Column()
    rol_id: string;

    @Column()
    estado_perfil_id: string;

    @Column()
    creado_en: Date;

    @Column()
    ultimo_acceso: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
