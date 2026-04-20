import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class ArchivosProyecto {

    @Column({ primary: true, generated: true})
    id: number;

@ManyToOne(() => Proyecto, (p) => p.archivos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: Proyecto;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ name: 'tipo_mime', type: 'varchar', length: 100, nullable: true })
  tipoMime: string | null;

  @Column({ name: 'tamano_bytes', type: 'int', unsigned: true, nullable: true })
  tamanoBytes: number | null;

  @CreateDateColumn({ name: 'subido_en', type: 'datetime' })
  subidoEn: Date;
}
