import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/user/user.repository';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository
    ) {}
}
