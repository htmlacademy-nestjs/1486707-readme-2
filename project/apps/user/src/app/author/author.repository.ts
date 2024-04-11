import { BaseMemoryRepository } from '@project/shared/core';
import { AuthorEntity } from './author.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorRepository extends BaseMemoryRepository<AuthorEntity> {
    public async findByEmail(email: string): Promise<AuthorEntity | null> {
        const entities = Array.from(this.entities.values())
        const author = entities.find((entity) => entity.email === email);
        return Promise.resolve(author);
    }
}
