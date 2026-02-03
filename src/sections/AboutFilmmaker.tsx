import { useEffect, useRef, useState } from 'react';
import { Youtube, Instagram, Send, Quote, Music } from 'lucide-react';

export default function AboutFilmmaker() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@LehmannsWeltreise', label: 'YouTube' },
    { icon: Instagram, href: 'https://instagram.com/herrlehmannsweltreise', label: 'Instagram' },
    { icon: Send, href: 'https://t.me/c/3676684476/82', label: 'Telegram' },
    { icon: Music, href: 'https://distrokid.com/hyperfollow/frox1/frox-is-born', label: 'Musik' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="filmmaker"
      className="relative w-full py-20 lg:py-32 bg-film-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 
              className={`font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-film-dark uppercase mb-2 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'
              }`}
            >
              Martin Zech
            </h2>
            <p 
              className={`font-oswald font-normal text-xl sm:text-2xl text-film-orange mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Filmemacher & LebensKünstler
            </p>

            <div 
              className={`space-y-4 mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <p className="text-film-dark/80 text-lg leading-relaxed">
                Aus 12 Jahren Reisefilmmaterial einer fahrenden Wohnung zwischen Wüste, brandenburgischem Waldgarten, und der Frage, was es bedeutet, den eigenen Träumen zu folgen, erarbeitet der selbsternannte Hauptdarsteller ein bewegtes Puzzle seiner Zeit.
              </p>
            </div>

            {/* Quote */}
            <div 
              className={`relative bg-film-dark p-6 mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <Quote className="absolute top-4 left-4 w-8 h-8 text-film-orange/30" />
              <blockquote className="relative z-10 text-white text-lg italic pl-8">
                "Ein Film als Statement für Freiwilligkeit & Vertrauen. Für Miteinander. 
                Für Menschlichkeit über Grenzen hinweg."
              </blockquote>
              <p className="relative z-10 text-film-orange text-right mt-4 font-oswald">
                — Ein Herzensprojekt
              </p>
            </div>

            {/* Social Links */}
            <div 
              className={`flex gap-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-film-dark flex items-center justify-center text-white hover:bg-film-orange hover:scale-110 transition-all duration-300 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Image */}
          <div 
            className={`order-1 lg:order-2 relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="/images/martin-zech.jpg" 
                  alt="Martin Zech - Filmmaker"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-film-orange -z-10" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-film -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
