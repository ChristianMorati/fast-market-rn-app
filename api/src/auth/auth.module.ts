import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Token } from './entity/token.entity';
import { TokensRepository } from 'src/repositories/tokens.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UsersModule } from 'src/user/user.module';
import { UsersRepository } from 'src/user/user.repository';
import { UsersService } from 'src/user/service/user.service';
import { jwtConstants } from './constants';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([User, Token]),
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [
        UsersRepository,
        UsersService,
        TokensRepository,

        AuthService,
        JwtService,
    ],
    controllers: [AuthController],
})
export class AuthModule { }
