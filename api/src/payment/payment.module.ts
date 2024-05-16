import { Module } from '@nestjs/common';
import { PaymentController } from './controller/payment.controller';
import { PaymentService } from './service/payment.service';
import { UsersModule } from 'src/user/user.module';

@Module({
  // imports: [UsersModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
  ]
})
export class PaymentModule { }
