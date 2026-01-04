import { useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Send,
  CheckCircle,
} from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Avatar } from "../../components/ui/Avatar";
import {useAuth} from "../../context/AuthContext";

export const DealDetailsPage = () => {
  const { user } = useAuth();
  const role = user.role;
  const [balance, setBalance] = useState(12500);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Funding",
      amount: 5000,
      sender: "Investor John",
      receiver: "Startup TechWave AI",
      status: "Pending",
      date: "2024-03-12",
    },
  ]);

  /* ---------------- ACTIONS ---------------- */

  const handleDeposit = (amount) => {
    setBalance((b) => b + amount);
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "Deposit",
        amount,
        sender: "Bank",
        receiver: "Wallet",
        status: "Completed",
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  };

  const handleWithdraw = (amount) => {
    setBalance((b) => b - amount);
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "Withdraw",
        amount,
        sender: "Wallet",
        receiver: "Bank",
        status: "Completed",
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  };

  const sendFunding = (amount) => {
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "Funding",
        amount,
        sender: "Investor John",
        receiver: "Startup TechWave AI",
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  };

  const approveFunding = (id, amount) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status: "Completed" } : tx))
    );
    setBalance((b) => b + amount);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Deal Header */}
      <Card>
        <CardBody className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              alt="Startup"
            />
            <div>
              <h2 className="text-lg font-semibold">TechWave AI</h2>
              <p className="text-sm text-gray-500">Series A • FinTech</p>
            </div>
          </div>
          <Badge variant="primary">Active Deal</Badge>
        </CardBody>
      </Card>

      {/* Wallet */}
      <Card>
        <CardBody className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Wallet Balance</p>
            <h2 className="text-3xl font-bold">${balance.toLocaleString()}</h2>
          </div>

          {role === "investor" && (
            <div className="flex gap-2">
              <Button
                onClick={() => handleDeposit(1000)}
                leftIcon={<ArrowDownCircle size={18} />}
              >
                Deposit
              </Button>
              <Button
                variant="outline"
                onClick={() => handleWithdraw(500)}
                leftIcon={<ArrowUpCircle size={18} />}
              >
                Withdraw
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Funding Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Funding</h3>
        </CardHeader>
        <CardBody className="flex gap-3">
          {role === "investor" && (
            <Button
              variant="secondary"
              onClick={() => sendFunding(5000)}
              leftIcon={<Send size={18} />}
            >
              Send $5,000 Funding
            </Button>
          )}
        </CardBody>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Transaction History</h3>
        </CardHeader>
        <CardBody>
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="py-2 text-left">Type</th>
                <th>Amount</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b last:border-0">
                  <td className="py-3">{tx.type}</td>
                  <td>${tx.amount}</td>
                  <td>{tx.sender}</td>
                  <td>{tx.receiver}</td>
                  <td>
                    <Badge
                      variant={
                        tx.status === "Completed" ? "success" : "warning"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </td>
                  <td>{tx.date}</td>
                  <td>
                    {role === "entrepreneur" && tx.status === "Pending" && (
                      <Button
                        size="sm"
                        onClick={() => approveFunding(tx.id, tx.amount)}
                        leftIcon={<CheckCircle size={16} />}
                      >
                        Approve
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Documents</h3>
        </CardHeader>
        <CardBody className="space-y-2 text-sm">
          <p>📄 Pitch Deck.pdf</p>
          <p>📄 Business Plan.pdf</p>
          <p>📄 Financial Projections.xlsx</p>
        </CardBody>
      </Card>
    </div>
  );
};
