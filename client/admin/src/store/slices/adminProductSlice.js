import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  {
    id: 'prod-1',
    title: 'Rosehip Botanical Youth Elixir',
    price: 68.0,
    stock: 25,
    category: { name: 'Skincare' },
    isFeatured: true,
  },
  {
    id: 'prod-2',
    title: 'Cellular Hydration Nectar Serum',
    price: 82.0,
    stock: 18,
    category: { name: 'Skincare' },
    isFeatured: true,
  },
  {
    id: 'prod-3',
    title: 'Velvet Camellia Cream Cleanser',
    price: 45.0,
    stock: 30,
    category: { name: 'Cleanser' },
    isFeatured: false,
  },
];

const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    items: initialProducts,
    loading: false,
  },
  reducers: {
    setAdminProducts: (state, action) => {
      state.items = action.payload;
    },
    addProduct: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateProductInList: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProductFromList: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  setAdminProducts,
  addProduct,
  updateProductInList,
  deleteProductFromList,
} = adminProductSlice.actions;

export default adminProductSlice.reducer;
