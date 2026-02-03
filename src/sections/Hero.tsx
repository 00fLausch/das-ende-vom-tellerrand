import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-desert.jpg" 
          alt="Desert landscape with expedition vehicle"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-film-dark to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-20 sm:pt-24 md:pt-0">
        {/* Subtitle */}
        <p 
          className={`font-oswald font-normal text-xl sm:text-2xl md:text-3xl text-film-yellow mb-6 sm:mb-8 md:mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          Auf der anderen Seite des Fernsehers
        </p>

        {/* Main Title */}
        <h1 
          className={`font-oswald font-bold text-white uppercase tracking-tight leading-tight mb-8 sm:mb-10 md:mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            fontSize: 'clamp(2.5rem, 10vw, 8rem)',
            transitionDelay: '500ms'
          }}
        >
          <span className="block">Das Ende</span>
          <span className="block text-gradient">vom Tellerrand</span>
        </h1>

        {/* Part indicator */}
        <p 
          className={`font-oswald text-lg sm:text-xl md:text-2xl text-white/80 uppercase tracking-widest mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          Teil 3
        </p>

        {/* Tagline */}
        <p 
          className={`text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          Kein Reisefilm. Auch durch den Iran.
        </p>

        {/* Event Info */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 transition-all duration-1000 animate-[pulse-strong_2.5s_ease-in-out_infinite] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="flex items-center gap-2 text-white/90">
            <Calendar className="w-5 h-5 text-film-orange" />
            <span className="font-oswald text-lg">20. Februar 2026</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-5 h-5 text-film-orange" />
            <span className="font-oswald text-lg">Schauburg Dresden</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <button 
            onClick={() => scrollToSection('premiere')}
            className="relative px-8 py-4 bg-gradient-film text-film-dark font-oswald font-bold uppercase tracking-wider text-lg hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,149,28,0.35)] transition-all duration-300"
          >
            Tickets Reservieren
          </button>
          <button 
            onClick={() => scrollToSection('trailer')}
            className="px-8 py-4 border-2 border-white/50 text-white font-oswald font-bold uppercase tracking-wider text-lg hover:bg-white/10 hover:border-white hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)] transition-all duration-300"
          >
            Trailer Ansehen
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <button 
          onClick={() => scrollToSection('film')}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-sm uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce-slow" />
        </button>
      </div>
    </section>
  );
}
