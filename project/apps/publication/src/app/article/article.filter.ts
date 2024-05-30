import { Prisma } from "@prisma/client";
import { ArticleFilter } from "./article.types";


export const articleFilterToPrismaFilter = (filter: ArticleFilter): Prisma.ArticleWhereInput | undefined => {
    if (!filter) {
        return undefined;
    }

    const prismaFilter: Prisma.ArticleWhereInput = {};

    if (filter.type) {
        prismaFilter.type = filter.type;
    }

    return prismaFilter;
}