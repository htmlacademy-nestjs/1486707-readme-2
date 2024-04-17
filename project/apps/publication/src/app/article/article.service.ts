import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { ArticleEntity } from './article.entity';
import { ARTICLE_NOT_FOUND } from './article.constants';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  public async getArticle(id: string) {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new NotFoundException(ARTICLE_NOT_FOUND);
    }

    return article;
  }

  public async saveArticle(dto: CreateArticleDto) {
    const newArticle = new ArticleEntity(dto);
    return this.articleRepository.save(newArticle);
  }

  public async deleteArticle(id: string) {
    return this.articleRepository.deleteById(id);
  }
}
