import { afterEach, describe, expect, it, vi } from 'vitest';

const modulePath = '../../../packages/shared-scripts/src/prepare-aioncore';

describe('prepare-aioncore release repository', () => {
  const originalOwner = process.env.AIONCORE_GITHUB_OWNER;
  const originalRepo = process.env.AIONCORE_GITHUB_REPO;

  afterEach(() => {
    if (originalOwner === undefined) {
      delete process.env.AIONCORE_GITHUB_OWNER;
    } else {
      process.env.AIONCORE_GITHUB_OWNER = originalOwner;
    }
    if (originalRepo === undefined) {
      delete process.env.AIONCORE_GITHUB_REPO;
    } else {
      process.env.AIONCORE_GITHUB_REPO = originalRepo;
    }
    vi.resetModules();
  });

  it('defaults to the official AionCore release repository', async () => {
    delete process.env.AIONCORE_GITHUB_OWNER;
    delete process.env.AIONCORE_GITHUB_REPO;

    const { getAioncoreReleaseRepo, getDownloadUrl } = await import(modulePath);

    expect(getAioncoreReleaseRepo()).toEqual({ owner: 'iOfficeAI', repo: 'AionCore' });
    expect(getDownloadUrl('aioncore-v0.1.23-x86_64-pc-windows-msvc.zip', 'v0.1.23')).toBe(
      'https://github.com/iOfficeAI/AionCore/releases/download/v0.1.23/aioncore-v0.1.23-x86_64-pc-windows-msvc.zip'
    );
  });

  it('supports Flyfox fork release downloads via environment variables', async () => {
    process.env.AIONCORE_GITHUB_OWNER = '6chaonetwork';
    process.env.AIONCORE_GITHUB_REPO = 'AionCore';

    const { getAioncoreReleaseRepo, getDownloadUrl } = await import(modulePath);

    expect(getAioncoreReleaseRepo()).toEqual({ owner: '6chaonetwork', repo: 'AionCore' });
    expect(getDownloadUrl('aioncore-v0.1.23-flyfox.1-x86_64-pc-windows-msvc.zip', 'v0.1.23-flyfox.1')).toBe(
      'https://github.com/6chaonetwork/AionCore/releases/download/v0.1.23-flyfox.1/aioncore-v0.1.23-flyfox.1-x86_64-pc-windows-msvc.zip'
    );
  });
});
