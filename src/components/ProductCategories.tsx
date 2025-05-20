
import React from 'react';
import { Package } from 'lucide-react';

type CategoryProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const categories = [
  {
    title: "Electronics",
    description: "Gadgets, accessories, and tech essentials",
    icon: <Package className="h-8 w-8 text-navy" />,
  },
  {
    title: "Home & Kitchen",
    description: "Essentials for your living space",
    icon: <Package className="h-8 w-8 text-navy" />,
  },
  {
    title: "Beauty & Personal Care",
    description: "Top-rated beauty and self-care products",
    icon: <Package className="h-8 w-8 text-navy" />,
  },
  {
    title: "Books & Media",
    description: "Must-read books and entertainment",
    icon: <Package className="h-8 w-8 text-navy" />,
  },
];

const CategoryCard: React.FC<CategoryProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 card-hover">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-navy">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ProductCategories = () => {
  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy">Browse Categories</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Explore my hand-picked recommendations across popular categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard 
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
