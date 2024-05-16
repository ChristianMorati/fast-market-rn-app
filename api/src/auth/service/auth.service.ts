import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto-js';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../entity/token.entity';
import { TokensRepository } from 'src/repositories/tokens.repository';
import { User } from 'src/user/entity/user.entity';
import { UsersRepository } from 'src/user/user.repository';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthService {
    private readonly key: string = process.env.ENCRYPTION_KEY;

    constructor(
        private jwtService: JwtService,
        private usersRepository: UsersRepository,
        private tokensRepository: TokensRepository,
    ) { }

    async signin(username: string, userPassword: string): Promise<Object> {
        const user = await this.usersRepository.findOneByUsername(username);

        if (!user) {
            throw new UnauthorizedException();
        }
        if (!await this.compareHashPassword(userPassword, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.username };
        const accessToken = await this.genAccessToken(payload);
        const refreshToken = await this.genRefreshToken(payload);

        await this.tokensRepository.updateTokens(
            user.id,
            refreshToken
        )

        const unHashdCpf = this.decryptToken(user.cpf);
        user.cpf = unHashdCpf;

        const { password, ...signedUser } = user;
        return { ...signedUser, access_token: accessToken };
    }

    private encryptToken(token: string) {
        const rt_encripted = crypto.AES.encrypt(token, this.key);
        return rt_encripted.toString();
    }

    private decryptToken(encryptedToken: string) {
        const bytes = crypto.AES.decrypt(encryptedToken, this.key);
        const decrypted = bytes.toString(crypto.enc.Utf8);
        return decrypted.toString();
    }

    private async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    private async compareHashPassword(password: string, hashedPassword: string) {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }

    async signUp(createUserDto: CreateUserDto) {

        createUserDto.password = await this.hashPassword(createUserDto.password);

        if (createUserDto.cpf) createUserDto.cpf = this.encryptToken(createUserDto.cpf);

        let createdUser: User = await this.usersRepository.save(createUserDto);

        if (!createdUser) { throw Error('Error to save user'); }

        const tokeInfo = {
            sub: createdUser.id,
            username: createdUser.username,
        }

        const accessToken = await this.genAccessToken(tokeInfo);
        const refreshToken = await this.genRefreshToken(tokeInfo);

        const setTokens: Partial<Token> = {
            user_id: createdUser.id,
            refresh_token: refreshToken
        }

        const unHashedCpf = this.decryptToken(createdUser.cpf);
        createdUser.cpf = unHashedCpf;

        const { password, ...user } = createdUser;

        await this.tokensRepository.save(setTokens);
        return { ...user, access_token: accessToken };
    }

    async genRefreshToken(payload: Object): Promise<string> {
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: jwtConstants.rtExpiresIn,
            secret: jwtConstants.secret,
        });
        return refreshToken;
    }

    async genAccessToken(payload: Object): Promise<string> {
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: jwtConstants.expiresIn,
            secret: jwtConstants.secret,
        });
        return refreshToken;
    }

    async validateRefreshToken(accessToken: string) {
        var payload = await this.jwtService.decode(accessToken);
        var user_id = payload.sub;

        try {
            // very accessToken integrity
            await this.jwtService.verifyAsync(accessToken, {
                secret: jwtConstants.secret,
                ignoreExpiration: true
            });
        } catch (error) {
            throw new UnauthorizedException();
        }

        try {
            const userTokens = await this.tokensRepository.findOne(user_id);
            if (!userTokens?.refresh_token) throw new UnauthorizedException();

            const payload = await this.jwtService.verifyAsync(userTokens.refresh_token, { secret: jwtConstants.secret });

            const newPayload = { sub: user_id, username: payload.username };
            const accessToken = await this.genAccessToken(newPayload);
            const refreshToken = await this.genRefreshToken(newPayload);

            await this.tokensRepository.updateTokens(user_id, refreshToken);
            return { access_token: accessToken };
        } catch (e) {
            // console.error('RT expired');
            throw new UnauthorizedException();
        }
    }
}