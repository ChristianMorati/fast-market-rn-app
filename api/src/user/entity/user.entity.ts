import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Purchase } from "src/purchase/entity/purchase.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ unique: true, nullable: true })
    cpf: string

    @Column()
    role: 'user' | 'default'

    @OneToMany(() => Purchase, purchase => purchase.user)
    @JoinTable()
    purchases: Purchase[];
}