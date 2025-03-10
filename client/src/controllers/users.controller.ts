import { IUser } from 'src/interfaces/user.interface';

const baseUrl = import.meta.env.VITE_API_URL;

export async function getUser(): Promise<IUser> {
  const url = `${baseUrl}/users/profile`;
  const method = 'GET';
  const headers = { 'Content-Type': 'application/json' };
  const credentials = 'include';

  const response = await fetch(url, { method, headers, credentials });
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}
