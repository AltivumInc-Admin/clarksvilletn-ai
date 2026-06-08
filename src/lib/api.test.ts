import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// The dynamic import('aws-amplify/auth') inside getBearerToken resolves to this mock.
const fetchAuthSession = vi.fn();
vi.mock('aws-amplify/auth', () => ({ fetchAuthSession }));

function jsonResponse(body: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
  } as Response;
}

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  fetchAuthSession.mockReset();
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

async function loadApi(baseUrl = 'https://api.test') {
  if (baseUrl) vi.stubEnv('VITE_API_BASE_URL', baseUrl);
  return import('./api');
}

describe('api client', () => {
  it('throws ApiError(0) when VITE_API_BASE_URL is not configured', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');
    const api = await import('./api');
    await expect(api.listProfiles()).rejects.toMatchObject({ status: 0 });
  });

  it('listProfiles returns parsed JSON on success', async () => {
    const api = await loadApi();
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      jsonResponse({ profiles: [{ profileId: 'p1', name: 'Jane' }] }),
    );
    const result = await api.listProfiles();
    expect(result.profiles[0].name).toBe('Jane');
    expect(fetch).toHaveBeenCalledWith('https://api.test/profiles', expect.any(Object));
  });

  it('throws ApiError with status and server message on a non-2xx response', async () => {
    const api = await loadApi();
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      jsonResponse({ message: 'Nope' }, false, 422),
    );
    await expect(api.listProfiles()).rejects.toMatchObject({ status: 422, message: 'Nope' });
  });

  it('falls back to a generic message when the error body is not JSON', async () => {
    const api = await loadApi();
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error('no body');
      },
    } as unknown as Response);
    await expect(api.listProfiles()).rejects.toMatchObject({ status: 500, message: /500/ });
  });

  it('getMyProfile returns null on 404', async () => {
    const api = await loadApi();
    fetchAuthSession.mockResolvedValue({ tokens: { idToken: { toString: () => 'tok' } } });
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(jsonResponse({ message: 'nf' }, false, 404));
    await expect(api.getMyProfile()).resolves.toBeNull();
  });

  it('getMyProfile rethrows non-404 errors', async () => {
    const api = await loadApi();
    fetchAuthSession.mockResolvedValue({ tokens: { idToken: { toString: () => 'tok' } } });
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(jsonResponse({ message: 'boom' }, false, 500));
    await expect(api.getMyProfile()).rejects.toMatchObject({ status: 500 });
  });

  it('attaches a Bearer token on authenticated requests', async () => {
    const api = await loadApi();
    fetchAuthSession.mockResolvedValue({ tokens: { idToken: { toString: () => 'jwt-123' } } });
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(jsonResponse({ profile: {} }));
    await api.getMyProfile();
    const headers = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].headers;
    expect(headers.authorization).toBe('Bearer jwt-123');
  });

  it('throws ApiError(401) on an authenticated request when no token is available', async () => {
    const api = await loadApi();
    fetchAuthSession.mockResolvedValue({ tokens: undefined });
    await expect(api.getMyProfile()).rejects.toMatchObject({ status: 401 });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('putMyProfile sends a PUT with the JSON body', async () => {
    const api = await loadApi();
    fetchAuthSession.mockResolvedValue({ tokens: { idToken: { toString: () => 'tok' } } });
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(jsonResponse({ profile: {}, status: 'pending' }));
    await api.putMyProfile({ name: 'Jane', credentials: [], degrees: [] });
    const [, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(init.method).toBe('PUT');
    expect(JSON.parse(init.body).name).toBe('Jane');
  });
});
