import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from 'src/products/entity/product.entity';
import { ProductService } from 'src/products/service/product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
    ) { }

    @Get()
    findAll(): Promise<Product[] | undefined> {
        return this.productService.findAll();
    }

    @Get('/code/:code')
    findOneByCode(@Param() params: any): Promise<Product | undefined> {
        return this.productService.findOneByCode(params.code)
    }

    @Get('/:id')
    findOne(@Param() params: any): Promise<Product | undefined> {
        return this.productService.findOne(params.id)
    }
}
