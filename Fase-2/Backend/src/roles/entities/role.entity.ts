import { Rol } from "src/common/enums/rol.enum";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Role {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({type: 'enum', enum: Rol})
    nombre: string;

    @Column({
        nullable: true,
    })
    descripcion: string;

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];
}
