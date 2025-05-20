
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  affiliateLink: string;
  rating: number;
};

// Fallback products in case there are no saved products
const fallbackProducts = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    description: "Experience crystal clear sound with these noise-cancelling wireless headphones. Perfect for work and travel.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    price: "$149.99",
    rating: 5,
    affiliateLink: "#",
  },
  {
    id: "2",
    title: "Ergonomic Office Chair",
    description: "Improve your posture and comfort with this highly adjustable ergonomic office chair with lumbar support.",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    price: "$249.99",
    rating: 4,
    affiliateLink: "#",
  },
  {
    id: "3",
    title: "Smart Home Assistant",
    description: "Control your home with voice commands using this intelligent smart home assistant with built-in speaker.",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    price: "$89.99",
    rating: 4,
    affiliateLink: "#",
  },
  {
    id: "4",
    title: "Stainless Steel Water Bottle",
    description: "Keep your drinks cold for 24 hours or hot for 12 with this durable, leak-proof stainless steel bottle.",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    price: "$34.99",
    rating: 5,
    affiliateLink: "#",
  },
  {
    id: "5",
    title: "LED Desk Lamp with Wireless Charging",
    description: "Modern desk lamp with adjustable brightness, color temperature and built-in wireless charging pad.",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    price: "$59.99",
    rating: 4,
    affiliateLink: "#",
  },
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from localStorage
    const savedProducts = localStorage.getItem('affiliateProducts');
    if (savedProducts && JSON.parse(savedProducts).length > 0) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Use fallback products if no saved products
      setProducts(fallbackProducts as Product[]);
    }
  }, []);

  return (
    <section id="featured" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy">Featured Products</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            These are my top picks for this month. Products I've personally tested and recommend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
              price={product.price}
              rating={product.rating}
              amazonUrl={product.affiliateLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
