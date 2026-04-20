import { BlogArticulo } from "src/blog_articulos/entities/blog_articulo.entity";
import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { PublicacionesForo } from "src/publicaciones_foro/entities/publicaciones_foro.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Etiqueta {

    @Column({ primary: true, generated: true })
    id: number;

    @Column({ unique: true })
    nombre: string;

    @ManyToMany(() => Proyecto, (p) => p.etiquetas)
  proyectos: Proyecto[];

  @ManyToMany(() => PublicacionesForo, (pf) => pf.etiquetas)
  publicacionesForo: PublicacionesForo[];

  @ManyToMany(() => BlogArticulo, (b) => b.etiquetas)
  blogArticulos: BlogArticulo[];
}
