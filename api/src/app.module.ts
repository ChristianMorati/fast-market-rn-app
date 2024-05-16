import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { Product } from './products/entity/product.entity';
import { ProductsModule } from './products/products.module';
import { Purchase } from './purchase/entity/purchase.entity';
import { PurchaseItem } from './purchase/entity/purchase-items.entity';
import { PurchaseModule } from './purchase/purchase.module';
import { Token } from './auth/entity/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   database: process.env.DB_NAME,
    //   entities: [User, Token, Product, Purchase, PurchaseItem],
    //   synchronize: true,
    // }),
    // UsersModule,
    // AuthModule,
    // ProductsModule,
    // PurchaseModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
