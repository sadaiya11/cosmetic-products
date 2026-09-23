import cetaphil59_1 from '../assets/cetaphil/59ml-1.avif';
import cetaphil59_2 from '../assets/cetaphil/59ml-2.avif';
import cetaphil59_3 from '../assets/cetaphil/59ml-3.avif';
import cetaphil59_4 from '../assets/cetaphil/59ml-4.avif';

export const MOCK_PRODUCTS = [
  {
    id: 'prod-cetaphil',
    title: 'Cetaphil Gentle Skin Cleanser For Normal, Dry Skin Hydrates And Softens',
    slug: 'cetaphil-gentle-skin-cleanser',
    description: 'Hypoallergenic, dermatologist-recommended facial cleanser formulated with Niacinamide, Vitamin B5, and Hydrating Glycerin to soothe and protect sensitive, normal to dry skin.',
    price: 219.0,
    mrp: 299.0,
    discountPercent: 27,
    stock: 50,
    images: [cetaphil59_1, cetaphil59_2, cetaphil59_3, cetaphil59_4],
    rating: 4.8,
    numReviews: 433484,
    volume: '59ml',
    isFeatured: true,
    category: { name: 'Cleanser', slug: 'cleanser' },
    ingredients: 'Water, Cetyl Alcohol, Propylene Glycol, Sodium Lauryl Sulfate, Stearyl Alcohol, Niacinamide (Vitamin B3), Panthenol (Vitamin B5), Glycerin.',
    seoTitle: 'Cetaphil Gentle Skin Cleanser - Buy Online at Cosmetify India',
    seoDescription: 'Shop Cetaphil Gentle Skin Cleanser 59ml at best prices on Cosmetify. Dermatologist recommended hydrating face wash for dry and sensitive skin.',
    seoKeywords: 'cetaphil gentle cleanser, cetaphil face wash, sensitive skin cleanser, hydrating cleanser',
    reviews: [
      {
        id: 'rev-c1',
        customerName: 'Ananya Sharma',
        rating: 5,
        reviewTitle: 'Best cleanser for sensitive skin!',
        reviewBody: 'Extremely gentle and hydrating. Does not strip natural moisture from the face even in harsh winters. Highly recommended by my dermatologist!',
        isVerifiedPurchase: true,
        createdAt: '2026-09-20',
      },
      {
        id: 'rev-c2',
        customerName: 'Priya Patel',
        rating: 5,
        reviewTitle: 'Dermatologist approved & super mild',
        reviewBody: 'I have dry skin and this product has changed my morning routine. Soft, soap-free formula.',
        isVerifiedPurchase: true,
        createdAt: '2026-09-18',
      },
      {
        id: 'rev-c3',
        customerName: 'Rohan Mehta',
        rating: 4,
        reviewTitle: 'Very soothing daily wash',
        reviewBody: 'Feels like a hydrating lotion while cleansing. Removes light dirt and sunscreen smoothly.',
        isVerifiedPurchase: true,
        createdAt: '2026-09-14',
      },
      {
        id: 'rev-c4',
        customerName: 'Kavya Nair',
        rating: 5,
        reviewTitle: 'Must buy for dry & reactive skin',
        reviewBody: 'Repaired my damaged skin barrier in 2 weeks. Worth every penny!',
        isVerifiedPurchase: false,
        createdAt: '2026-09-08',
      },
    ],
    variants: [
      {
        id: 'v-cet-59ml',
        name: '59ml',
        price: 219,
        mrp: 299,
        discountPercent: 27,
        images: [cetaphil59_1, cetaphil59_2, cetaphil59_3, cetaphil59_4],
      },
      {
        id: 'v-cet-118ml',
        name: '118ml',
        price: 415,
        mrp: 550,
        discountPercent: 25,
        images: [
          'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
          cetaphil59_2,
          cetaphil59_3,
        ],
      },
      {
        id: 'v-cet-236ml',
        name: '236ml',
        price: 850,
        mrp: 1099,
        discountPercent: 23,
        images: [
          'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
          cetaphil59_1,
          cetaphil59_4,
        ],
      },
      {
        id: 'v-cet-473ml',
        name: '473ml',
        price: 1249,
        mrp: 1599,
        discountPercent: 22,
        images: [
          'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80',
          cetaphil59_3,
          cetaphil59_2,
        ],
      },
      {
        id: 'v-cet-1ltr',
        name: '1Ltr',
        price: 2199,
        mrp: 2799,
        discountPercent: 21,
        images: [
          'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
          cetaphil59_4,
          cetaphil59_1,
        ],
      },
    ],
  },
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
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    numReviews: 28,
    volume: '30 ml',
    isFeatured: true,
    category: { name: 'Skincare', slug: 'skincare' },
    ingredients: 'Organic Rosa Canina (Rosehip) Seed Oil, Squalane, Bakuchiol, Tocopherol (Vitamin E), Rosa Damascena Flower Oil.',
    seoTitle: 'Rosehip Botanical Youth Elixir Face Oil - Cosmetify',
    seoDescription: 'Discover Rosehip Youth Elixir infused with Bakuchiol & Squalane for anti-aging skin renewal.',
    seoKeywords: 'rosehip oil, youth elixir, bakuchiol face oil, anti aging oil',
    reviews: [
      {
        id: 'rev-r1',
        customerName: 'Meera Deshmukh',
        rating: 5,
        reviewTitle: 'Liquid gold for radiant glowing skin!',
        reviewBody: 'Gives an unbelievable natural glow by morning without feeling greasy.',
        isVerifiedPurchase: true,
        createdAt: '2026-09-19',
      },
    ],
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
      'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.8,
    numReviews: 42,
    volume: '50 ml',
    isFeatured: true,
    category: { name: 'Skincare', slug: 'skincare' },
    ingredients: 'Tremella Fuciformis (Snow Mushroom) Extract, Sodium Hyaluronate, Niacinamide, Glycerin, Aloe Barbadensis Leaf Juice.',
    seoTitle: 'Cellular Hydration Nectar Serum - Cosmetify',
    seoDescription: 'Triple-weight Hyaluronic Acid serum for intense skin hydration.',
    seoKeywords: 'hyaluronic acid serum, hydration nectar, plump skin serum',
    reviews: [
      {
        id: 'rev-h1',
        customerName: 'Vikram Joshi',
        rating: 5,
        reviewTitle: 'Ultra hydrating serum',
        reviewBody: 'Absorbs instantly. My skin feels plumped and hydrated all day long.',
        isVerifiedPurchase: true,
        createdAt: '2026-09-17',
      },
    ],
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
      'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.7,
    numReviews: 19,
    volume: '150 ml',
    isFeatured: false,
    category: { name: 'Cleanser', slug: 'cleanser' },
    ingredients: 'Camellia Japonica Seed Oil, Caprylic/Capric Triglyceride, Glycerin, Aqua, Sucrose Laurate.',
    seoTitle: 'Velvet Camellia Cream Cleanser - Cosmetify',
    seoDescription: 'Nourishing oil-to-milk balm cleanser for waterproof makeup removal.',
    seoKeywords: 'camellia cleanser, cleansing balm, oil cleanser',
    reviews: [],
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
      'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 5.0,
    numReviews: 35,
    volume: '100 ml',
    isFeatured: true,
    category: { name: 'Fragrance', slug: 'fragrance' },
    ingredients: 'Organic Sugarcane Alcohol, Essential Oil Perfume Blend, Santalum Album (Sandalwood), Amber Extract.',
    seoTitle: 'Amber & Sandalwood Eau De Parfum - Cosmetify',
    seoDescription: 'Artisanal luxury eau de parfum with natural Mysore sandalwood and golden amber.',
    seoKeywords: 'sandalwood perfume, amber fragrance, luxury edp india',
    reviews: [
      {
        id: 'rev-p1',
        customerName: 'Diya Sen',
        rating: 5,
        reviewTitle: 'Long lasting regal fragrance!',
        reviewBody: 'Stays on for 10+ hours. Smells warm, luxurious, and divine.',
        isVerifiedPurchase: true,
        createdAt: '2026-09-12',
      },
    ],
  },
  {
    id: 'prod-5',
    title: 'Kumkumadi Saffron Radiance Day Cream',
    slug: 'kumkumadi-saffron-radiance-cream',
    description: 'Ancient Ayurvedic formula blended with Kashmiri saffron strands, lotus ash, and sandalwood for intense skin illumination.',
    price: 1299.0,
    mrp: 1799.0,
    discountPercent: 28,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.8,
    numReviews: 124,
    volume: '50g',
    isFeatured: true,
    category: { name: 'Moisturizer', slug: 'moisturizer' },
    ingredients: 'Kashmiri Saffron, Sandalwood Extract, Goat Milk, Lotus Flower Oil, Sesame Seed Oil.',
    seoTitle: 'Kumkumadi Saffron Radiance Day Cream - Cosmetify',
    seoDescription: 'Brightening Kumkumadi Saffron day cream for glowing radiant skin.',
    seoKeywords: 'kumkumadi cream, saffron face cream, ayurvedic day cream',
    reviews: [],
  },
  {
    id: 'prod-6',
    title: 'Vitamin C 20% Active Glow Booster Serum',
    slug: 'vitamin-c-glow-booster-serum',
    description: 'Potent L-Ascorbic Acid combined with Ferulic Acid and Vitamin E to fade dark spots and boost skin luminosity.',
    price: 999.0,
    mrp: 1499.0,
    discountPercent: 33,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    numReviews: 89,
    volume: '30ml',
    isFeatured: false,
    category: { name: 'Skincare', slug: 'skincare' },
    ingredients: '20% L-Ascorbic Acid, Ferulic Acid, Tocopherol (Vitamin E), Hyaluronic Acid.',
    seoTitle: 'Vitamin C 20% Glow Booster Serum - Cosmetify',
    seoDescription: 'High potency 20% Vitamin C Serum for hyperpigmentation and glow.',
    seoKeywords: 'vitamin c serum, glow booster, dark spot serum',
    reviews: [],
  },
  {
    id: 'prod-7',
    title: 'Bakuchiol Retinol-Alternative Renewal Cream',
    slug: 'bakuchiol-renewal-cream',
    description: 'Plant-derived 2% Bakuchiol night treatment that smooths fine lines without redness or irritation.',
    price: 1650.0,
    mrp: 2100.0,
    discountPercent: 21,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.7,
    numReviews: 45,
    volume: '50ml',
    isFeatured: false,
    category: { name: 'Moisturizer', slug: 'moisturizer' },
    ingredients: 'Bakuchiol 2%, Peptide Complex, Ceramide NP, Squalane, Shea Butter.',
    seoTitle: 'Bakuchiol Anti Aging Renewal Cream - Cosmetify',
    seoDescription: 'Gentle natural retinol alternative night cream with 2% Bakuchiol.',
    seoKeywords: 'bakuchiol cream, retinol alternative, anti aging night cream',
    reviews: [],
  },
  {
    id: 'prod-8',
    title: 'Green Tea & Salicylic Acid Clarifying Gel Cleanser',
    slug: 'green-tea-salicylic-cleanser',
    description: 'BHA purifying gel wash enriched with Organic Green Tea and Tea Tree Oil to clear clogged pores and acne breakouts.',
    price: 499.0,
    mrp: 699.0,
    discountPercent: 28,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.6,
    numReviews: 210,
    volume: '120ml',
    isFeatured: true,
    category: { name: 'Cleanser', slug: 'cleanser' },
    ingredients: '2% Salicylic Acid, Camellia Sinensis (Green Tea) Leaf Extract, Tea Tree Oil, Aloe Leaf Juice.',
    seoTitle: 'Green Tea Salicylic Acid Cleanser - Cosmetify',
    seoDescription: 'Acne control 2% Salicylic Acid gel face wash for oily and acne-prone skin.',
    seoKeywords: 'salicylic acid cleanser, green tea face wash, BHA acne cleanser',
    reviews: [],
  },
  {
    id: 'prod-9',
    title: 'French Velvet Vanilla & Jasmine Nectar EDP',
    slug: 'french-vanilla-jasmine-perfume',
    description: 'Warm intoxicating gourmand perfume with Madagascan vanilla beans, night-blooming jasmine, and white musk.',
    price: 2199.0,
    mrp: 2999.0,
    discountPercent: 26,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 5.0,
    numReviews: 68,
    volume: '100ml',
    isFeatured: true,
    category: { name: 'Fragrance', slug: 'fragrance' },
    ingredients: 'Organic Sugarcane Alcohol, Madagascar Vanilla Absolute, Jasmine Grandiflorum, White Musk.',
    seoTitle: 'Vanilla & Jasmine Nectar Perfume EDP - Cosmetify',
    seoDescription: 'Luxury gourmand vanilla and jasmine eau de parfum.',
    seoKeywords: 'vanilla perfume, jasmine fragrance, EDP online india',
    reviews: [],
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

export function getProductVariants(product) {
  if (!product) return [];

  if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
    return product.variants;
  }

  const basePrice = Number(product.price) || 299;
  const mainImage = (product.images && product.images[0]) ? product.images[0] : 'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80';

  const galleryPool = [
    mainImage,
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
  ];

  const categorySlug = product.category?.slug || 'skincare';

  if (categorySlug === 'fragrance') {
    return [
      {
        id: 'v-30ml',
        name: '30ml',
        price: Math.round(basePrice * 0.6),
        mrp: Math.round(basePrice * 0.8),
        discountPercent: 25,
        images: [galleryPool[0], galleryPool[1], galleryPool[2]],
      },
      {
        id: 'v-50ml',
        name: '50ml',
        price: basePrice,
        mrp: Math.round(basePrice * 1.3),
        discountPercent: 23,
        images: [galleryPool[1], galleryPool[0], galleryPool[3], galleryPool[4]],
      },
      {
        id: 'v-100ml',
        name: '100ml',
        price: Math.round(basePrice * 1.8),
        mrp: Math.round(basePrice * 2.4),
        discountPercent: 25,
        images: [galleryPool[3], galleryPool[4], galleryPool[0], galleryPool[1]],
      },
      {
        id: 'v-200ml',
        name: '200ml',
        price: Math.round(basePrice * 3.2),
        mrp: Math.round(basePrice * 4.2),
        discountPercent: 24,
        images: [galleryPool[4], galleryPool[2], galleryPool[1], galleryPool[0]],
      },
    ];
  }

  return [
    {
      id: 'v-59ml',
      name: '59ml',
      price: Math.round(basePrice * 0.3),
      mrp: Math.round(basePrice * 0.4),
      discountPercent: 25,
      images: [galleryPool[0], galleryPool[1], galleryPool[2], galleryPool[4]],
    },
    {
      id: 'v-118ml',
      name: '118ml',
      price: Math.round(basePrice * 0.55),
      mrp: Math.round(basePrice * 0.75),
      discountPercent: 26,
      images: [galleryPool[1], galleryPool[2], galleryPool[0], galleryPool[3]],
    },
    {
      id: 'v-236ml',
      name: '236ml',
      price: basePrice,
      mrp: Math.round(basePrice * 1.33),
      discountPercent: 25,
      images: [galleryPool[2], galleryPool[3], galleryPool[1], galleryPool[0]],
    },
    {
      id: 'v-473ml',
      name: '473ml',
      price: Math.round(basePrice * 1.7),
      mrp: Math.round(basePrice * 2.2),
      discountPercent: 23,
      images: [galleryPool[3], galleryPool[4], galleryPool[2], galleryPool[1]],
    },
    {
      id: 'v-1ltr',
      name: '1Ltr',
      price: Math.round(basePrice * 2.9),
      mrp: Math.round(basePrice * 3.9),
      discountPercent: 25,
      images: [galleryPool[4], galleryPool[0], galleryPool[3], galleryPool[2]],
    },
  ];
}

