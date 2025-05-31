import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { packages } from '../data/packages';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { bookingData, bookingPersonsData } = useBooking();
  
  useEffect(() => {
    // Redirect if no booking data is present
    if (!bookingData || !bookingPersonsData) {
      navigate('/');
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [bookingData, bookingPersonsData, navigate]);
  
  const packageData = bookingData ? packages.find(pkg => pkg.id === bookingData.packageId) : null;
  
  const handlePaymentSuccess = () => {
    // In a real application, this would be called after successful payment
    navigate('/success');
  };
  
  if (!bookingData || !bookingPersonsData || !packageData) {
    return null;
  }
  
  // Calculate final total price
  const totalPrice = bookingData.totalPrice * bookingPersonsData.numberOfPeople;
  
  return (
    <div className="pt-24 pb-20 bg-desert-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl font-bold mb-6 text-gray-800">Complete Your Payment</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Booking Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h2 className="font-bold text-xl mb-4 pb-2 border-b border-gray-200 text-gray-800">
                    Booking Summary
                  </h2>
                  
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-800">{packageData.title}</h3>
                    <p className="text-sm text-gray-600">Formule {packageData.id}</p>
                  </div>
                  
                  <div className="mb-4 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Package Price:</span>
                      <span>{bookingData.basePrice} DT</span>
                    </div>
                    
                    {bookingData.options.length > 0 && (
                      <>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Selected Options:</span>
                          <span>{bookingData.options.reduce((sum, opt) => sum + opt.price, 0)} DT</span>
                        </div>
                        
                        <div className="pl-4 text-xs text-gray-500 mb-1">
                          {bookingData.options.map((option) => (
                            <div key={option.id} className="flex justify-between">
                              <span>- {option.title}</span>
                              <span>{option.price} DT</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Price per person:</span>
                      <span>{bookingData.totalPrice} DT</span>
                    </div>
                    
                    <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
                      <span className="text-gray-600">Number of People:</span>
                      <span>x {bookingPersonsData.numberOfPeople}</span>
                    </div>
                    
                    <div className="flex justify-between font-bold">
                      <span>Total Amount:</span>
                      <span className="text-secondary text-lg">{totalPrice} DT</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Section */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h2 className="font-bold text-xl mb-6 flex items-center text-gray-800">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    Payment Method
                  </h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <Shield className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-blue-800 text-sm">
                        Your payment will be processed securely through Konnect, Tunisia's trusted payment gateway. All payment information is encrypted.
                      </p>
                    </div>
                  </div>
                  
                  {/* Payment Form */}
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {/* This would be the actual Konnect integration in a real application */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <img 
                        src="https://www.universalmarketplace.tn/images/payment-gateways/konnect.png" 
                        alt="Konnect Payment" 
                        className="h-12 mx-auto mb-4"
                      />
                      <p className="text-gray-600 mb-4">
                        In the real application, the Konnect payment form would be integrated here.
                      </p>
                      <button 
                        onClick={handlePaymentSuccess}
                        className="button-primary w-full py-4"
                      >
                        Pay {totalPrice} DT
                      </button>
                      <p className="text-xs text-gray-500 mt-4">
                        (For demo purposes, clicking the button will simulate a successful payment)
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="font-bold text-xl mb-4 flex items-center text-gray-800">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    What Happens Next?
                  </h2>
                  
                  <ol className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-3 mt-0.5">
                        1
                      </div>
                      <p>After completing your payment, you'll receive a confirmation email with your booking details.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-3 mt-0.5">
                        2
                      </div>
                      <p>Our team will review your booking and contact you to confirm all arrangements.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-3 mt-0.5">
                        3
                      </div>
                      <p>You'll receive a detailed itinerary and pre-departure information closer to your travel date.</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;