
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ClothingItemProps = {
  item: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    affiliateLink: string;
  };
  onSelect: () => void;
  selected: boolean;
  disabled: boolean;
};

const ClothingItem: React.FC<ClothingItemProps> = ({ 
  item, 
  onSelect,
  selected,
  disabled 
}) => {
  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all cursor-pointer hover:shadow-md',
        selected ? 'ring-2 ring-blue-500' : 'hover:scale-105',
        disabled && 'opacity-60 pointer-events-none'
      )}
      onClick={onSelect}
    >
      <div className="relative overflow-hidden pt-[120%]">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-3 space-y-1">
        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
        <p className="font-semibold text-sm text-orange">{item.price}</p>
      </CardContent>
    </Card>
  );
};

export default ClothingItem;
