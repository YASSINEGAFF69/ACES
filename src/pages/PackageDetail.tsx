import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, Check, ChevronsRight } from 'lucide-react';
import { packages } from '../data/packages';
import { useBooking } from '../contexts/BookingContext';

const PackageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const packageId = Number(id);
  
  const packageData = packages.find(pkg => pkg.id === packageId);
  
  const { setBookingData } = useBooking();
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(packageData?.price || 0);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Calculate total price based on selected options
    if (packageData) {
      let total = packageData.price;
      selectedOptions.forEach(optionId => {
        const option = packageData.options.find(opt => opt.id === optionId);
        if (option) {
          total += option.price;
        }
      });
      setTotalPrice(total);
    }
  }, [packageData, selectedOptions]);
  
  if (!packageData) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Package not found</h2>
        <p className="mb-8">The package you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="button-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  const handleOptionToggle = (optionId: number) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };
  
  const handleBookNow = () => {
    // Set booking data in context
    setBookingData({
      packageId: packageData.id,
      packageTitle: packageData.title,
      options: selectedOptions.map(optionId => {
        const option = packageData.options.find(opt => opt.id === optionId);
        return {
          id: optionId,
          title: option?.title || '',
          price: option?.price || 0
        };
      }),
      basePrice: packageData.price,
      totalPrice
    });
    
    // Navigate to booking form
    navigate('/booking');
  };
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${packageData.imageLarge || packageData.image})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center text-white">
            <motion.h1 
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {packageData.title}
            </motion.h1>
            <motion.div 
              className="flex justify-center mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-secondary font-bold">Formule {packageData.id}</div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Package Info */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-8/12">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="font-display text-3xl font-bold mb-6 text-gray-800">Overview</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col items-center justify-center p-4 bg-desert-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <div className="text-gray-600 font-medium">{packageData.duration}</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-desert-50 rounded-lg">
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <div className="text-gray-600 font-medium">{packageData.groupSize}</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-desert-50 rounded-lg">
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <div className="text-gray-600 font-medium">{packageData.departureTime}</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-desert-50 rounded-lg">
                  <MapPin className="h-8 w-8 text-primary mb-2" />
                  <div className="text-gray-600 font-medium">{packageData.location}</div>
                </div>
              </div>
              
              <h3 className="font-bold text-xl mb-4 text-gray-800">Description</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{packageData.fullDescription || packageData.description}</p>
              
              <h3 className="font-bold text-xl mb-4 text-gray-800">What's Included</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                {packageData.included.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              {packageData.itinerary && (
                <>
                  <h3 className="font-bold text-xl mb-4 text-gray-800">Itinerary</h3>
                  <div className="mb-8">
                    {packageData.itinerary.map((day, index) => (
                      <div key={index} className="mb-6">
                        <h4 className="font-bold text-lg text-primary mb-2">Day {index + 1}: {day.title}</h4>
                        <p className="text-gray-700 mb-4">{day.description}</p>
                        
                        {day.activities && (
                          <ul className="ml-6 space-y-2">
                            {day.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-secondary flex-shrink-0"></div>
                                <span className="text-gray-600">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Gallery */}
            {packageData.gallery && packageData.gallery.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="font-display text-3xl font-bold mb-6 text-gray-800">Gallery</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {packageData.gallery.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${packageData.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Booking Sidebar */}
          <div className="md:w-4/12">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-display text-2xl font-bold mb-4 text-gray-800">Book This Package</h3>
              
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="text-gray-600 mb-1">Base Price</div>
                <div className="text-3xl font-bold text-secondary">{packageData.price} DT</div>
                <div className="text-sm text-gray-500">Per person</div>
              </div>
              
              {/* Options Selection */}
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-3 text-gray-800">Add-on Options</h4>
                
                {packageData.options.map(option => (
                  <div key={option.id} className="mb-4 py-3 px-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`option-${option.id}`}
                          checked={selectedOptions.includes(option.id)}
                          onChange={() => handleOptionToggle(option.id)}
                          className="w-4 h-4 rounded accent-secondary mr-3"
                        />
                        <label htmlFor={`option-${option.id}`} className="font-medium cursor-pointer">{option.title}</label>
                      </div>
                      <div className="font-bold text-primary">+{option.price} DT</div>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{option.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Total Price */}
              <div className="mb-6 pb-4 border-t border-b border-gray-200 py-4">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Total Price:</div>
                  <div className="text-2xl font-bold text-secondary">{totalPrice} DT</div>
                </div>
              </div>
              
              <button 
                onClick={handleBookNow}
                className="button-primary w-full flex items-center justify-center gap-2"
              >
                <span>Book Now</span>
                <ChevronsRight className="h-5 w-5" />
              </button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                No payment required now. You'll complete payment after reservation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;