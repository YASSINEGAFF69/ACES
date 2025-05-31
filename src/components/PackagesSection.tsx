import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { packages } from '../data/packages';
import { Calendar, Compass, Users, Clock } from 'lucide-react';

const PackagesSection: React.FC = () => {
  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title inline-block text-center after:left-1/2 after:-translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Travel Packages
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto mt-8 text-lg text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose from our carefully crafted packages to experience the beauty and magic of Southern Tunisia. 
            Each package includes unique experiences and benefits.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} package={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PackageCardProps {
  package: typeof packages[0];
  index: number;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, index }) => {
  return (
    <motion.div
      className="package-card bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="package-image"
        />
        <div className="absolute top-4 right-4 bg-secondary text-white text-sm font-bold px-3 py-1 rounded-full">
          Formule {pkg.id}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-display text-2xl font-bold mb-3">{pkg.title}</h3>
        
        <div className="mb-4 flex flex-wrap gap-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1 text-primary" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1 text-primary" />
            <span>{pkg.groupSize}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Compass className="h-4 w-4 mr-1 text-primary" />
            <span>{pkg.location}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">{pkg.description}</p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-2xl font-bold text-secondary">{pkg.price} DT</p>
          </div>
          <Link 
            to={`/package/${pkg.id}`} 
            className="button-secondary"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PackagesSection;