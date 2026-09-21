import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import Dashboard from './pages/Dashboard';
import ProductsManager from './pages/ProductsManager';
import OrdersManager from './pages/OrdersManager';
import CustomersManager from './pages/CustomersManager';
import Login from './pages/Login';

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.adminAuth);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-950 text-slate-100">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductsManager />} />
              <Route path="/orders" element={<OrdersManager />} />
              <Route path="/customers" element={<CustomersManager />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
