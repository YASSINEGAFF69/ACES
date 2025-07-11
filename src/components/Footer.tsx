import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo className="mb-4" />
            <p className="text-gray-400 mb-4">
              Discover the beauty of Tunisia with ACES. We provide unforgettable adventures
              through the stunning landscapes and rich cultural heritage of Tunisia.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://facebook.com" Icon={Facebook} />
              <SocialLink href="https://instagram.com" Icon={Instagram} />
              <SocialLink href="https://twitter.com" Icon={Twitter} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-bold mb-4 border-b border-gray-700 pb-2">Our Packages</h3>
            <ul className="space-y-2">
              <FooterLink to="/package/1">Southern Tunisia Adventure</FooterLink>
              <FooterLink to="/package/2">Desert Discovery Tour</FooterLink>
              <FooterLink to="/package/3">Cultural Experience</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-bold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/#packages">Packages</FooterLink>
              <FooterLink to="/#destinations">Destinations</FooterLink>
              <FooterLink to="/#experiences">Experiences</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-bold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Avenue Habib Bourguiba, Tunis, Tunisia</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <span className="text-gray-400">+216 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <span className="text-gray-400">info@acestunisia.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ACES Tunisia. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  Icon: React.FC<{ className?: string }>;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, Icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-white transition-all duration-300"
  >
    <Icon className="h-5 w-5" />
  </a>
);

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-400 hover:text-secondary transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

export default Footer;