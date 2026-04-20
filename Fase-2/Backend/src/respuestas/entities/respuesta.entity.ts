import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Collection, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Respuesta {

    @Column({ primary: true, generated: true })
    id: number;

  @ManyToOne(() => Usuario, (u) => u.respuestas)
  @JoinColumn({ name: 'id_creador' })
  creador: Usuario;

  @Column({ type: 'varchar', length: 2000 })
  descripcion: string;

  @Column({ name: 'cant_valoracion', type: 'int', default: 0 })
  cantValoracion: number;

  // Auto-referencial: una respuesta puede tener sub-respuestas
  @ManyToOne(() => Respuesta, (r) => r.subRespuestas, { nullable: true })
  @JoinColumn({ name: 'respuesta_padre' })
  padre: Respuesta | null;

  @OneToMany(() => Respuesta, (r) => r.padre)
  subRespuestas: Respuesta[];

  @CreateDateColumn({ name: 'creado_en', type: 'datetime' })
  creadoEn: Date;
}
