import { Prisma } from '@prisma/client';
import { ArticleFilter } from '@project/shared/app/types';

export const articleFilterToPrismaFilter = (
  {
    filterByType,
    filterByAuthor,
    filterByTags
  }: ArticleFilter,
): Prisma.ArticleWhereInput | undefined => {
  if (!filterByType && !filterByAuthor && !filterByTags) {
    return undefined;
  }

  const prismaFilter: Prisma.ArticleWhereInput = {};

  if (filterByType) {
    prismaFilter.type = filterByType;
  }

  if (filterByAuthor) {
    prismaFilter.authorId = filterByAuthor;
  }

  if (filterByTags) {
    prismaFilter.tags = {
      some: {
        id: {
          in: filterByTags,
        },
      },
    };
  }

  return prismaFilter;
};
