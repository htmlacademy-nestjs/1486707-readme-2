import { Injectable } from '@nestjs/common';
import { ArticleType } from '@prisma/client';
import {
  ArticleDataIds,
  ArticleDataIdNames,
  ArticleData,
  LinkArticleData,
  PhotoArticleData,
  QuoteArticleData,
  TextArticleData,
  VideoArticleData,
} from '@project/shared/app/types';
import { LinkDataEntity } from './link-data.entity';
import { LinkDataRepository } from './link-data.repository';
import { PhotoDataEntity } from './photo-data.entity';
import { PhotoDataRepository } from './photo-data.repository';
import { QuoteDataEntity } from './quote-data.entity';
import { QuoteDataRepository } from './quote-data.repository';
import { TextDataEntity } from './text-data.entity';
import { TextDataRepository } from './text-data.repository';
import { VideoDataEntity } from './video-data.entity';
import { VideoDataRepository } from './video-data.repository';
import { ArticleDataEntity, ArticleDataRepository } from '../article.types';

@Injectable()
export class ArticleMetaDataService {
  public articleDataRepository: ArticleDataRepository;
  public articleDataIdType: keyof ArticleDataIds;
  public articleDataInterface: (dto: ArticleData) => {
    entity: ArticleDataEntity;
    saveEntityInRepository: () => Promise<ArticleDataEntity>;
    updateEntityInRepository: (id: string) => Promise<ArticleDataEntity>;
  };

  constructor(
    private readonly linkDataRepository: LinkDataRepository,
    private readonly photoDataRepository: PhotoDataRepository,
    private readonly quoteDatarepository: QuoteDataRepository,
    private readonly textDataRepository: TextDataRepository,
    private readonly videoDataRepository: VideoDataRepository
  ) {}

  public setArticleDataMeta(type: ArticleType) {
    switch (type) {
      case ArticleType.link: {
        this.articleDataRepository = this.linkDataRepository;
        this.articleDataIdType = ArticleDataIdNames.LINK_DATA_ID;

        this.articleDataInterface = (dto) => {
          const entity = new LinkDataEntity().populate(dto as LinkArticleData);
          const saveEntityInRepository = async () =>
            await (this.articleDataRepository as LinkDataRepository).save(
              entity as LinkDataEntity
            );

          const updateEntityInRepository = async (id: string) =>
            await (this.articleDataRepository as LinkDataRepository).update(
              id,
              entity as LinkDataEntity
            );

          return {
            entity,
            saveEntityInRepository,
            updateEntityInRepository,
          };
        };
        break;
      }
      case ArticleType.photo: {
        this.articleDataRepository = this.photoDataRepository;
        this.articleDataIdType = ArticleDataIdNames.PHOTO_DATA_ID;

        this.articleDataInterface = (dto) => {
          const entity = new PhotoDataEntity().populate(
            dto as PhotoArticleData
          );
          const saveEntityInRepository = async () =>
            await (this.articleDataRepository as PhotoDataRepository).save(
              entity as PhotoDataEntity
            );

          const updateEntityInRepository = async (id: string) =>
            await (this.articleDataRepository as PhotoDataRepository).update(
              id,
              entity as PhotoDataEntity
            );

          return {
            entity,
            saveEntityInRepository,
            updateEntityInRepository,
          };
        };
        break;
      }
      case ArticleType.quote: {
        this.articleDataRepository = this.quoteDatarepository;
        this.articleDataIdType = ArticleDataIdNames.QUOTE_DATA_ID;

        this.articleDataInterface = (dto) => {
          const entity = new QuoteDataEntity().populate(
            dto as QuoteArticleData
          );
          const saveEntityInRepository = async () =>
            await (this.articleDataRepository as QuoteDataRepository).save(
              entity as QuoteDataEntity
            );

          const updateEntityInRepository = async (id: string) =>
            await (this.articleDataRepository as QuoteDataRepository).update(
              id,
              entity as QuoteDataEntity
            );

          return {
            entity,
            saveEntityInRepository,
            updateEntityInRepository,
          };
        };
        break;
      }
      case ArticleType.text: {
        this.articleDataRepository = this.textDataRepository;
        this.articleDataIdType = ArticleDataIdNames.TEXT_DATA_ID;

        this.articleDataInterface = (dto) => {
          const entity = new TextDataEntity().populate(dto as TextArticleData);
          const saveEntityInRepository = async () =>
            await (this.articleDataRepository as TextDataRepository).save(
              entity as TextDataEntity
            );

          const updateEntityInRepository = async (id: string) =>
            await (this.articleDataRepository as TextDataRepository).update(
              id,
              entity as TextDataEntity
            );

          return {
            entity,
            saveEntityInRepository,
            updateEntityInRepository,
          };
        };
        break;
      }
      case ArticleType.video: {
        this.articleDataRepository = this.videoDataRepository;
        this.articleDataIdType = ArticleDataIdNames.VIDEO_DATA_ID;

        this.articleDataInterface = (dto) => {
          const entity = new VideoDataEntity().populate(
            dto as VideoArticleData
          );
          const saveEntityInRepository = async () =>
            await (this.articleDataRepository as VideoDataRepository).save(
              entity as VideoDataEntity
            );

          const updateEntityInRepository = async (id: string) =>
            await (this.articleDataRepository as VideoDataRepository).update(
              id,
              entity as VideoDataEntity
            );

          return {
            entity,
            saveEntityInRepository,
            updateEntityInRepository,
          };
        };
        break;
      }
    }
  }
}
