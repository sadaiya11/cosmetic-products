import React from 'react';
import { Users, Mail, Calendar } from 'lucide-react';

export default function CustomersManager() {
  const customers = [
    { id: 'c-1', name: 'Sophia Laurent', email: 'sophia@example.com', ordersCount: 4, spent: '$340.00', joined: '2026-08-12' },
    { id: 'c-2', name: 'Elena Vance', email: 'elena@example.com', ordersCount: 2, spent: '$150.00', joined: '2026-08-25' },
    { id: 'c-3', name: 'Marcus Chen', email: 'marcus@example.com', ordersCount: 5, spent: '$520.00', joined: '2026-09-01' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">
          Registered Customers
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customer directory and purchase history metrics
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 uppercase font-semibold text-slate-400">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/30">
                  <td className="p-4 font-medium text-white flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                      {c.name.charAt(0)}
                    </div>
                    <span>{c.name}</span>
                  </td>
                  <td className="p-4 text-slate-400">{c.email}</td>
                  <td className="p-4 font-bold text-slate-200">{c.ordersCount} orders</td>
                  <td className="p-4 font-bold text-emerald-400">{c.spent}</td>
                  <td className="p-4 text-slate-400">{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
