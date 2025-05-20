
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { PlusCircle, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';

type ProductFormData = {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  affiliateLink: string;
  rating: number;
};

const ManageProducts = () => {
  const [products, setProducts] = useState<Array<ProductFormData & { id: string }>>([]);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      imageUrl: '',
      affiliateLink: '',
      rating: 4,
    }
  });

  // Load saved products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('affiliateProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('affiliateProducts', JSON.stringify(products));
  }, [products]);

  const onSubmit = (data: ProductFormData) => {
    const newProduct = {
      ...data,
      id: Date.now().toString(), // Simple unique ID
    };
    
    setProducts([...products, newProduct]);
    form.reset();
    setImagePreview('');
    toast.success("Product added successfully!");
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    form.setValue('imageUrl', url);
    setImagePreview(url);
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    toast.success("Product deleted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-navy mb-8">Manage Products</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter product title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Product description" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input placeholder="$99.99" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating (1-5)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1" 
                                max="5"
                                step="1"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Input 
                                placeholder="https://example.com/image.jpg" 
                                {...field}
                                onChange={handleImageUrlChange} 
                              />
                              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md">
                                {imagePreview ? (
                                  <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="h-full w-full object-cover rounded-md"
                                    onError={() => setImagePreview('')}
                                  />
                                ) : (
                                  <Image className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="affiliateLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Affiliate Link</FormLabel>
                          <FormControl>
                            <Input placeholder="https://youraffiliatelink.com/product" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="btn-primary w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-7">
            <h2 className="text-xl font-semibold mb-4">Your Products</h2>
            <ProductList products={products} onDelete={deleteProduct} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageProducts;
