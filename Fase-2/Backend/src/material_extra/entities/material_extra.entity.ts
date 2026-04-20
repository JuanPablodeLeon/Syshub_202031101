import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class MaterialExtra {

    @Column({ primary: true, generated: true })
    id: number;

@ManyToOne(() => Usuario, (u) => u.materialesExtra)
  @JoinColumn({ name: 'id_creador' })
  creador: Usuario;

  @OneToOne(() => Proyecto)
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: Proyecto;

  @CreateDateColumn({ name: 'fecha_subido', type: 'datetime' })
  fechaSubido: Date;

  @UpdateDateColumn({ name: 'fecha_modificado', type: 'datetime' })
  fechaModificado: Date;
}
