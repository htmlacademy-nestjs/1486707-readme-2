import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleLikesRepository } from './article-likes.repository';
import { ArticleLikesEntity } from './article-likes.entity';


@Injectable()
export class ArticleLikesService {
  constructor(
    private readonly articleLikesRepository: ArticleLikesRepository
  ) {}

  public async getArticleLikes(id: string): Promise<ArticleLikesEntity> {
    return this.articleLikesRepository.findById(id);
  }

  public async updateArticleLikes(id: string, authorId: string): Promise<ArticleLikesEntity[]> {
    try {
        const updatedArticleLikes = await this.articleLikesRepository.updateArticleLikes(id, authorId)
        return updatedArticleLikes;
    } catch {
        throw new NotFoundException(`Failed updating the ${id} id article likes`);
    }
  }
}
