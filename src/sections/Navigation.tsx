import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Film', href: '#film' },
  { label: 'Reise', href: '#timeline' },
  { label: 'Filmmaker', href: '#filmmaker' },
  { label: 'Route', href: '#route' },
  { label: 'Premiere', href: '#premiere' },
  { label: 'Musik', href: '#music' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-film-dark/95 backdrop-blur-md py-4 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="font-oswald font-bold text-xl text-white uppercase tracking-wider hover:text-film-orange transition-colors"
            >
              <span className="text-film-orange">HERRLEHMANNSWELTREISE</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="relative font-oswald text-sm text-white/80 uppercase tracking-wider hover:text-white transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-film-orange transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#premiere"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#premiere');
                }}
                className="px-4 py-2 bg-gradient-film text-film-dark font-oswald font-bold uppercase text-sm tracking-wider hover:scale-105 transition-transform"
              >
                Tickets
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-film-dark/98 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`font-oswald text-2xl text-white uppercase tracking-wider hover:text-film-orange transition-all duration-500 ${
                isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#premiere"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#premiere');
            }}
            className={`mt-4 px-8 py-3 bg-gradient-film text-film-dark font-oswald font-bold uppercase tracking-wider transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${navLinks.length * 50}ms` }}
          >
            Tickets Reservieren
          </a>
        </div>
      </div>
    </>
  );
}
