import asyncHandler from 'express-async-handler';
import prisma from '../config/prisma.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  let cart = await prisma.cart.findUnique({
    where: { userId: req.user.id },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: req.user.id,
        items: [],
      },
    });
  }

  res.json(cart);
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let cart = await prisma.cart.findUnique({
    where: { userId: req.user.id },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: req.user.id,
        items: [],
      },
    });
  }

  const existingItems = cart.items || [];
  const itemIndex = existingItems.findIndex((item) => item.productId === productId);

  let updatedItems = [...existingItems];

  if (itemIndex > -1) {
    updatedItems[itemIndex].quantity += quantity || 1;
  } else {
    updatedItems.push({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] || '',
      quantity: quantity || 1,
    });
  }

  const updatedCart = await prisma.cart.update({
    where: { id: cart.id },
    data: { items: updatedItems },
  });

  res.json(updatedCart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await prisma.cart.findUnique({
    where: { userId: req.user.id },
  });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const updatedItems = (cart.items || []).filter((item) => item.productId !== productId);

  const updatedCart = await prisma.cart.update({
    where: { id: cart.id },
    data: { items: updatedItems },
  });

  res.json(updatedCart);
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: req.user.id },
  });

  if (cart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: { items: [] },
    });
  }

  res.json({ message: 'Cart cleared' });
});
