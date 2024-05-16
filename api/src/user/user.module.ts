import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersRepository } from 'src/user/user.repository';
import { UsersService } from './service/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UsersService,
        UsersRepository,
    ],
    exports: [UsersRepository]
})
export class UsersModule { }
