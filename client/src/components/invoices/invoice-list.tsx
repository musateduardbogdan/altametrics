import { useState } from 'react';
import { IInvoice } from 'src/interfaces/invoice.interface';
import { formatDate } from 'src/scripts/date.script';
import { formatStatus } from 'src/scripts/invoice.script';
import { formatPrice } from 'src/scripts/price.script';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'src/components/ui/table';
import { InvoiceModal } from './invoice-modal';

function InvoiceList({ invoices }: { invoices: Array<IInvoice> }) {
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  function handleInvoiceItemClick(invoice: IInvoice) {
    setSelectedInvoice(invoice);
    setIsInvoiceModalOpen(true);
  }

  function handleInvoiceModalOpenChange(value: boolean) {
    setIsInvoiceModalOpen(value);
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payee</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              className="cursor-pointer"
              key={invoice.id}
              onClick={() => handleInvoiceItemClick(invoice)}
            >
              <TableCell>{invoice.vendor_name}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell>{formatDate(invoice.due_date)}</TableCell>
              <TableCell>{formatPrice(invoice.amount)}</TableCell>
              <TableCell>{formatStatus(invoice.paid)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          open={isInvoiceModalOpen}
          onOpenChange={handleInvoiceModalOpenChange}
        />
      )}
    </div>
  );
}

export { InvoiceList };
