import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import {
  AUTH_USER_NOT_FOUND,
} from './author.constants';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAuthor(email: string) {
    const author = await this.authorRepository.findByEmail(email);
    if (!author) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    return author;
  }
}
