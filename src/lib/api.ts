import type { Credential, Degree, Profile, ProfileSubmission } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function getBearerToken(): Promise<string | null> {
  try {
    const { fetchAuthSession } = await import('aws-amplify/auth');
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    return token ?? null;
  } catch {
    return null;
  }
}

async function request<T>(
  path: string,
  init?: RequestInit & { auth?: boolean },
): Promise<T> {
  if (!API_BASE) {
    throw new ApiError(0, 'VITE_API_BASE_URL is not configured');
  }
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    ...((init?.headers as Record<string, string> | undefined) ?? {}),
  };
  if (init?.auth) {
    const token = await getBearerToken();
    if (!token) {
      throw new ApiError(401, 'You must be signed in to do that.');
    }
    headers.authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
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

export interface OwnerProfile extends Profile {
  status: 'pending' | 'approved' | 'rejected';
  email?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  rejectedAt?: string;
}

export interface MyProfilePayload {
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  headline?: string;
  bio?: string;
  linkedinUrl?: string;
  headshotBase64?: string;
  credentials: Credential[];
  degrees: Degree[];
}

export async function getMyProfile(): Promise<{ profile: OwnerProfile } | null> {
  try {
    return await request<{ profile: OwnerProfile }>('/me/profile', { auth: true });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function putMyProfile(
  payload: MyProfilePayload,
): Promise<{ profile: OwnerProfile; status: 'pending' }> {
  return request('/me/profile', {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(payload),
  });
}
