import { ArticleData, ArticleType } from '@project/shared/app/types';

export class CreateArticleDto {
  public type: ArticleType;
  public authorId: string;
  public tags?: string[];
  public articleData: ArticleData;
}
