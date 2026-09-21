import React from 'react';
import { useSelector } from 'react-redux';
import { DollarSign, Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { items: products } = useSelector((state) => state.adminProducts);
  const { items: orders } = useSelector((state) => state.adminOrders);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: '+14.2%',
      color: 'text-emerald-400',
    },
    {
      title: 'Active Orders',
      value: orders.length,
      icon: ShoppingBag,
      change: '+8%',
      color: 'text-amber-400',
    },
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      change: 'In Stock',
      color: 'text-cyan-400',
    },
    {
      title: 'Customers',
      value: 124,
      icon: Users,
      change: '+22 new',
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">
          Admin Dashboard
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time metrics and sales performance overview
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2.5 rounded-xl bg-slate-800 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{stat.change}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-serif text-lg font-semibold text-white">
          Recent Customer Orders
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/50 uppercase font-semibold text-slate-400">
              <tr>
                <th className="p-3.5 rounded-l-xl">Order ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Total</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-amber-400">{ord.id}</td>
                  <td className="p-3.5">
                    <div className="font-medium text-slate-200">{ord.user.name}</div>
                    <div className="text-[10px] text-slate-500">{ord.user.email}</div>
                  </td>
                  <td className="p-3.5 font-bold text-white">
                    ${ord.totalAmount.toFixed(2)}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">
                    {new Date(ord.createdAt).toLocaleDateString()}
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
