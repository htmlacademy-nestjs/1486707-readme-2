import { ArticleType } from '@project/shared/app/types';
import { LinkDataEntity } from './article-data/link-data.entity';
import { LinkDataRepository } from './article-data/link-data.repository';
import { PhotoDataEntity } from './article-data/photo-data.entity';
import { PhotoDataRepository } from './article-data/photo-data.repository';
import { QuoteDataEntity } from './article-data/quote-data.entity';
import { QuoteDataRepository } from './article-data/quote-data.repository';
import { TextDataEntity } from './article-data/text-data.entity';
import { TextDataRepository } from './article-data/text-data.repository';
import { VideoDataEntity } from './article-data/video-data.entity';
import { VideoDataRepository } from './article-data/video-data.repository';

export type ArticleDataEntity =
  | LinkDataEntity
  | PhotoDataEntity
  | QuoteDataEntity
  | TextDataEntity
  | VideoDataEntity;

export type ArticleDataRepository =
  | LinkDataRepository
  | PhotoDataRepository
  | QuoteDataRepository
  | TextDataRepository
  | VideoDataRepository;

export enum ArticleSortType {
  DATE = 'date',
  LIKES = 'likes',
  COMMENTS = 'comments',
}

export interface ArticleFilter {
  filterByType?: ArticleType;
  filterByAuthor?: string;
  filterByTags?: string[];
}

export interface ArticleQuery extends ArticleFilter {
  limit?: number;
  take?: number;
  sortByType?: ArticleSortType;
  sortDirection?: 'desc' | 'asc';
  page?: number;
  search?: string;
}
