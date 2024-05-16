import { Module } from '@nestjs/common';
import { Purchase } from './entity/purchase.entity';
import { PurchaseController } from './controller/purchase.controller';
import { PurchaseRepository } from 'src/repositories/purchase.repository';
import { PurchaseService } from './service/purchase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UsersRepository } from 'src/user/user.repository';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Purchase, User]),
  ],
  providers: [
    PurchaseService,
    // PurchaseRepository,
    // UsersRepository
  ],
  controllers: [PurchaseController]
})
export class PurchaseModule { }
