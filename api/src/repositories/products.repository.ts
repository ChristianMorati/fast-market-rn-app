import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entity/product.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    async save(product: any): Promise<Product | undefined> {
        return await this.productsRepository.save(product);
    }

    async remove(id: number): Promise<void> {
        await this.productsRepository.delete(id);
    }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: number): Promise<Product | null> {
        return this.productsRepository.findOneBy({ id });
    }

    findOneBycode(code: string): Promise<Product | null> {
        return this.productsRepository.findOneBy({ code });
    }
}