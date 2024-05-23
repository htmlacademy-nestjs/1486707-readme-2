import { ArticleLikes } from './article-likes.interface';
import { Comment } from './comment.interface';
import { Tag } from './tag.interface';

export type ArticleType = 'video' | 'text' | 'quote' | 'photo' | 'link';
export type ArticleDataIds = {
  id?: string;
  articleId?: string;
  videoDataId?: string;
  textDataId?: string;
  quoteDataId?: string;
  photoDataId?: string;
  linkDataId?: string;
};

export interface ArticleDataMeta {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VideoArticleData extends ArticleDataMeta {
  title: string;
  link: string;
  video: string;
}

export interface TextArticleData extends ArticleDataMeta {
  text: string;
  preview: string;
}

export interface QuoteArticleData extends ArticleDataMeta {
  text: string;
  quoteAuthor: string;
}

export interface PhotoArticleData extends ArticleDataMeta {
  photo: string;
}

export interface LinkArticleData extends ArticleDataMeta {
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
  type: ArticleType;
  articleDataIds?: ArticleDataIds;
  authorId: string;
  tags?: Tag[];
  likes?: ArticleLikes;
  comments?: Comment[];
  isRepost?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
