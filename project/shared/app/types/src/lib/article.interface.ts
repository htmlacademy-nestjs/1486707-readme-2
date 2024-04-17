import { ArticleType } from './article-type.enum';

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
  tags?: string[];
  data: ArticleData;
  isRepost?: boolean;
}
