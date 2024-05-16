import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/auth/entity/token.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TokensRepository {
    constructor(
        @InjectRepository(Token)
        private tokensRepository: Repository<Token>,
    ) { }

    async save(token: any): Promise<Token | undefined> {
        return await this.tokensRepository.save(token);
    }

    async findOne(user_id: number): Promise<Token> {
        return await this.tokensRepository.findOneBy({ user_id });
    }

    async updateTokens(user_id:number, refresh_token: string) {

        try {
            const user_tokens = await this.tokensRepository.findOneBy({ user_id });

            if (user_tokens) {
                user_tokens.refresh_token = refresh_token;

                await this.tokensRepository.save(user_tokens);
                return { success: true}
            } else {
                return { success: false, message: 'Usuário não encontrado.' };
            }
        } catch (error) {
            return { success: false, message: 'Erro ao atualizar os tokens.' };
        }
    }
}