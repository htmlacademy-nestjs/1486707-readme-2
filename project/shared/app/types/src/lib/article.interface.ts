import { ArticleType } from './article-type.enum';
import { Tag } from './tag.interface';

export interface VideoArticleData {
  title: string;
  link: string;
  video: string;
}

export interface TextArticleData {
  text: string;
  preview: string;
}

export interface QuoteArticleData {
  text: string;
  quoteAuthor: string;
}

export interface PhotoArticleData {
  photo: string;
}

export interface LinkArticleData {
  link: string;
  description?: string;
}

export type ArticleData =
  | VideoArticleData
  | TextArticleData
  | QuoteArticleData
  | PhotoArticleData
  | LinkArticleData;

export interface Article {
  id?: string;
  authorId: string;
  type: ArticleType;
  tags?: Tag[];
  likes?: string[];
  data: ArticleData;
  isRepost?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
