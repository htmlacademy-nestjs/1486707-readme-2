import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentRepository extends BaseMemoryRepository<CommentEntity> {
    public getCommentsForPublication(id: string) {
        const foundComments = [];
        this.entities.forEach((comment, publicationId, comments) => {
            if (publicationId === id) {
                foundComments.push(comments.get(comment.id));
            }
        })
        return foundComments;
    }

    public deleteCommentsByPublicationId(id: string) {
        this.entities.forEach((comment, publicationId, comments) => {
            if (publicationId === id) {
                comments.delete(comment.id);
            }
        })
    }
}
