import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Download, FileText } from "lucide-react";

export const BillingSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for invoices - replace with actual data from your backend
  const invoices = [
    {
      id: 1,
      date: "2024-03-01",
      amount: "$29.99",
      status: "Paid",
      downloadUrl: "#",
    },
    {
      id: 2,
      date: "2024-02-01",
      amount: "$29.99",
      status: "Paid",
      downloadUrl: "#",
    },
  ];

  const handleUpdatePayment = () => {
    setIsLoading(true);
    // Implement Stripe or your preferred payment gateway integration here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
        <p className="text-muted-foreground">
          Manage your payment methods and view past invoices.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Payment Method</h3>
        <Button
          onClick={handleUpdatePayment}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <CreditCard className="h-4 w-4" />
          {isLoading ? "Updating..." : "Update Payment Method"}
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Invoice History
        </h3>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={invoice.downloadUrl}>
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};