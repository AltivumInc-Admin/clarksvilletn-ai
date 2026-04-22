import type { Profile, ProfileSubmission } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE) {
    throw new ApiError(0, 'VITE_API_BASE_URL is not configured');
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // no json body
    }
    throw new ApiError(res.status, message);
  }
  return res.json() as Promise<T>;
}

export async function listProfiles(): Promise<{ profiles: Profile[] }> {
  return request<{ profiles: Profile[] }>('/profiles');
}

export async function submitProfile(
  payload: ProfileSubmission,
): Promise<{ profileId: string; status: 'pending' }> {
  return request('/profiles', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
