import { Product } from "src/products/entity/product.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Purchase } from "./purchase.entity";
import BaseEntity from "src/base_entity/base.entity";

@Entity()
export class PurchaseItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Purchase, purchase => purchase.items)
    purchase: number;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    qtt_items: number
}