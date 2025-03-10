import { IInvoice } from 'src/interfaces/invoice.interface';

const baseUrl = import.meta.env.VITE_API_URL;

export async function getInvoices(): Promise<Array<IInvoice>> {
  const url = `${baseUrl}/invoices`;
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

export async function getInvoice(id: string): Promise<IInvoice> {
  const url = `${baseUrl}/invoices/${id}`;
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
