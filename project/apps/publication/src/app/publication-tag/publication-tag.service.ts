import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { PublicationTagEntity } from './publication-tag.entity';
import { PublicationTagRepository } from './publication-tag.repository';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class PublicationTagService {
  constructor(
    private readonly publicationTagRepository: PublicationTagRepository
  ) {}

  public async getTag(id: string): Promise<PublicationTagEntity> {
    return this.publicationTagRepository.findById(id);
  }

  public async createTag(dto: CreateTagDto): Promise<PublicationTagEntity> {
    const existsTag = await this.publicationTagRepository.findByTitle(
      dto.title
    );
    if (existsTag) {
      throw new ConflictException('The tag already exxists');
    }

    const newTag = new PublicationTagEntity(dto);
    await this.publicationTagRepository.save(newTag);

    return newTag;
  }

  public async updateTag(id: string, dto: UpdateTagDto): Promise<PublicationTagEntity> {
    const publicationTagEntity = new PublicationTagEntity(dto);

    try {
        const updatedTag = await this.publicationTagRepository.update(id, publicationTagEntity)
        return updatedTag;
    } catch {
        throw new NotFoundException(`Tag with id ${id} not found`);
    }
  }

  public async deleteTag(id: string): Promise<void> {
    try {
        await this.publicationTagRepository.deleteById(id);
    } catch {
        throw new Error('Something went wrong')
    }
  }

  public async getTagsByIds(tagIds: string[]): Promise<PublicationTagEntity[]> {
    const tags = await this.publicationTagRepository.findByIds(tagIds);

    if (tags.length !== tagIds.length) {
      const foundTags = tags.map((tag) => tag.id);
      const notFoundTags = tagIds.filter((tagId) => !foundTags.includes(tagId))

      if (notFoundTags.length) {
        throw new NotFoundException(`Tags with ids ${notFoundTags.join(', ')} not found`);
      }
    }

    return tags;
  }
}
