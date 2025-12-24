import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

export const FundingPage = () => {
  const role = "entrepreneur"; // change to "investor" to test

  const [balance, setBalance] = useState(12500);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Funding",
      amount: 5000,
      sender: "Investor John",
      receiver: "TechWave AI",
      status: "Pending",
      date: "2024-03-12",
    },
  ]);

  const sendFunding = () => {
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "Funding",
        amount: 3000,
        sender: "Investor John",
        receiver: "TechWave AI",
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Wallet */}
      <Card>
        <CardBody className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Wallet Balance</p>
            <h2 className="text-3xl font-bold">${balance}</h2>
          </div>

          {role === "investor" && (
            <Button leftIcon={<Send size={18} />} onClick={sendFunding}>
              Send Funding
            </Button>
          )}
        </CardBody>
      </Card>

      {/* Deals / Transactions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">
            {role === "investor" ? "My Deals" : "Funding Requests"}
          </h2>
        </CardHeader>

        <CardBody>
          <table className="w-full text-sm">
            <thead className="border-b text-left">
              <tr>
                <th>Amount</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b last:border-0">
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
                  <td>
                    {role === "entrepreneur" && tx.status === "Pending" && (
                      <Button
                        size="sm"
                        leftIcon={<CheckCircle size={16} />}
                        onClick={() => approveFunding(tx.id, tx.amount)}
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
    </div>
  );
};
