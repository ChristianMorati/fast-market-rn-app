import { Injectable } from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { ProductsRepository } from 'src/repositories/products.repository';

@Injectable()
export class ProductService {
    constructor(
        private productsRepository: ProductsRepository
    ) { }

    async findAll(): Promise<Product[]> {
        return await this.productsRepository.findAll();
    }

    async findOneByCode(code: string): Promise<Product | undefined> {
        return await this.productsRepository.findOneBycode(code);
    }

    async findOne(id: number): Promise<Product | undefined> {
        return await this.productsRepository.findOne(id);
    }
}
