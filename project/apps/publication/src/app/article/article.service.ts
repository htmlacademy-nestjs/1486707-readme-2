import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { ArticleEntity } from './article.entity';
import { ARTICLE_NOT_FOUND } from './article.constants';
import { CreateArticleDto } from './dto/create-article.dto';
import { PublicationTagService } from '../publication-tag/publication-tag.service';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
     private readonly publicationTagService: PublicationTagService,
      private readonly commentService: CommentService) {}

  public async getArticle(id: string) {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new NotFoundException(ARTICLE_NOT_FOUND);
    }

    return article;
  }

  public async saveArticle(dto: CreateArticleDto) {
    const tags = await this.publicationTagService.getTagsByIds(dto.tags);
    const newArticle = ArticleEntity.fromDto(dto, tags);
    return this.articleRepository.save(newArticle);
  }

  public async updateArticle(id: string, dto: UpdateArticleDto): Promise<ArticleEntity> {
    const tags = await this.publicationTagService.getTagsByIds(dto.tags);
    const articleEntity = ArticleEntity.fromDto(dto, tags);
    try {
      const updatedArticle = await this.articleRepository.update(id, articleEntity)
      return updatedArticle;
    } catch {
      throw new NotFoundException(`Article with id ${id} does not exist`);
    }
  }

  public async deleteArticle(id: string) {
    return this.articleRepository.deleteById(id);
  }
}
