
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Trash2, IndianRupee } from 'lucide-react';
import { convertUSDtoINR } from '@/lib/currency';

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  affiliateLink: string;
  rating: number;
};

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg bg-gray-50">
        <p className="text-gray-500">No products added yet. Add your first product using the form.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => {
        const inrPrice = convertUSDtoINR(product.price);
        
        return (
          <Card key={product.id} className="card-hover overflow-hidden">
            <div className="relative overflow-hidden pt-[60%]">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-400">No image</p>
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-bold line-clamp-2">{product.title}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg text-orange">{product.price}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <IndianRupee className="h-3 w-3 mr-1" /> {inrPrice}
                  </p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < product.rating ? "text-yellow-500" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600 line-clamp-3">{product.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                asChild 
                variant="outline" 
                onClick={() => onDelete(product.id)}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <span>
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </span>
              </Button>
              
              <Button asChild className="btn-primary">
                <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  View <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductList;
