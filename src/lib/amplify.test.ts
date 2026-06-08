import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const configure = vi.fn();
vi.mock('aws-amplify', () => ({ Amplify: { configure } }));

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  configure.mockReset();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('amplify configuration', () => {
  it('configures Cognito when both env vars are present', async () => {
    vi.stubEnv('VITE_COGNITO_USER_POOL_ID', 'us-east-1_abc');
    vi.stubEnv('VITE_COGNITO_USER_POOL_CLIENT_ID', 'client-123');
    const mod = await import('./amplify');
    expect(mod.cognitoConfigured).toBe(true);
    expect(configure).toHaveBeenCalledTimes(1);
    const cfg = configure.mock.calls[0][0] as {
      Auth: { Cognito: { userPoolId: string; userPoolClientId: string } };
    };
    expect(cfg.Auth.Cognito.userPoolId).toBe('us-east-1_abc');
    expect(cfg.Auth.Cognito.userPoolClientId).toBe('client-123');
  });

  it('does not configure when the env vars are missing', async () => {
    vi.stubEnv('VITE_COGNITO_USER_POOL_ID', '');
    vi.stubEnv('VITE_COGNITO_USER_POOL_CLIENT_ID', '');
    const mod = await import('./amplify');
    expect(mod.cognitoConfigured).toBe(false);
    expect(configure).not.toHaveBeenCalled();
  });
});
