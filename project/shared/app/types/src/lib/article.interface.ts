import { ArticleLikes } from './article-likes.interface';
import { Comment } from './comment.interface';
import { Tag } from './tag.interface';

export enum ArticleDataIdNames {
  VIDEO_DATA_ID = 'videoDataId',
  TEXT_DATA_ID = 'textDataId',
  QUOTE_DATA_ID = 'quoteDataId',
  PHOTO_DATA_ID = 'photoDataId',
  LINK_DATA_ID = 'linkDataId',
}

export type ArticleType = 'video' | 'text' | 'quote' | 'photo' | 'link';
export type ArticleDataIds = {
  id?: string;
  articleId?: string;
  [ArticleDataIdNames.VIDEO_DATA_ID]?: string;
  [ArticleDataIdNames.TEXT_DATA_ID]?: string;
  [ArticleDataIdNames.QUOTE_DATA_ID]?: string;
  [ArticleDataIdNames.PHOTO_DATA_ID]?: string;
  [ArticleDataIdNames.LINK_DATA_ID]?: string;
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
  articleData?: ArticleData;
  authorId: string;
  tags?: Tag[];
  likes?: ArticleLikes[];
  comments?: Comment[];
  isRepost?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
