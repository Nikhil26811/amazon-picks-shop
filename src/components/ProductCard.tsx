
import React from 'react';
import { ExternalLink, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { convertUSDtoINR } from '@/lib/currency';

type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  rating: number;
  amazonUrl: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  imageUrl,
  price,
  rating,
  amazonUrl,
}) => {
  const inrPrice = convertUSDtoINR(price);
  
  return (
    <Card className="card-hover overflow-hidden">
      <div className="relative overflow-hidden pt-[60%]">
        <img 
          src={imageUrl} 
          alt={title} 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-lg text-orange">{price}</p>
            <p className="text-sm text-gray-600 flex items-center">
              <IndianRupee className="h-3 w-3 mr-1" /> {inrPrice}
            </p>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-gray-600 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full btn-primary">
          <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            View Details <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
