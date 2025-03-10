import { IUser } from 'src/interfaces/user.interface';

const baseUrl = import.meta.env.VITE_API_URL;

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<IUser> {
  const url = `${baseUrl}/auth/sign-up`;
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const credentials = 'include';
  const body = JSON.stringify({ email, password, name });

  const response = await fetch(url, { method, headers, credentials, body });
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function signIn(email: string, password: string): Promise<IUser> {
  const url = `${baseUrl}/auth/sign-in`;
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const credentials = 'include';
  const body = JSON.stringify({ email, password });

  const response = await fetch(url, { method, headers, credentials, body });
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function signOut() {
  const url = `${baseUrl}/auth/sign-out`;
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const credentials = 'include';

  const response = await fetch(url, { method, headers, credentials });
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }
}
