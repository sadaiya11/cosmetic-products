import asyncHandler from 'express-async-handler';
import prisma from '../config/prisma.js';

// @desc    Fetch all products with filtering & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const { category, search, featured, minPrice, maxPrice } = req.query;

  const where = {};

  if (category) {
    where.category = { slug: category };
  }

  if (featured === 'true') {
    where.isFeatured = true;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json(products);
});

// @desc    Fetch single product by ID or slug
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findFirst({
    where: {
      OR: [{ id: id }, { slug: id }],
    },
    include: {
      category: true,
      reviews: {
        include: {
          user: {
            select: { name: true },
          },
        },
      },
    },
  });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    stock,
    images,
    categoryId,
    ingredients,
    skinType,
    volume,
    isFeatured,
  } = req.body;

  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now().toString().slice(-4);

  const product = await prisma.product.create({
    data: {
      title,
      slug,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10) || 0,
      images: images || [],
      categoryId,
      ingredients,
      skinType,
      volume,
      isFeatured: isFeatured || false,
    },
    include: { category: true },
  });

  res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    stock,
    images,
    categoryId,
    ingredients,
    skinType,
    volume,
    isFeatured,
  } = req.body;

  const existingProduct = await prisma.product.findUnique({ where: { id } });

  if (!existingProduct) {
    res.status(404);
    throw new Error('Product not found');
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      title: title || existingProduct.title,
      description: description || existingProduct.description,
      price: price !== undefined ? parseFloat(price) : existingProduct.price,
      stock: stock !== undefined ? parseInt(stock, 10) : existingProduct.stock,
      images: images || existingProduct.images,
      categoryId: categoryId || existingProduct.categoryId,
      ingredients: ingredients !== undefined ? ingredients : existingProduct.ingredients,
      skinType: skinType !== undefined ? skinType : existingProduct.skinType,
      volume: volume !== undefined ? volume : existingProduct.volume,
      isFeatured: isFeatured !== undefined ? isFeatured : existingProduct.isFeatured,
    },
    include: { category: true },
  });

  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: { id },
  });

  res.json({ message: 'Product removed' });
});
