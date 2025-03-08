const baseUrl = import.meta.env.VITE_API_URL;

export async function signIn(email: string, password: string) {
  const url = `${baseUrl}/auth/sign-in`;
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({ email, password });

  const response = await fetch(url, { method, headers, body });
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }
}
