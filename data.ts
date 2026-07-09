import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Hariz Classic Linen Shirt',
    price: 1899,
    rating: 4.8,
    category: 'shirts',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Crafted from premium quality long-staple linen, this lightweight and highly breathable shirt is designed to get softer with every single wash. Ideal for breezy summer days or layering beneath structured outerwear.',
    details: [
      '100% premium long-staple organic linen',
      'Aesthetic mother-of-pearl buttons',
      'Relaxed, breathable fit with curved hemline',
      'Pre-washed to minimize shrinkage and ensure maximum softness',
      'Minimalist point collar'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true
  },
  {
    id: 'p2',
    name: 'Studio Oversized heavy Tee',
    price: 999,
    rating: 4.6,
    category: 't-shirts',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Constructed from a premium 280 GSM heavy cotton loopback jersey, this boxy oversized t-shirt features a solid ribbed neck collar and drop shoulder seams for a modern structural silhouette.',
    details: [
      '100% heavy organic combed cotton',
      'Solid 280 GSM heavyweight jersey weave',
      'Double-stitched structural neckband',
      'Oversized silhouette with drop shoulder styling',
      'Garment dyed for a beautiful, subtle fade over time'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true
  },
  {
    id: 'p3',
    name: 'Raw Selvedge Denim Jeans',
    price: 2499,
    rating: 4.9,
    category: 'jeans',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df43cd?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Our signature denim is woven on antique shuttle looms in a beautiful dark indigo indigo selvedge design. Raw and unwashed, they are designed to mold perfectly to your body, creating custom, bespoke creases unique to you.',
    details: [
      '13.5 oz heavy Japanese selvedge denim',
      'Genuine raw, unwashed indigo fabric',
      'Classic 5-pocket structural layout',
      'Premium metal shank button-fly',
      'Reinforced silver copper rivets at high-stress zones'
    ],
    sizes: ['30', '32', '34', '36'],
    inStock: true,
    featured: true
  },
  {
    id: 'p4',
    name: 'Monochrome Craft Sneakers',
    price: 3999,
    rating: 4.7,
    category: 'shoes',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'A masterpiece of sleek athletic minimalism. These handmade sneakers feature ultra-premium full grain leather uppers, stitched Margom rubber cupsoles, and a plush leather-lined interior for ultimate all-day comfort.',
    details: [
      'Premium top-grade full grain calf leather upper',
      'Plush, fully leather-lined interior for moisture-wicking',
      'Durable Italian Margom stitched rubber cupsoles',
      'Tonal waxed cotton laces',
      'Handcrafted in small, limited batches'
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    inStock: true,
    featured: true
  },
  {
    id: 'p5',
    name: 'Hariz Chrono-Minimalist Watch',
    price: 4999,
    rating: 4.9,
    category: 'accessories',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'A timeless minimalist timepiece that pairs architectural clean lines with precision Japanese quartz movement. Features an interchangeable organic vegetable-tanned leather strap.',
    details: [
      'Premium Japanese Miyota Quartz movement',
      'Heavy 316L medical-grade stainless steel case (40mm)',
      'Scratch-resistant sapphire-coated glass',
      'Italian vegetable-tanned custom leather strap',
      'Water resistant to 5 ATM (50 meters)'
    ],
    sizes: ['One Size'],
    inStock: true,
    featured: true
  },
  {
    id: 'p6',
    name: 'Soft Tailored Wool Blazer',
    price: 3499,
    rating: 4.5,
    category: 'shirts',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'A classic double-breasted relaxed blazer crafted from exceptionally soft, premium wool-blend twill. Designed with delicate dropped shoulders, peak lapels, and custom contrast horn buttons.',
    details: [
      'Soft Wool and organic Tencel blend twill',
      'Sophisticated double-breasted front closures',
      'Fully lined with premium silky cupro',
      'Functional front welt pockets and inner chest pocket',
      'Gently dropped shoulders for an effortless, modern drape'
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    featured: false
  },
  {
    id: 'p7',
    name: 'Ribbed Knit Mock Neck',
    price: 1199,
    rating: 4.7,
    category: 't-shirts',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'This ultra-soft, body-contouring rib-knit top features a mock turtleneck collar. It acts as an elegant standalone style or a sleek base layer for the transitional seasons.',
    details: [
      'Highly elastic, soft Viscose and Nylon rib-knit blend',
      'Flattering mock neck silhouette',
      'Fitted cut that highlights natural curves',
      'Fine 12-gauge premium knitwear density',
      'Highly breathable and wrinkle-resistant fabric'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    featured: false
  },
  {
    id: 'p8',
    name: 'Relaxed Wide-Leg Denim',
    price: 2199,
    rating: 4.8,
    category: 'jeans',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1506629082925-63d6392d3cfc?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df43cd?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'A modern nod to effortless vintage styling. These wide-leg jeans are cut from rigid organic cotton denim with a high-rise waist and fluid, relaxed fit through the legs.',
    details: [
      '100% GOTS certified organic rigid cotton denim',
      'High-rise waist designed with classic curves',
      'Relaxed straight-cut wide leg profile',
      'Signature branded hardware and metal studs',
      'Aesthetic light stonewash finish'
    ],
    sizes: ['26', '28', '30', '32'],
    inStock: true,
    featured: false
  },
  {
    id: 'p9',
    name: 'Urban Leather Chelsea Boots',
    price: 4599,
    rating: 4.6,
    category: 'shoes',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1613483187327-1117fa63b580?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'The definitive wardrobe staple. These Chelsea boots boast premium water-resistant suede, elasticized goring, and custom pull tabs, sitting atop an ultra-durable Goodyear welted crepe sole.',
    details: [
      'Premium water-repellent Italian suede uppers',
      'Durable Goodyear welted crepe outsole',
      'Robust elastic side panels for comfortable slide-on entry',
      'Cushioned cork-bed midsole molds to your foot shape',
      'Double-weave heavy nylon pull loops'
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    inStock: true,
    featured: false
  },
  {
    id: 'p10',
    name: 'Signature Acetate Sunglasses',
    price: 1499,
    rating: 4.7,
    category: 'accessories',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Timeless architectural square frames handcrafted from premium cellulose block acetate. Engineered with custom gold-tone metal core wires and polarising dark-tinted UV lenses.',
    details: [
      'Premium biodegradable organic cellulose acetate',
      'Polarized Category 3 lenses for 100% UVA/UVB protection',
      'Robust 5-barrel metal hinges with custom wire core temple design',
      'Ergonomic, secure, and integrated comfortable nose pads',
      'Includes premium microfiber leather protective carrying case'
    ],
    sizes: ['One Size'],
    inStock: true,
    featured: false
  }
];
