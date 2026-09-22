import { createSlice } from '@reduxjs/toolkit';

const initialOrders = [
  {
    id: 'ord-1001',
    user: { name: 'Sophia Laurent', email: 'sophia@example.com' },
    totalAmount: 3349.0,
    status: 'PROCESSING',
    isPaid: true,
    createdAt: '2026-09-20T10:30:00Z',
    itemsCount: 2,
  },
  {
    id: 'ord-1002',
    user: { name: 'Elena Vance', email: 'elena@example.com' },
    totalAmount: 1499.0,
    status: 'SHIPPED',
    isPaid: true,
    createdAt: '2026-09-19T14:15:00Z',
    itemsCount: 1,
  },
  {
    id: 'ord-1003',
    user: { name: 'Marcus Chen', email: 'marcus@example.com' },
    totalAmount: 4799.0,
    status: 'DELIVERED',
    isPaid: true,
    createdAt: '2026-09-18T09:00:00Z',
    itemsCount: 3,
  },
];

const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    items: initialOrders,
  },
  reducers: {
    setAdminOrders: (state, action) => {
      state.items = action.payload;
    },
    updateOrderStatusInList: (state, action) => {
      const { id, status } = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order) {
        order.status = status;
      }
    },
  },
});

export const { setAdminOrders, updateOrderStatusInList } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
