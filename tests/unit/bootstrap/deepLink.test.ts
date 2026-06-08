import { describe, expect, it } from 'vitest';
import { isSupportedDeepLinkUrl, parseDeepLinkUrl } from '../../../packages/desktop/src/process/utils/deepLink';

describe('deep link parsing', () => {
  it('parses Flyfox provider links', () => {
    const result = parseDeepLinkUrl('flyfox://provider/add?base_url=https%3A%2F%2Fapi.example.test&api_key=key');

    expect(result).toEqual({
      action: 'provider/add',
      params: {
        base_url: 'https://api.example.test',
        api_key: 'key',
      },
    });
  });

  it('keeps legacy AionUi links compatible', () => {
    const result = parseDeepLinkUrl('aionui://add-provider?name=Legacy&platform=openai');

    expect(result).toEqual({
      action: 'add-provider',
      params: {
        name: 'Legacy',
        platform: 'openai',
      },
    });
  });

  it('rejects unsupported protocols', () => {
    expect(parseDeepLinkUrl('https://provider/add?api_key=key')).toBeNull();
  });
});

describe('deep link argument detection', () => {
  it('accepts current and legacy protocol urls', () => {
    expect(isSupportedDeepLinkUrl('flyfox://navigate?route=/conversation/abc')).toBe(true);
    expect(isSupportedDeepLinkUrl('aionui://navigate?route=/conversation/abc')).toBe(true);
  });

  it('rejects unrelated arguments', () => {
    expect(isSupportedDeepLinkUrl('--flag=flyfox://provider/add')).toBe(false);
    expect(isSupportedDeepLinkUrl('https://example.test')).toBe(false);
  });
});
