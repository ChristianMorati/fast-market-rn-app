import { IsDate, IsPositive, IsString } from "class-validator";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseItem } from "./purchase-items.entity";
import BaseEntity from "src/base_entity/base.entity";

@Entity()
export class Purchase extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @IsPositive()
    @Column()
    total: number;

    @IsString()
    @Column()
    payment_method: string;

    @IsDate()
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: null })
    updatedAt: Date;
    
    @OneToMany(() => PurchaseItem, purchaseItem => purchaseItem.purchase)
    @JoinTable()
    items: PurchaseItem[];

    @ManyToOne(() => User, user => user.purchases)
    user: User;
}
