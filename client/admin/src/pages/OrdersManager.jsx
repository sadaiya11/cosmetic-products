import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStatusInList } from '../store/slices/adminOrderSlice';

export default function OrdersManager() {
  const dispatch = useDispatch();
  const { items: orders } = useSelector((state) => state.adminOrders);

  const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">
          Order Status Tracker
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor and update customer order fulfillment statuses
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 uppercase font-semibold text-slate-400">
              <tr>
                <th className="p-4">Order Reference</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Current Status</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-amber-400">{o.id}</td>
                  <td className="p-4">
                    <div className="font-medium text-white">{o.user.name}</div>
                    <div className="text-[10px] text-slate-500">{o.user.email}</div>
                  </td>
                  <td className="p-4 font-bold text-white">₹{o.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {o.isPaid ? (
                      <span className="text-emerald-400 font-bold">Paid</span>
                    ) : (
                      <span className="text-rose-400 font-bold">Unpaid</span>
                    )}
                  </td>
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) =>
                        dispatch(
                          updateOrderStatusInList({
                            id: o.id,
                            status: e.target.value,
                          })
                        )
                      }
                      className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500"
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
