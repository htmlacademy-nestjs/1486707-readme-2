import { FileVaultItem } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class FileVaultEntity implements FileVaultItem, Entity<string> {
  public id?: string;
  public data: string;

  constructor(fileVaultItem: FileVaultItem) {
    this.populate(fileVaultItem);
  }

  public populate(data: FileVaultItem) {
    this.data = data.data;
  }

  public toPOJO() {
    return {
      id: this.id,
      data: this.data,
    };
  }
}
