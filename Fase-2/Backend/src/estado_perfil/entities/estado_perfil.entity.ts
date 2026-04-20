import { Estado } from "src/common/enums/estado.enum";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class EstadoPerfil {
    
    @Column({ primary: true, generated: true })
    id: number;

    @Column({unique: true, type: 'enum', enum:Estado})
    nombre: string;

    @OneToMany(() => Usuario, (usuario) => usuario.estadoPerfil)
  usuarios: Usuario[];
}
