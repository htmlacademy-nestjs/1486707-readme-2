import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { ArticleEntity } from './article.entity';
import { ARTICLE_NOT_FOUND } from './article.constants';
import { CreateArticleDto } from './dto/create-article.dto';
import { PublicationTagService } from '../publication-tag/publication-tag.service';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CommentService } from '../comment/comment.service';
import { LinkDataRepository } from './article-data/link-data.repository';
import { PhotoDataRepository } from './article-data/photo-data.repository';
import { QuoteDataRepository } from './article-data/quote-data.repository';
import { TextDataRepository } from './article-data/text-data.repository';
import { VideoDataRepository } from './article-data/video-data.repository';
import { ArticleType } from '@prisma/client';
import { ArticleDataIdNames, ArticleDataIds } from '@project/shared/app/types';
import { LinkDataEntity } from './article-data/link-data.entity';
import { QuoteDataEntity } from './article-data/quote-data.entity';
import { PhotoDataEntity } from './article-data/photo-data.entity';
import { TextDataEntity } from './article-data/text-data.entity';
import { VideoDataEntity } from './article-data/video-data.entity';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly linkDataRepository: LinkDataRepository,
    private readonly photoDataRepository: PhotoDataRepository,
    private readonly quoteDatarepository: QuoteDataRepository,
    private readonly textDataRepository: TextDataRepository,
    private readonly videoDataRepository: VideoDataRepository,
    private readonly publicationTagService: PublicationTagService,
    private readonly commentService: CommentService,
  ) {}

  private getArticleDataMeta(type: ArticleType) {
    let articleDataRepository:
      | LinkDataRepository
      | PhotoDataRepository
      | QuoteDataRepository
      | TextDataRepository
      | VideoDataRepository;
    let articleDataEntity:
      | LinkDataEntity
      | PhotoDataEntity
      | QuoteDataEntity
      | TextDataEntity
      | VideoDataEntity;
    let articleDataIdType: keyof ArticleDataIds;

    switch (type) {
      case ArticleType.link: {
        articleDataRepository = this.linkDataRepository;
        articleDataIdType = ArticleDataIdNames.LINK_DATA_ID;
        articleDataEntity = new LinkDataEntity();
        break;
      }
      case ArticleType.photo: {
        articleDataRepository = this.photoDataRepository;
        articleDataIdType = ArticleDataIdNames.PHOTO_DATA_ID;
        articleDataEntity = new PhotoDataEntity();
        break;
      }
      case ArticleType.quote: {
        articleDataRepository = this.quoteDatarepository;
        articleDataIdType = ArticleDataIdNames.QUOTE_DATA_ID;
        articleDataEntity = new QuoteDataEntity();
        break;
      }
      case ArticleType.text: {
        articleDataRepository = this.textDataRepository;
        articleDataIdType = ArticleDataIdNames.TEXT_DATA_ID;
        articleDataEntity = new TextDataEntity();
        break;
      }
      case ArticleType.video: {
        articleDataRepository = this.videoDataRepository;
        articleDataIdType = ArticleDataIdNames.VIDEO_DATA_ID;
        articleDataEntity = new VideoDataEntity();
        break;
      }
    }

    return {
      articleDataRepository,
      articleDataIdType,
      articleDataEntity,
    };
  }

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

    const { articleDataRepository, articleDataIdType } =
      this.getArticleDataMeta(article.type);

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

    const { articleDataRepository, articleDataIdType, articleDataEntity } =
      this.getArticleDataMeta(dto.type);

    articleDataEntity.populate(dto.articleData as any);
    const newArticleData = await articleDataRepository.save(
      articleDataEntity as any
    );

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

    const { articleDataRepository, articleDataIdType, articleDataEntity } =
      this.getArticleDataMeta(dto.type);
    const currentArticle = await this.articleRepository.findById(id);

    const currentArticleDataId =
      currentArticle.articleDataIds[articleDataIdType];

    const updatedArticleDataEntity = articleDataEntity
      .populate(dto.articleData as any)
      .toPOJO();
    const updatedArticleData = await articleDataRepository.update(
      currentArticleDataId,
      updatedArticleDataEntity as any
    );

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
}
