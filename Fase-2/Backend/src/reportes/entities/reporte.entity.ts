import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

export type TipoReporte = 'foro' | 'blog';
export type EstadoReporte = 'pendiente' | 'revisado' | 'descartado';

@Entity()
export class Reporte {

      @Column({ primary: true, generated: true })
  id: number;

  /** 'foro' | 'blog' */
  @Column({ type: 'varchar', length: 10 })
  tipo: TipoReporte;

  /** ID de la publicación/blog reportado */
  @Column({ name: 'referencia_id', type: 'int' })
  referenciaId: number;

  @Column({ type: 'varchar', length: 500 })
  motivo: string;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: EstadoReporte;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Usuario, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reportado_por_id' })
  reportadoPor: Usuario;

  @CreateDateColumn({ name: 'creado_en', type: 'datetime' })
  creadoEn: Date;
}
