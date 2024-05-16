import BaseEntity from "src/base_entity/base.entity";
import { Column, Entity } from "typeorm";


@Entity()
export class Product extends BaseEntity {
    @Column({ unique: true })
    code: string

    @Column()
    description: string

    @Column('text')
    url_img: string

    @Column({ type: 'float' })
    unit_price: number;
}