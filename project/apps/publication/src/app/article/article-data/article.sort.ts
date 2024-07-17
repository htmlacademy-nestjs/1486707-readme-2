import { Prisma } from '@prisma/client';
import { ArticleSortType } from '@project/shared/app/types';

export type ArticleSort = ArticleSortType;

export const articleSortToPrismaFilter = (
  sortType: ArticleSort
): Prisma.ArticleAggregateArgs | undefined => {
  if (!sortType) {
    return undefined;
  }

  let prismaFilter: Prisma.ArticleAggregateArgs;

  switch (sortType) {
    case ArticleSortType.DATE: {
      prismaFilter = {
        orderBy: {
          createdAt: 'desc',
        },
      };
      break;
    }
  }

  return prismaFilter;
};
