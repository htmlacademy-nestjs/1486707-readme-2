import { Prisma } from '@prisma/client';
import { ArticleSortType } from '@project/shared/app/types';

export const articleSortToPrismaSort = (
  sortByType: string,
  sortDirection: 'desc' | 'asc' = 'desc',
): Prisma.ArticleOrderByWithRelationInput | undefined => {
  if (!sortByType && !sortDirection) {
    return undefined;
  }

  const prismaOrderBy: Prisma.ArticleOrderByWithRelationInput = {};

  if (sortByType === ArticleSortType.DATE) {
    prismaOrderBy.createdAt = sortDirection;
  }

  if (sortByType === ArticleSortType.COMMENTS) {
    prismaOrderBy.comments = {
      _count: sortDirection,
    };
  }

  if (sortByType === ArticleSortType.LIKES) {
    prismaOrderBy.likes = {
      _count: sortDirection,
    };
  }

  return prismaOrderBy;
};
