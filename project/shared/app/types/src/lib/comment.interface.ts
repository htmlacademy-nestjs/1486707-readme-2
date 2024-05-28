export interface Comment {
    id?: string;
    articleId?: string;
    authorId: string;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
}