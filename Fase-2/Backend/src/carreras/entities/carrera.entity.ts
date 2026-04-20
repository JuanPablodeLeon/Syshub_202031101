import { Type } from "class-transformer";
import { CursosDisponible } from "src/cursos_disponibles/entities/cursos_disponible.entity";
import { Pensum } from "src/pensum/entities/pensum.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Carrera {
    

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @Column({
        nullable: true
    })
    descripcion: string;

    @ManyToMany(() => Usuario, (usuario) => usuario.carreras)
  usuarios: Usuario[];

  @OneToMany(() => CursosDisponible, (curso) => curso.carrera)
  cursosDisponibles: CursosDisponible[];

  @OneToMany(() => Pensum, (pensum) => pensum.carrera)
  pensums: Pensum[];

    @DeleteDateColumn()
    deletedAt: Date;

}
