import { Module } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductsRepository } from 'src/repositories/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
    ],
    providers: [
        ProductService,
        ProductsRepository,
    ],
    controllers: [
        ProductController,
    ]
})
export class ProductsModule {}
