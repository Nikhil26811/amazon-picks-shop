import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Camera, Upload, Shirt } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClothingItem from '@/components/ClothingItem';

// Sample clothing items
const clothingItems = [
  {
    id: "1", 
    name: "Classic White T-Shirt",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    price: "$24.99",
    affiliateLink: "#"
  },
  {
    id: "2", 
    name: "Blue Denim Jacket",
    imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
    price: "$59.99",
    affiliateLink: "#"
  },
  {
    id: "3", 
    name: "Black Hoodie",
    imageUrl: "https://images.unsplash.com/photo-1556566588028-4147f3842f27",
    price: "$39.99",
    affiliateLink: "#"
  },
  {
    id: "4", 
    name: "Striped Polo Shirt",
    imageUrl: "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114",
    price: "$34.99",
    affiliateLink: "#"
  },
  {
    id: "5", 
    name: "Gray Sweater",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    price: "$49.99",
    affiliateLink: "#"
  }
];

const VirtualTryOn = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<string | null>(null);
  const [processingImage, setProcessingImage] = useState<boolean>(false);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setOverlayImage(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const takePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // Create video element to show camera feed
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      
      // Create canvas to capture still image
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      // Wait for video to load
      await new Promise<void>((resolve) => {
        videoElement.onloadedmetadata = () => {
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          resolve();
        };
      });
      
      // Draw video frame to canvas
      if (context) {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL('image/png');
        setUserImage(imageDataURL);
        setOverlayImage(null);
      }
      
      // Stop all video streams
      stream.getTracks().forEach(track => track.stop());
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error("Could not access camera. Please check permissions.");
    }
  };
  
  const handleClothingSelect = (clothingUrl: string) => {
    setSelectedClothing(clothingUrl);
    applyClothingOverlay(clothingUrl);
  };
  
  const applyClothingOverlay = async (clothingUrl: string) => {
    if (!userImage) {
      toast.error("Please upload your photo first");
      return;
    }
    
    setProcessingImage(true);
    
    try {
      // In a real implementation, this would call a more sophisticated API
      // for now we'll do a simple overlay
      setTimeout(() => {
        createSimpleOverlay(clothingUrl);
        setProcessingImage(false);
      }, 1500);
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error("Error applying clothing overlay");
      setProcessingImage(false);
    }
  };
  
  const createSimpleOverlay = (clothingUrl: string) => {
    if (!userImage || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Load user image
    const userImg = new Image();
    userImg.onload = () => {
      // Set canvas size
      canvas.width = userImg.width;
      canvas.height = userImg.height;
      
      // Draw user image
      context.drawImage(userImg, 0, 0);
      
      // Load clothing image
      const clothingImg = new Image();
      clothingImg.crossOrigin = "anonymous";
      clothingImg.onload = () => {
        // Calculate position to center clothing on the user (approx chest area)
        const clothingWidth = userImg.width * 0.7;
        const aspectRatio = clothingImg.height / clothingImg.width;
        const clothingHeight = clothingWidth * aspectRatio;
        const xPos = (userImg.width - clothingWidth) / 2;
        const yPos = userImg.height * 0.3;
        
        // Draw clothing on top
        context.globalAlpha = 0.8; // Semi-transparent
        context.drawImage(clothingImg, xPos, yPos, clothingWidth, clothingHeight);
        context.globalAlpha = 1.0;
        
        // Convert to data URL
        const resultImageUrl = canvas.toDataURL('image/png');
        setOverlayImage(resultImageUrl);
        
        // Show success message
        toast.success("Virtual try-on complete!");
      };
      clothingImg.onerror = () => {
        toast.error("Error loading clothing image");
      };
      clothingImg.src = clothingUrl;
    };
    userImg.src = userImage;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-navy mb-8">Virtual Try-On</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Upload Your Photo</h2>
                
                <Tabs defaultValue="upload">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="camera">Camera</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="space-y-4">
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={triggerFileInput}
                    >
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload your photo</p>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="camera" className="space-y-4">
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={takePhoto}
                    >
                      <Camera className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to take a photo</p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Preview</h3>
                  <div className="aspect-[3/4] bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                    {overlayImage ? (
                      <img 
                        src={overlayImage} 
                        alt="Try-on result"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : userImage ? (
                      <img 
                        src={userImage} 
                        alt="Your uploaded photo"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <Shirt className="h-8 w-8 mb-2" />
                        <span>No image uploaded</span>
                      </div>
                    )}
                    
                    {/* Hidden canvas for image processing */}
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-7">
            <h2 className="text-xl font-semibold mb-4">Select Clothing to Try On</h2>
            
            {processingImage && (
              <div className="flex justify-center my-4">
                <div className="animate-pulse text-center">
                  <p className="text-navy font-medium">Processing image...</p>
                  <p className="text-sm text-gray-500">This may take a moment</p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {clothingItems.map((item) => (
                <ClothingItem
                  key={item.id}
                  item={item}
                  onSelect={() => handleClothingSelect(item.imageUrl)}
                  selected={selectedClothing === item.imageUrl}
                  disabled={!userImage || processingImage}
                />
              ))}
            </div>
            
            {!userImage && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-amber-800">Please upload your photo first to try on clothes.</p>
              </div>
            )}
            
            {selectedClothing && userImage && !processingImage && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="mt-6 btn-primary">
                    View Full Details
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[90%] sm:max-w-lg">
                  <div className="mt-6 space-y-4">
                    <h3 className="text-xl font-bold">Your Try-On Result</h3>
                    
                    <div className="aspect-[3/4] bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                      {overlayImage && (
                        <img 
                          src={overlayImage} 
                          alt="Try-on result"
                          className="max-h-full max-w-full object-contain"
                        />
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      This is a simple visualization. For the best experience, please visit a store 
                      or use our product measurements provided on each product page.
                    </p>
                    
                    <Button className="w-full btn-primary">
                      <a href={clothingItems.find(item => item.imageUrl === selectedClothing)?.affiliateLink} target="_blank" rel="noopener noreferrer">
                        Buy This Item
                      </a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VirtualTryOn;
