import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async createComment(dto: CreateCommentDto): Promise<CommentEntity> {
    const newComment = await new CommentEntity(dto);
    return this.commentRepository.save(newComment);
  }

  public async getCommentById(id: string): Promise<CommentEntity> {
    return await this.commentRepository.findById(id);
  }

  public async deleteCommentById(id: string): Promise<void> {
    await this.commentRepository.deleteById(id);
  }

  public async getCommentsByArticleId(
    articleId: string
  ): Promise<CommentEntity[]> {
    return await this.commentRepository.findByArticleId(articleId);
  }
}
