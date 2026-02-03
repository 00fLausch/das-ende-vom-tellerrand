import { useEffect, useRef, useState } from 'react';
import { Youtube, Instagram, Send, Film, Globe, Music, BookOpen, X } from 'lucide-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const quickLinks = [
    { label: 'Filme', href: '#film', icon: Film },
    { label: 'Weltreisen', href: '#route', icon: Globe },
    { label: 'Musik', href: '#', icon: Music },
    { label: 'Unterstützung', href: '#support', icon: BookOpen },
  ];

  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@LehmannsWeltreise', label: 'YouTube' },
    { icon: Instagram, href: 'https://instagram.com/herrlehmannsweltreise', label: 'Instagram' },
    { icon: Send, href: 'https://t.me/c/3676684476/82', label: 'Telegram' },
    { icon: Music, href: 'https://distrokid.com/hyperfollow/frox1/frox-is-born', label: 'Musik' },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-film-dark border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="font-oswald font-bold text-2xl text-white uppercase mb-2">
              Herr Lehmanns Weltreise
            </h3>
            <p className="font-oswald font-normal text-film-orange text-lg mb-4">
              Ist eine LifeArtPerformance des Instituts für Lebenskunst
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              Liebe. Lebe. Reise. Dokumentarfilme aus dem Leben eines Weltenbummlers. 
              Unabhängig produziert & handgemacht.
            </p>
          </div>

          {/* Quick Links */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <h4 className="font-oswald font-bold text-white uppercase tracking-wider mb-6">
              Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="flex items-center gap-2 text-white/60 hover:text-film-orange transition-colors duration-200"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h4 className="font-oswald font-bold text-white uppercase tracking-wider mb-6">
              Folge uns
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 flex items-center justify-center text-white hover:bg-film-orange hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-white/40 text-sm">
                Kontakt:
              </p>
              <a 
                href="mailto:mail@herrlehmanns-weltreise.de"
                className="text-film-orange hover:underline text-sm"
              >
                mail@herrlehmanns-weltreise.de
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-white/40 text-sm">
              © 2026 Herr Lehmanns Weltreise. Alle Rechte vorbehalten.
            </p>
            <p className="text-white/40 text-sm flex items-center justify-center gap-1">
              Webpage Made with <span className="text-film-orange">♥</span> in Dresden by <button onClick={() => setShowContactModal(true)} className="ml-1 hover:opacity-80 transition-opacity duration-200 inline-flex bg-none border-none cursor-pointer p-0">
                <img src="/images/mg.jpg" alt="MG Systems & Services" className="h-5 inline-block" />
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-film-dark border border-white/20 p-8 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-oswald font-bold text-lg">Kontakt</h3>
              <button onClick={() => setShowContactModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-white font-oswald">Mario Enrico Grunert</p>
              <p className="text-white font-oswald">MG Systems & Services</p>
              <a href="mailto:info@mg-systems-services.de" className="text-film-orange hover:underline font-oswald">
                info@mg-systems-services.de
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
