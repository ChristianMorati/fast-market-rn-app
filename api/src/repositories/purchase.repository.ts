import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Purchase } from "src/purchase/entity/purchase.entity";
import { Repository } from "typeorm";

@Injectable()
export class PurchaseRepository {
    constructor(
        @InjectRepository(Purchase)
        private purchaseRepository: Repository<Purchase>,
    ) { }

    async findAll(userId: number) {
        const purchases = await this.purchaseRepository.find({
            relations: {
                items: { product: true }
            },
            where: { user: { id: userId } }
        });
        return purchases;
    }

    async lastPurchase(userId: number) {
        const purchase: Purchase = await this.purchaseRepository.findOne({
            relations: {
                items: { product: true }
            },
            where: { user: { id: userId } }
        });

        if (!purchase) {
            return {
                error: 'sem dados para este usuário'
            };
        }
        return purchase;
    }

    async save(purchase: any) {
        return await this.purchaseRepository.save(purchase);
    }

    createPurchase(order: any) {
        return this.purchaseRepository.create(order);
    }
}