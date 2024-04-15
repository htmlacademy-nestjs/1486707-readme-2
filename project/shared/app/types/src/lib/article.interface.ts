import { ArticleType } from './article-type.enum';

export interface GeneralArticle {
  id?: string;
  authorId: string;
  type: ArticleType;
  tags?: string[];
}

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

export interface VideoArticle extends GeneralArticle, VideoArticleData {}

export interface TextArticle extends GeneralArticle, TextArticleData {}

export interface QuoteArticle extends GeneralArticle, QuoteArticleData {}

export interface PhotoArticle extends GeneralArticle, PhotoArticleData {}

export interface LinkArticle extends GeneralArticle, LinkArticleData {}

export type Article =
  | VideoArticle
  | TextArticle
  | QuoteArticle
  | PhotoArticle
  | LinkArticle;
