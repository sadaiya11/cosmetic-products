import asyncHandler from 'express-async-handler';
import prisma from '../config/prisma.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items provided');
  }

  const order = await prisma.order.create({
    data: {
      userId: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'CARD',
      totalAmount: parseFloat(totalAmount),
      status: 'PENDING',
      isPaid: false,
    },
  });

  // Clear user cart upon order creation
  const cart = await prisma.cart.findUnique({ where: { userId: req.user.id } });
  if (cart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: { items: [] },
    });
  }

  res.status(201).json(order);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });

  if (order) {
    if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to view this order');
    }
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
  });
  res.json(orders);
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(orders);
});

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, isPaid } = req.body;

  const order = await prisma.order.findUnique({ where: { id } });

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: {
      status: status || order.status,
      isPaid: isPaid !== undefined ? isPaid : order.isPaid,
      paidAt: isPaid ? new Date() : order.paidAt,
    },
  });

  res.json(updatedOrder);
});
