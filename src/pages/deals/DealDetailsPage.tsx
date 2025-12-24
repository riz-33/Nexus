import { useState } from "react";
import { FileText, Upload, Send } from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const initialDocuments = [
  {
    id: 1,
    name: "Term Sheet.pdf",
    status: "In Review",
  },
  {
    id: 2,
    name: "Shareholder Agreement.pdf",
    status: "Draft",
  },
];

export const DealDetailsPage = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [balance] = useState(50000);

  const sendFunding = (amount: number) => {
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "Funding",
        amount,
        sender: "Investor (You)",
        receiver: "Startup",
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  };

  const getStatusVariant = (status: string) => {
    if (status === "Signed") return "success";
    if (status === "In Review") return "warning";
    return "gray";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Deal Overview */}
      <Card>
        <CardBody className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              TechWave AI — Funding Deal
            </h1>
            <p className="text-sm text-gray-600">
              Stage: Series A · Equity: 15%
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">Wallet Balance</p>
            <p className="text-lg font-bold">${balance.toLocaleString()}</p>
          </div>
        </CardBody>
      </Card>

      {/* Documents Section */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Deal Documents</h2>
          <Button leftIcon={<Upload size={16} />}>Upload</Button>
        </CardHeader>

        <CardBody className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-primary-600" />
                <span className="text-sm font-medium">{doc.name}</span>
              </div>

              <Badge variant={getStatusVariant(doc.status)}>{doc.status}</Badge>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Funding Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Funding</h2>
        </CardHeader>

        <CardBody className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              Send funding to entrepreneur
            </p>
            <p className="text-xs text-gray-500">
              (Mock transaction — no real payment)
            </p>
          </div>

          <Button
            leftIcon={<Send size={16} />}
            onClick={() => sendFunding(5000)}
          >
            Send $5,000
          </Button>
        </CardBody>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Transaction History</h2>
        </CardHeader>

        <CardBody>
          {transactions.length === 0 ? (
            <p className="text-sm text-gray-500">No transactions yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500 border-b">
                <tr>
                  <th className="py-2">Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b last:border-0">
                    <td className="py-2">{tx.type}</td>
                    <td>${tx.amount}</td>
                    <td>
                      <Badge variant="warning">{tx.status}</Badge>
                    </td>
                    <td>{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
