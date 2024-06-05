import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { ArticleEntity } from './article.entity';
import { ARTICLE_NOT_FOUND } from './article.constants';
import { CreateArticleDto } from './dto/create-article.dto';
import { PublicationTagService } from '../publication-tag/publication-tag.service';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CommentService } from '../comment/comment.service';
import { ArticleMetaDataService } from './article-data/article-meta-data.service';
import { ArticleQuery } from './article.types';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly publicationTagService: PublicationTagService,
    private readonly commentService: CommentService,
    private readonly articleMetaDataService: ArticleMetaDataService
  ) {}

  public async getArticle(id: string) {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new NotFoundException(ARTICLE_NOT_FOUND);
    }

    const articleComments = await this.commentService.getCommentsByArticleId(
      id
    );

    if (articleComments) {
      article.comments = articleComments;
    }

    this.articleMetaDataService.setArticleDataMeta(article.type);
    const { articleDataRepository, articleDataIdType } =
      this.articleMetaDataService;

    const articleData = (
      await articleDataRepository.findById(
        article.articleDataIds[articleDataIdType]
      )
    ).toPOJO();

    article.articleData = articleData;

    return article;
  }

  public async saveArticle(dto: CreateArticleDto) {
    const tags = await this.publicationTagService.getTagsByIds(dto.tags);

    this.articleMetaDataService.setArticleDataMeta(dto.type);
    const { articleDataIdType, articleDataInterface } =
      this.articleMetaDataService;

    const newArticleData = await articleDataInterface(
      dto.articleData
    ).saveEntityInRepository();

    const articleDataIds = {
      [articleDataIdType]: newArticleData.id,
    };

    const newArticle = ArticleEntity.fromDto(dto, tags, articleDataIds);

    return this.articleRepository.save(newArticle);
  }

  public async updateArticle(
    id: string,
    dto: UpdateArticleDto
  ): Promise<ArticleEntity> {
    const tags = await this.publicationTagService.getTagsByIds(dto.tags);

    this.articleMetaDataService.setArticleDataMeta(dto.type);
    const { articleDataIdType, articleDataInterface } =
      this.articleMetaDataService;

    const currentArticle = await this.articleRepository.findById(id);

    const currentArticleDataId =
      currentArticle.articleDataIds[articleDataIdType];

    const updatedArticleData = await articleDataInterface(
      dto.articleData
    ).updateEntityInRepository(currentArticleDataId);

    const updatedArticleDataIds = {
      id: currentArticle.articleDataIds.id,
      [articleDataIdType]: updatedArticleData.id,
    };

    const articleEntity = ArticleEntity.fromDto(
      dto,
      tags,
      updatedArticleDataIds
    );

    try {
      const updatedArticle = await this.articleRepository.update(
        id,
        articleEntity
      );
      return updatedArticle;
    } catch {
      throw new NotFoundException(`Article with id ${id} does not exist`);
    }
  }

  public async deleteArticle(id: string) {
    try {
      const deletedArticle = await this.articleRepository.deleteById(id);
      return deletedArticle;
    } catch {
      throw new NotFoundException(`The article with id ${id} not found`);
    }
  }

  public async getArticles(query: ArticleQuery) {
    try {
      const foundArticles = await this.articleRepository.find(query);

      return foundArticles;
    } catch {
      throw new NotFoundException(`Articles for that query not found`);
    }
  }
}
