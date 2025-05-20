
// Function to convert USD to INR
// Using a fixed exchange rate for simplicity
// In a production app, this would fetch real-time rates from an API

export function convertUSDtoINR(usdPrice: string): string {
  // Extract the numeric value from the USD price string
  const numericValue = parseFloat(usdPrice.replace(/[^0-9.-]+/g, ''));
  
  if (isNaN(numericValue)) {
    return "₹0.00"; // Return default if parsing fails
  }
  
  // Current exchange rate (as of May 2025)
  // In a real app, you would fetch this from an API
  const exchangeRate = 83.5;
  
  // Convert USD to INR
  const inrValue = numericValue * exchangeRate;
  
  // Format the INR value
  return `₹${inrValue.toFixed(2)}`;
}
