export interface IInvoice {
  id: string;
  description: string;
  amount: number;
  paid: boolean;
  due_date: string;
  vendor_name: string;
}
