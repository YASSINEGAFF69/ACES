import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to section if there's a hash in the URL
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // wait for component to render
      }
    }
  }, [location]);

  // Toggle sticky header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleAnchorClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className={`h-12 w-auto ${isScrolled ? 'text-primary' : 'text-primary'}`} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <AnchorLink to="/" label="Home" hash="" isScrolled={isScrolled} />
          <AnchorLink to="/" label="Packages" hash="#packages" isScrolled={isScrolled} />
          <AnchorLink to="/" label="Destinations" hash="#destinations" isScrolled={isScrolled} />
          <AnchorLink to="/" label="Experiences" hash="#experiences" isScrolled={isScrolled} />
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#packages"
            onClick={(e) => handleAnchorClick(e, '#packages')}
            className={`button-primary ${isScrolled ? '' : 'bg-white text-secondary hover:bg-gray-100'}`}
          >
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <MobileAnchorLink label="Home" hash="" />
          <MobileAnchorLink label="Packages" hash="#packages" />
          <MobileAnchorLink label="Destinations" hash="#destinations" />
          <MobileAnchorLink label="Experiences" hash="#experiences" />
          <a
            href="#packages"
            onClick={(e) => handleAnchorClick(e, '#packages')}
            className="button-primary w-full text-center"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
};

// AnchorLink for desktop
const AnchorLink: React.FC<{ to: string; label: string; hash: string; isScrolled: boolean }> = ({
  to,
  label,
  hash,
  isScrolled,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = location.hash === hash;

  return (
    <a
      href={hash || '/'}
      onClick={handleClick}
      className={`relative font-medium transition-colors duration-300 ${
        isActive
          ? 'text-secondary'
          : isScrolled
          ? 'text-gray-800 hover:text-secondary'
          : 'text-white hover:text-secondary'
      }`}
    >
      {label}
      {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary" />}
    </a>
  );
};

// AnchorLink for mobile
const MobileAnchorLink: React.FC<{ label: string; hash: string }> = ({ label, hash }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = location.hash === hash;

  return (
    <a
      href={hash || '/'}
      onClick={handleClick}
      className={`py-2 px-4 font-medium rounded-lg ${
        isActive ? 'bg-primary/10 text-primary' : 'text-gray-800 hover:bg-gray-100'
      }`}
    >
      {label}
    </a>
  );
};

export default Header;
