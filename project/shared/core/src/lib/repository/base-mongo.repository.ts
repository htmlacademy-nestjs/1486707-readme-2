import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { Entity, EntityIdType } from './entity.interface';
import { Repository } from './repository.interface';

export abstract class BaseMongoRepository<
  EntitiyType extends Entity<EntityIdType>,
  DocumentType extends Document
> implements Repository<EntitiyType>
{
  constructor(
    protected readonly model: Model<DocumentType>,
    private readonly createEntity: (document: DocumentType) => EntitiyType
  ) {}

  protected createEntitiyFromDocument(
    document: DocumentType
  ): EntitiyType | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document.toObject({ versionKey: false }));
  }

  public async findById(id: EntitiyType['id']): Promise<EntitiyType | null> {
    const document = await this.model.findById(id).exec();
    return this.createEntitiyFromDocument(document);
  }

  public async save(entity: EntitiyType): Promise<EntitiyType> {
    const newEntity = new this.model(entity.toPOJO());
    await newEntity.save();

    entity.id = newEntity._id.toString();
    return entity;
  }

  public async update(
    id: EntitiyType['id'],
    entity: EntitiyType
  ): Promise<EntitiyType> {
    const updateDocument = await this.model
      .findByIdAndUpdate(id, entity.toPOJO(), {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updateDocument) {
      throw new NotFoundException(`Entity withe id ${id} not found`);
    }

    return entity;
  }

  public async deleteById(id: EntitiyType['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();
    if (!deletedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}
