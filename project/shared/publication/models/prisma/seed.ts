import { PrismaClient } from '@prisma/client';

const FIRST_TAG_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_TAG_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_ARTICLE_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_ARTICLE_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_AUTHOR_ID = '658170cbb954e9f5b905ccf4';
const SECOND_AUTHOR_ID = '6581762309c030b503e30512';

function getTags() {
  return [
    { id: FIRST_TAG_UUID, title: 'Test Tag 1' },
    { id: SECOND_TAG_UUID, title: 'Test Tag 2' },
  ];
}

function getArticles() {
  return [
    {
      id: FIRST_ARTICLE_UUID,
      authorId: FIRST_AUTHOR_ID,
      data: 'Test data 1',
      type: 'video',
      isRepost: false,
      likes: [],
      tags: {
        connect: [{ id: FIRST_TAG_UUID }],
      },
    },
    {
      id: SECOND_ARTICLE_UUID,
      authorId: SECOND_AUTHOR_ID,
      data: 'Test data 2',
      type: 'text',
      isRepost: false,
      likes: [],
      tags: {
        connect: [{ id: FIRST_TAG_UUID }, { id: SECOND_TAG_UUID }],
      },
      comments: [
        {
          text: 'Test comment 1',
          authorId: FIRST_AUTHOR_ID,
        },
        {
          text: 'Test comment 2',
          authorId: FIRST_AUTHOR_ID,
        },
      ],
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTags = getTags();
  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        id: tag.id,
        title: tag.title,
      },
    });
  }

  const mockArticles = getArticles();
  for (const article of mockArticles) {
    await prismaClient.article.upsert({
      where: { id: article.id },
      update: {},
      create: {
        id: article.id,
        authorId: article.authorId,
        data: article.data,
        type: article.type,
        isRepost: article.isRepost,
        likes: article.likes,
        tags: article.tags,
        comments: article.comments
          ? {
              create: article.comments,
            }
          : undefined,
      },
    });
  }
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    console.info('Database seeding was a success!');
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
