import { Tag } from './tag.interface';

export type ArticleType = 'video' | 'text' | 'quote' | 'photo' | 'link'

export interface VideoArticleData {
  type: ArticleType;
  title: string;
  link: string;
  video: string;
}

export interface TextArticleData {
  type: ArticleType;
  text: string;
  preview: string;
}

export interface QuoteArticleData {
  type: ArticleType;
  text: string;
  quoteAuthor: string;
}

export interface PhotoArticleData {
  type: ArticleType;
  photo: string;
}

export interface LinkArticleData {
  type: ArticleType;
  link: string;
  description?: string;
}

export type ArticleData =
  & VideoArticleData
  & TextArticleData
  & QuoteArticleData
  & PhotoArticleData
  & LinkArticleData;

export interface Article extends ArticleData {
  id?: string;
  authorId: string;
  tags?: Tag[];
  likes?: string[];
  isRepost?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
