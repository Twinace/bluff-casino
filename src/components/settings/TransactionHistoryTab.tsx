"use client";

import { Header } from "./shared";

export default function TransactionHistoryTab() {
  const rows = [
    {
      date: "11/02/25",
      type: "Deposit",
      amount: 5000,
      receive: 5000,
      status: "Success",
    },
    {
      date: "11/02/25",
      type: "Withdrawal",
      amount: -5000,
      receive: null,
      status: "Failed",
    },
    {
      date: "11/02/25",
      type: "Deposit",
      amount: 5000,
      receive: 5000,
      status: "Success",
    },
    {
      date: "11/02/25",
      type: "Withdrawal",
      amount: -5000,
      receive: null,
      status: "Failed",
    },
  ];

  return (
    <section className="space-y-6">
      <Header
        title="Transaction History"
        subtitle="View and edit your user information"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-gray-500 text-left">
            <tr>
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Amount</th>
              <th className="py-2 pr-4">Receive</th>
              <th className="py-2 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="border-b border-[#1F1F26] last:border-0">
                <td className="py-3 pr-4">{r.date}</td>
                <td className="py-3 pr-4">{r.type}</td>
                <td
                  className={`py-3 pr-4 font-medium ${
                    r.amount > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {r.amount > 0 ? "+$" : "-$"}
                  {Math.abs(r.amount).toLocaleString()}
                </td>
                <td className="py-3 pr-4">
                  {r.receive != null ? r.receive.toLocaleString() : "-"}
                </td>
                <td
                  className={`py-3 pr-4 ${
                    r.status === "Success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
