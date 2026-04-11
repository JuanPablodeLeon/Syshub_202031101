import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class YearPensum {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({unique: false, type: 'year'})
    year: number; 

    @DeleteDateColumn()
    deletedAt: Date;
}
