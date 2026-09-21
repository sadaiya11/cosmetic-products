import asyncHandler from 'express-async-handler';
import prisma from '../config/prisma.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
  res.json(categories);
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image } = req.body;
  const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const categoryExists = await prisma.category.findUnique({
    where: { slug },
  });

  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await prisma.category.create({
    data: { name, slug, description, image },
  });

  res.status(201).json(category);
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.category.delete({
    where: { id },
  });

  res.json({ message: 'Category removed' });
});
