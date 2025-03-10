import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getInvoice } from 'src/controllers/invoices.controller';
import { formatDate } from 'src/scripts/date.script';
import { formatStatus } from 'src/scripts/invoice.script';
import { formatPrice } from 'src/scripts/price.script';
import { RootState } from 'src/store/store';

function Invoice() {
  const { id } = useParams();

  const user = useSelector((state: RootState) => state.auth.user);

  const {
    data: invoice,
    isLoading,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ['invoice', id],
    queryFn: () => getInvoice(id as string)
  });

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-8">
      {isLoading && (
        <div className="flex items-center gap-1.5">
          <Loader2 className="size-4 animate-spin" />
          <span className="font-medium text-sm">Loading...</span>
        </div>
      )}

      {isError && (
        <div className="flex items-center gap-1.5 text-destructive">
          <AlertCircle className="size-4" />
          <span className="font-medium text-sm">
            An unexpected error occurred. Please try again later.
          </span>
        </div>
      )}

      {isSuccess && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">{invoice.description}</h1>
            <p className="text-muted-foreground">
              View the details of your invoice below.
            </p>
          </div>

          <div className="space-y-1">
            <span className="block text-sm">
              <span className="font-semibold">Vendor:</span>{' '}
              {invoice.vendor_name}
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
        </div>
      )}
    </div>
  );
}

export { Invoice };
