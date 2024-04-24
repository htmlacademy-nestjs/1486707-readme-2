import { sharedConfigFileVault } from './shared-config-file-vault';

describe('sharedConfigFileVault', () => {
  it('should work', () => {
    expect(sharedConfigFileVault()).toEqual('shared-config-file-vault');
  });
});
