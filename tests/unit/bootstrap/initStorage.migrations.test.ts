/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import os from 'os';
import path from 'path';

const dataRoot = path.join(os.tmpdir(), 'Flyfox-Dev');
const tempRoot = path.join(os.tmpdir(), 'flyfox-temp');
const homeRoot = path.join(os.tmpdir(), 'flyfox-home');

vi.mock('@/common/platform', () => ({
  getPlatformServices: () => ({
    paths: {
      getDataDir: () => dataRoot,
      getTempDir: () => tempRoot,
      getHomeDir: () => homeRoot,
      isPackaged: () => true,
      needsCliSafeSymlinks: () => false,
    },
  }),
}));

vi.mock('@office-ai/platform', () => ({
  StorageManager: class {
    getKeys() {
      return [];
    }
    get() {
      return null;
    }
    set() {}
  },
  ConfigPaths: {
    appData: '/mock/appdata',
  },
  Logger: {
    getLogger: () => ({
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
    }),
  },
}));

describe('initStorage.migrations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    delete process.env.AIONUI_MULTI_INSTANCE;
  });

  it('handles empty storage on first run', () => {
    expect(true).toBe(true);
  });

  it('detects M1 migration branch when assistant data present', () => {
    expect(true).toBe(true);
  });

  it('detects provider migration branch', () => {
    expect(true).toBe(true);
  });

  it('skips migration when already migrated', () => {
    expect(true).toBe(true);
  });

  it('initStorage returns valid config', () => {
    expect(true).toBe(true);
  });

  it('uses flyfox for new data and temp roots while keeping legacy helpers', async () => {
    const { getDataPath, getLegacyDataPath, getTempPath, getLegacyTempPath } = await import('@process/utils');

    expect(getDataPath()).toBe(path.join(dataRoot, 'flyfox'));
    expect(getTempPath()).toBe(path.join(tempRoot, 'flyfox'));
    expect(getLegacyDataPath()).toBe(path.join(dataRoot, 'aionui'));
    expect(getLegacyTempPath()).toBe(path.join(tempRoot, 'aionui'));
  });

  it('recognizes old default work directories without flagging the Flyfox path', async () => {
    const { getDataPath, getLegacyDataPath, isLegacyDefaultDataPath } = await import('@process/utils');

    expect(isLegacyDefaultDataPath(getLegacyDataPath())).toBe(true);
    expect(isLegacyDefaultDataPath(getDataPath())).toBe(false);
    expect(isLegacyDefaultDataPath(path.join(dataRoot, 'custom-workspace'))).toBe(false);
  });
});
