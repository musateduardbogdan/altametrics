import { IInvoice } from 'src/interfaces/invoice.interface';
import { formatDate } from 'src/scripts/date.script';
import { formatStatus } from 'src/scripts/invoice.script';
import { formatPrice } from 'src/scripts/price.script';
import { buttonVariants } from 'src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from 'src/components/ui/dialog';
import { Link } from 'react-router-dom';

function InvoiceModal({
  invoice,
  open,
  onOpenChange
}: {
  invoice: IInvoice;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  function handleOpenChange(value: boolean) {
    onOpenChange(value);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{invoice.description}</DialogTitle>
          <DialogDescription>
            View the details of your invoice below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          <span className="block text-sm">
            <span className="font-semibold">Vendor:</span> {invoice.vendor_name}
          </span>
          <span className="block text-sm">
            <span className="font-semibold">Due Date:</span>{' '}
            {formatDate(invoice.due_date)}
          </span>
          <span className="block text-sm">
            <span className="font-semibold">Amount:</span>{' '}
            {formatPrice(invoice.amount)}
          </span>
          <span className="block text-sm">
            <span className="font-semibold">Status:</span>{' '}
            {formatStatus(invoice.paid)}
          </span>
        </div>

        <DialogFooter>
          <Link
            className={buttonVariants({ variant: 'default' })}
            to={`/invoices/${invoice.id}`}
          >
            Go to detailed page
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { InvoiceModal };
