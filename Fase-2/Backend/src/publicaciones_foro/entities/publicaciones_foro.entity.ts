import { Etiqueta } from "src/etiquetas/entities/etiqueta.entity";
import { Respuesta } from "src/respuestas/entities/respuesta.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class PublicacionesForo {

    @Column({ primary: true, generated: true })
    id: number;

  @ManyToOne(() => Usuario, (u) => u.publicacionesForo)
  @JoinColumn({ name: 'id_creador' })
  creador: Usuario;

  @Column({ type: 'varchar', length: 300 })
  titulo: string;

  @Column({ type: 'varchar', length: 2500 })
  descripcion: string;

  @Column({ name: 'cant_valoracion', type: 'int', default: 0 })
  cantValoracion: number;

  @CreateDateColumn({ name: 'hora_creacion', type: 'datetime' })
  horaCreacion: Date;

  @UpdateDateColumn({ name: 'hora_modificado', type: 'datetime' })
  horaModificado: Date;

  @ManyToMany(() => Etiqueta, (e) => e.publicacionesForo)
  @JoinTable({
    name: 'publicacion_etiquetas',
    joinColumn:        { name: 'publicacion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'etiqueta_id',    referencedColumnName: 'id' },
  })
  etiquetas: Etiqueta[];

  @ManyToMany(() => Respuesta)
  @JoinTable({
    name: 'publicacion_respuestas',
    joinColumn:        { name: 'publicacion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'respuesta_id',   referencedColumnName: 'id' },
  })
  respuestas: Respuesta[];
}
