import { compare, genSalt, hash } from 'bcrypt';
import { User, UserRole } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { SALT_ROUNDS } from './user.constants';

export class UserEntity implements User, Entity<string> {
  public id?: string;
  public email: string;
  public name: string;
  public avatar?: string;
  public passwordHash: string;
  public role: UserRole;

  constructor(user: User) {
    this.populate(user);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
      role: this.role,
    };
  }

  public populate(data: User): void {
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.avatar = data.avatar;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePasswords(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
