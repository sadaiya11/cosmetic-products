export const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Rosehip Botanical Youth Elixir',
    slug: 'rosehip-youth-elixir',
    description: 'A luxurious night oil infused with wild cold-pressed rosehip, bakuchiol, and organic squalane for intense skin renewal.',
    price: 1499.0,
    mrp: 1999.0,
    discountPercent: 25,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    numReviews: 28,
    volume: '30 ml',
    isFeatured: true,
    category: { name: 'Skincare', slug: 'skincare' },
    ingredients: 'Organic Rosa Canina (Rosehip) Seed Oil, Squalane, Bakuchiol, Tocopherol (Vitamin E), Rosa Damascena Flower Oil.',
  },
  {
    id: 'prod-2',
    title: 'Cellular Hydration Nectar Serum',
    slug: 'cellular-hydration-nectar',
    description: 'Triple-weight hyaluronic acid serum paired with snow mushroom extract to deeply saturate thirsty skin cells.',
    price: 1850.0,
    mrp: 2300.0,
    discountPercent: 20,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.8,
    numReviews: 42,
    volume: '50 ml',
    isFeatured: true,
    category: { name: 'Skincare', slug: 'skincare' },
    ingredients: 'Tremella Fuciformis (Snow Mushroom) Extract, Sodium Hyaluronate, Niacinamide, Glycerin, Aloe Barbadensis Leaf Juice.',
  },
  {
    id: 'prod-3',
    title: 'Velvet Camellia Cream Cleanser',
    slug: 'velvet-camellia-cleanser',
    description: 'Nourishing oil-to-milk balm cleanser that removes waterproof makeup without stripping natural skin moisture.',
    price: 899.0,
    mrp: 1199.0,
    discountPercent: 25,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.7,
    numReviews: 19,
    volume: '150 ml',
    isFeatured: false,
    category: { name: 'Cleanser', slug: 'cleanser' },
    ingredients: 'Camellia Japonica Seed Oil, Caprylic/Capric Triglyceride, Glycerin, Aqua, Sucrose Laurate.',
  },
  {
    id: 'prod-4',
    title: 'Amber & Sandalwood Artisanal Perfume',
    slug: 'amber-sandalwood-perfume',
    description: 'An intoxicating eau de parfum blending warm Mysore sandalwood, golden amber resin, and wild jasmine.',
    price: 2450.0,
    mrp: 3500.0,
    discountPercent: 30,
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 5.0,
    numReviews: 35,
    volume: '100 ml',
    isFeatured: true,
    category: { name: 'Fragrance', slug: 'fragrance' },
    ingredients: 'Organic Sugarcane Alcohol, Essential Oil Perfume Blend, Santalum Album (Sandalwood), Amber Extract.',
  },
];

export function getPriceDetails(product) {
  if (!product) return { price: 0, mrp: 0, discountPercent: 0 };
  const price = Number(product.price) || 0;
  let mrp = Number(product.mrp);
  let discountPercent = Number(product.discountPercent);

  if (mrp && mrp > price) {
    discountPercent = Math.round(((mrp - price) / mrp) * 100);
  } else if (!mrp && discountPercent > 0) {
    mrp = Math.round(price / (1 - discountPercent / 100));
  } else {
    // Generate varying realistic discounts (10%, 15%, 20%, 25%, 30%) based on product id
    const str = String(product.id || product._id || product.title || '1');
    const charSum = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const options = [10, 15, 20, 25, 30];
    discountPercent = options[charSum % options.length];
    mrp = Math.round(price / (1 - discountPercent / 100));
  }

  return {
    price,
    mrp,
    discountPercent,
  };
}
