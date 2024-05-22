-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "type" "ArticleType" NOT NULL,
    "is_repost" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleData" (
    "id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "video_data_id" TEXT,
    "text_data_id" TEXT,
    "quote_data_id" TEXT,
    "photo_data_id" TEXT,
    "link_data_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_data" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "video" TEXT NOT NULL,

    CONSTRAINT "video_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_data" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "preview" TEXT NOT NULL,

    CONSTRAINT "text_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_data" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "quote_author" TEXT NOT NULL,

    CONSTRAINT "quote_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_data" (
    "id" TEXT NOT NULL,

    CONSTRAINT "photo_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_data" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "link_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleLikes" (
    "article_id" TEXT NOT NULL,
    "author_id" TEXT[],

    CONSTRAINT "ArticleLikes_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "articles_author_id_idx" ON "articles"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleData_article_id_key" ON "ArticleData"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleData_video_data_id_key" ON "ArticleData"("video_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleData_text_data_id_key" ON "ArticleData"("text_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleData_quote_data_id_key" ON "ArticleData"("quote_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleData_photo_data_id_key" ON "ArticleData"("photo_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleData_link_data_id_key" ON "ArticleData"("link_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleLikes_article_id_key" ON "ArticleLikes"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleLikes_author_id_key" ON "ArticleLikes"("author_id");

-- CreateIndex
CREATE INDEX "tags_title_idx" ON "tags"("title");

-- CreateIndex
CREATE INDEX "comments_article_id_idx" ON "comments"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToTag_AB_unique" ON "_ArticleToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToTag_B_index" ON "_ArticleToTag"("B");

-- AddForeignKey
ALTER TABLE "ArticleData" ADD CONSTRAINT "ArticleData_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleData" ADD CONSTRAINT "ArticleData_video_data_id_fkey" FOREIGN KEY ("video_data_id") REFERENCES "video_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleData" ADD CONSTRAINT "ArticleData_text_data_id_fkey" FOREIGN KEY ("text_data_id") REFERENCES "text_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleData" ADD CONSTRAINT "ArticleData_quote_data_id_fkey" FOREIGN KEY ("quote_data_id") REFERENCES "quote_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleData" ADD CONSTRAINT "ArticleData_photo_data_id_fkey" FOREIGN KEY ("photo_data_id") REFERENCES "photo_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleData" ADD CONSTRAINT "ArticleData_link_data_id_fkey" FOREIGN KEY ("link_data_id") REFERENCES "link_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleLikes" ADD CONSTRAINT "ArticleLikes_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
