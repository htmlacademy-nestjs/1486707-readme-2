import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleLikesRepository } from './article-likes.repository';
import { ArticleLikesEntity } from './article-likes.entity';
import { UpdateArticleLikesDto } from './dto/update-article-likes.dto';


@Injectable()
export class ArticleLikesService {
  constructor(
    private readonly articleLikesRepository: ArticleLikesRepository
  ) {}

  public async getArticleLikes(id: string): Promise<ArticleLikesEntity> {
    return this.articleLikesRepository.findById(id);
  }

  public async updateArticleLikes(id: string, dto: UpdateArticleLikesDto): Promise<ArticleLikesEntity> {
    try {
        const updatedArticleLikes = await this.articleLikesRepository.update(id, ArticleLikesEntity.fromObject(dto))
        return updatedArticleLikes;
    } catch {
        throw new NotFoundException(`Failed updating the ${id} id article likes`);
    }
  }
}
