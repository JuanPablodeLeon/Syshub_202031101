import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Entity, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Actividade {

    @Column({ primary: true, generated: true})
    id: number;

  @ManyToOne(() => Usuario, (u) => u.actividades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'tipo_accion', type: 'varchar', length: 80 })
  tipoAccion: string; // 'publicacion_curso' | 'foro' | 'blog' | 'respuesta' | ...

  @Column({ name: 'referencia_id', type: 'int', unsigned: true, nullable: true })
  referenciaId: number | null;

  @Column({ type: 'text', nullable: true })
  detalle: string | null;

  @CreateDateColumn({ name: 'creado_en', type: 'datetime' })
  creadoEn: Date;
}
