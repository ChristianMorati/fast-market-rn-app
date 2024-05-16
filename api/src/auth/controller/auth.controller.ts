import { Body, Controller, HttpStatus, Post, Put, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('signin')
    signIn(@Body() authDto: AuthDto) {
        const AT = this.authService.signin(
            authDto.username,
            authDto.password
        )
        return AT;
    }

    @Post('signup')
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Put('refresh')
    async refresh(@Body() body: any, @Res() res: Response) {
        var newAcessToken;
        try {
            newAcessToken = await this.authService.validateRefreshToken(body.token);
        } catch (e) {
            throw new UnauthorizedException();
        }
        res.status(HttpStatus.CREATED).json(newAcessToken).send();
    }
}