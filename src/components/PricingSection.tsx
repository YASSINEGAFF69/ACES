import React from 'react';
import { motion } from 'framer-motion';
import { Check, Timer } from 'lucide-react';

const pricingPlans = [
  {
    name: "PLATINUM PACK",
    description: "Berber tent at îlot Palmier Tozeur",
    prices: {
      single: { original: 1000, discounted: 900 },
      double: { original: 810, discounted: 729 },
      triple: { original: 750, discounted: 675 },
      quadruple: { original: 717, discounted: 645 }
    },
    features: [
      "ACCOMMODATION",
      "TRANSPORT",
      "MEALS MENTIONED",
      "VISITS",
      "PARTIES",
      "ACTIVITIES MENTIONED",
      "TOUR GUIDE",
      "AND COCKTAILS"
    ]
  },
  {
    name: "DIAMOND PACK",
    description: "5 stars hotel Palm Beach Tozeur",
    prices: {
      single: { original: 888, discounted: 799.2 },
      double: { original: 826, discounted: 743.4 },
      triple: { original: 805, discounted: 724.5 }
    },
    features: [
      "ACCOMMODATION",
      "TRANSPORT",
      "MEALS MENTIONED",
      "VISITS",
      "PARTIES",
      "ACTIVITIES MENTIONED",
      "TOUR GUIDE",
      "AND COCKTAILS"
    ]
  },
  {
    name: "VIP PACK",
    description: "Deluxe Garden view Suite at Anantara Sahara Tozeur Resort & Villas",
    prices: {
      single: { original: 1875, discounted: 1687.5 },
      double: { original: 1295, discounted: 1165.5 }
    },
    features: [
      "ACCOMMODATION",
      "TRANSPORT",
      "MEALS MENTIONED",
      "VISITS",
      "PARTIES",
      "ACTIVITIES MENTIONED",
      "TOUR GUIDE",
      "AND COCKTAILS"
    ]
  }
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-20 bg-desert-50">
      <div className="container mx-auto px-4">
        {/* Early Bird Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-secondary text-white rounded-xl p-6 mb-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-primary opacity-10 transform rotate-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Timer className="h-6 w-6" />
              <h3 className="text-2xl font-bold">Early Birds Special Offer!</h3>
            </div>
            <p className="text-xl mb-2">Save 10% on all packages</p>
            <p className="text-sm">Limited time offer for the first 100 bookings</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-primary/10 p-6 text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(plan.prices).map(([type, price]) => (
                    <div key={type} className="text-center p-3 rounded-lg bg-desert-50">
                      <div className="uppercase font-bold mb-2">{type}</div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-500 line-through text-sm">
                          ${price.original}
                        </span>
                        <span className="text-2xl font-bold text-secondary">
                          ${price.discounted}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full button-primary mt-6">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;