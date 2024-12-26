import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreditCard, Download, FileText, Trash2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for payment methods
const mockPaymentMethods = [
  {
    id: 'pm_1',
    last4: '4242',
    brand: 'Visa',
    expMonth: 12,
    expYear: 2024,
    isDefault: true,
  },
  {
    id: 'pm_2',
    last4: '5555',
    brand: 'Mastercard',
    expMonth: 8,
    expYear: 2025,
    isDefault: false,
  }
];

export const BillingSection = () => {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  // Mock data for invoices
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
        <p className="text-muted-foreground mb-6">
          Manage your payment methods and billing information.
        </p>

        <div className="grid gap-4">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-muted p-3">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {method.brand} •••• {method.last4}
                      {method.isDefault && (
                        <Badge variant="secondary" className="ml-2">
                          Default
                        </Badge>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Set Default
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Payment Method</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this payment method? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(method.id)}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="mt-4" onClick={() => setIsLoading(true)}>
          <CreditCard className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Invoice History
        </h3>
        
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Download</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b last:border-0">
                    <td className="p-4">{invoice.date}</td>
                    <td className="p-4">{invoice.amount}</td>
                    <td className="p-4">
                      <Badge variant="secondary">{invoice.status}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={invoice.downloadUrl}>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};