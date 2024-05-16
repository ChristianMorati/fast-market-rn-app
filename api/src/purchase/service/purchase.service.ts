import { Injectable } from '@nestjs/common';
import { PartialType } from '@nestjs/swagger';
import { Product } from 'src/products/entity/product.entity';
import { Purchase } from '../entity/purchase.entity';
import { PurchaseItem } from '../entity/purchase-items.entity';
import { PurchaseRepository } from 'src/repositories/purchase.repository';
import { User } from 'src/user/entity/user.entity';
import { UsersRepository } from 'src/user/user.repository';

@Injectable()
export class PurchaseService {
    constructor(
        private readonly purchaseRepository: PurchaseRepository,
        private readonly userRepository: UsersRepository
    ) { }

    findAll(userId: number) {
        return this.purchaseRepository.findAll(userId);
    }

    lastPurchase(userId: number) {
        return this.purchaseRepository.lastPurchase(userId);
    }

    async createPurchase(order: any) {
        /* 
        
        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const { total, payment_method, items, userId } = order

            const user = await this.userRepository.findOne(userId);

            const purchase = new Purchase();
            purchase.payment_method = payment_method;
            purchase.total = total;
            purchase.user = userId;

            const createdPurchase = await queryRunner.manager.save(Purchase, purchase);

            var { id } = createdPurchase

            console.error(id);
            
            var list = []
            items.forEach(async (item: any) => {
                const purchaseItem = new PurchaseItem();
                purchaseItem.purchase = id
                purchaseItem.product = item.product.id
                purchaseItem.qtt_items = item.qtt_items
                const createdPurchaseItem = await queryRunner.manager.save(PurchaseItem, purchaseItem)
                list.push(createdPurchaseItem);
            });

            await queryRunner.manager.update(Purchase, id, {
                ...purchase,
                items: list
            })

            await queryRunner.commitTransaction()
        } catch (err) {
            await queryRunner.rollbackTransaction();
            return undefined;
        } finally {
            await queryRunner.release();
        }
        */
    }
}