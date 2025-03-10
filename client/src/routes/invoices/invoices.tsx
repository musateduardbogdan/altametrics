import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getInvoices } from 'src/controllers/invoices.controller';
import { RootState } from 'src/store/store';
import { InvoiceList } from 'src/components/invoices/invoice-list';

function Invoices() {
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    data: invoices,
    isLoading,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ['invoices'],
    queryFn: getInvoices
  });

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Invoices</h1>
        <p className="text-muted-foreground">
          View and manage your invoices below.
        </p>
      </div>

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

      {isSuccess && <InvoiceList invoices={invoices} />}
    </div>
  );
}

export { Invoices };
