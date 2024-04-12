import { BaseMemoryRepository } from '@project/shared/core';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseMemoryRepository<UserEntity> {
    public async findByEmail(email: string): Promise<UserEntity | null> {
        const entities = Array.from(this.entities.values())
        const user = entities.find((entity) => entity.email === email);
        return Promise.resolve(user);
    }
}
