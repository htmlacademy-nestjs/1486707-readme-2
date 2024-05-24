import { ArticleType, PrismaClient } from '@prisma/client';

const FIRST_TAG_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_TAG_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_ARTICLE_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_ARTICLE_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_AUTHOR_ID = '658170cbb954e9f5b905ccf4';
const SECOND_AUTHOR_ID = '6581762309c030b503e30512';

const FIRST_ARTICLE_DATA_UUID = '7deee188-e72e-4255-919b-4464d91b046f';
const SECOND_ARTICLE_DATA_UUID = 'ab24fb0f-10c5-4daf-8817-13288c9381a0';

const VIDEO_DATA_UUID = '6b2a5c95-9502-423a-b43e-e98d78c99416';
const LINK_DATA_UUID = 'f97e90af-6fe6-4364-a86b-f5cc2d23eacd';

function getTags() {
  return [
    { id: FIRST_TAG_UUID, title: 'Test Tag 1' },
    { id: SECOND_TAG_UUID, title: 'Test Tag 2' },
  ];
}

function getVideoData() {
  return [
    {
      id: VIDEO_DATA_UUID,
      title: 'Test video title',
      link: 'Test video link',
      video: 'Test video content',
      description: 'test video description',
    },
  ];
}

function getLinkData() {
  return [{ id: LINK_DATA_UUID, link: 'Test link' }];
}

function getArticles() {
  return [
    {
      id: FIRST_ARTICLE_UUID,
      authorId: FIRST_AUTHOR_ID,
      articleData: {
        id: FIRST_ARTICLE_DATA_UUID,
        videoDataId: VIDEO_DATA_UUID,
      },
      type: 'video' as ArticleType,
      isRepost: false,
      likes: { authorId: [FIRST_AUTHOR_ID] },
      tags: {
        connect: [{ id: FIRST_TAG_UUID }],
      },
    },
    {
      id: SECOND_ARTICLE_UUID,
      authorId: SECOND_AUTHOR_ID,
      articleData: {
        id: SECOND_ARTICLE_DATA_UUID,
        linkDataId: LINK_DATA_UUID,
      },
      type: 'link' as ArticleType,
      isRepost: false,
      likes: {
        authorId: [FIRST_AUTHOR_ID, SECOND_AUTHOR_ID],
      },
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
          authorId: SECOND_AUTHOR_ID,
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

  const mockVideoData = getVideoData();
  for (const videoData of mockVideoData) {
    await prismaClient.videoData.upsert({
      where: { id: videoData.id },
      update: {},
      create: {
        id: videoData.id,
        title: videoData.title,
        link: videoData.link,
        video: videoData.video,
      },
    });
  }

  const mockLinkData = getLinkData();
  for (const linkData of mockLinkData) {
    await prismaClient.linkData.upsert({
      where: { id: linkData.id },
      update: {},
      create: {
        id: linkData.id,
        link: linkData.link,
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
        articleDataIds: { create: article.articleData },
        type: article.type,
        isRepost: article.isRepost,
        likes: { create: article.likes },
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
