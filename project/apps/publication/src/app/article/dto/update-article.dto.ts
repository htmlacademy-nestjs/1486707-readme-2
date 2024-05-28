import { ArticleData, ArticleType } from '@project/shared/app/types';

export class UpdateArticleDto {
  public type: ArticleType;
  public authorId: string;
  public tags?: string[];
  public isRepost?: boolean;
  public articleData: ArticleData;
}
