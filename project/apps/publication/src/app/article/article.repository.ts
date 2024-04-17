import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticleRepository extends BaseMemoryRepository<ArticleEntity> {}
