import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Mail, Download, Home } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

const PaymentSuccess: React.FC = () => {
  const { bookingData, bookingPersonsData, resetBookingData } = useBooking();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Reset booking data when component unmounts
    return () => {
      resetBookingData();
    };
  }, [resetBookingData]);
  
  if (!bookingData || !bookingPersonsData) {
    return (
      <div className="pt-32 pb-20 bg-desert-50 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold mb-6 text-gray-800">No booking information found</h1>
          <Link to="/" className="button-primary inline-flex items-center gap-2">
            <Home className="h-5 w-5" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  const bookingNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  const bookingDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric' 
  });
  
  return (
    <div className="pt-32 pb-20 bg-desert-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Payment Successful!
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              Thank you for booking with ACES Tunisia. Your adventure awaits!
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-bold text-xl mb-6 text-center text-gray-800">
              Booking Confirmation
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Booking Reference</span>
                <span className="font-bold text-lg">ACE-{bookingNumber}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Date of Booking</span>
                <span className="font-bold">{bookingDate}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Package</span>
                <span className="font-bold">{bookingData.packageTitle}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Number of Travelers</span>
                <span className="font-bold">{bookingPersonsData.numberOfPeople}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Primary Contact</span>
                <span className="font-bold">{bookingPersonsData.people[0].firstName} {bookingPersonsData.people[0].lastName}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Total Amount Paid</span>
                <span className="font-bold text-secondary">
                  {bookingData.totalPrice * bookingPersonsData.numberOfPeople} DT
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-700 mb-6">
                A confirmation email has been sent to <strong>{bookingPersonsData.contactDetails.email}</strong> with all your booking details.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="button-secondary flex items-center justify-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Receipt
                </button>
                
                <button className="button-secondary flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5" />
                  Resend Email
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-primary/10 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-start gap-4">
              <Calendar className="h-12 w-12 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">What's Next?</h3>
                <p className="text-gray-700 mb-4">
                  Our team will be in touch shortly to confirm all the details of your booking and answer any questions you might have.
                </p>
                <p className="text-gray-700">
                  We recommend adding <strong>info@acestunisia.com</strong> to your contacts to ensure you receive all important communications about your upcoming adventure.
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-12">
            <Link to="/" className="button-primary inline-flex items-center gap-2">
              <Home className="h-5 w-5" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;