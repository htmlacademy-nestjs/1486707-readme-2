import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async createComment(dto: CreateCommentDto) {
    const newComment = await new CommentEntity(dto);
    return this.commentRepository.save(newComment);
  }

  public async getCommentsForArticle(id: string) {
    return await this.commentRepository.getCommentsForPublication(id);
  }

  public async deleteCommentsForArticle(id: string) {
    await this.commentRepository.deleteCommentsByPublicationId(id);
  }
}
