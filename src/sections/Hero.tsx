import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Calendar, MapPin, Play } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTrailerHovered, setIsTrailerHovered] = useState(false);
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
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

      {/* Text Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-32 md:pt-20">
        {/* Subtitle */}
        <p 
          className={`font-oswald font-normal text-base sm:text-lg md:text-2xl text-film-yellow mb-3 sm:mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          Auf der anderen Seite des Fernsehers
        </p>

        {/* Main Title */}
        <h1 
          className={`font-oswald font-bold text-white uppercase tracking-tight leading-tight mb-4 sm:mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            fontSize: 'clamp(2rem, 8vw, 5rem)',
            transitionDelay: '500ms'
          }}
        >
          <span className="block">Das Ende</span>
          <span className="block text-gradient">vom Tellerrand</span>
        </h1>

        {/* Premiere Event Banner */}
        <div 
          className={`mb-10 sm:mb-14 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="font-oswald text-film-orange text-lg sm:text-2xl md:text-3xl uppercase tracking-widest mb-2 sm:mb-3">
            ★ Filmpremiere ★
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10 animate-[pulse-strong_2.5s_ease-in-out_infinite]">
            <div className="flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-film-orange" />
              <span className="font-oswald text-lg sm:text-2xl md:text-3xl">20. Februar 2026</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-film-orange" />
              <span className="font-oswald text-lg sm:text-2xl md:text-3xl">Schauburg Dresden</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section - separate wider container */}
      <div 
        className={`relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 transition-[opacity,transform] duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '700ms', maxWidth: '800px' }}
      >
        {/* Trailer Video */}
        <div 
          className="relative aspect-video overflow-hidden shadow-2xl transition-all duration-300" 
          style={{ 
            border: isPlaying ? 'none' : '4px solid rgba(40, 40, 50, 0.25)',
            borderRadius: '0px',
            boxShadow: '0 0 30px rgba(241, 149, 28, 0.9), 0 0 60px rgba(241, 149, 28, 0.7), 0 0 100px rgba(241, 149, 28, 0.5), 0 0 150px rgba(241, 149, 28, 0.3), inset 0 0 40px rgba(241, 149, 28, 0.25)',
            zIndex: isPlaying ? 20 : 10
          }}
        >
          {/* Thumbnail layer */}
          <div 
            className={`absolute inset-0 group cursor-pointer transition-all duration-300`}
            onClick={() => setIsPlaying(true)}
            onMouseEnter={() => setIsTrailerHovered(true)}
            onMouseLeave={() => setIsTrailerHovered(false)}
            style={{
              filter: isTrailerHovered ? 'brightness(1.08) saturate(1.1)' : 'brightness(1) saturate(1)'
            }}
          >
            <img 
              src="/images/trailer.jpg" 
              alt="Trailer thumbnail"
              className="w-full h-full object-cover transition-transform duration-500"
            />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,0,0,0.45)] transition-all duration-300"
                style={{
                  animation: 'pulse-scale-custom 2.5s ease-in-out infinite',
                  backgroundColor: 'rgba(255, 0, 0, 0.7)'
                }}
                aria-label="Play trailer"
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-full border-2 sm:border-4 animate-ping-slow" 
                     style={{ borderColor: '#CC0000', filter: 'blur(4px)' }} />
              </button>
            </div>
          </div>

          {/* iframe layer */}
          {isPlaying && (
            <iframe 
              src="https://www.youtube.com/embed/sCoBlg0hGME?autoplay=1"
              title="Das Ende vom Tellerrand - Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute"
              style={{
                top: '-1.5%',
                left: '-1.5%',
                width: '103%',
                height: '103%',
                zIndex: 30
              }}
            />
          )}
        </div>

        {/* Tickets Button */}
        <div 
          className={`mt-10 sm:mt-12 md:mt-14 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <a
            href="#premiere"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('premiere');
            }}
            className="inline-block px-6 py-2.5 sm:px-10 sm:py-4 bg-gradient-film text-film-dark font-oswald font-bold text-base sm:text-lg md:text-xl rounded-lg hover:scale-105 transition-all duration-300 animate-flicker"
            style={{ boxShadow: '0 0 15px rgba(241, 149, 28, 0.7), 0 0 25px rgba(241, 149, 28, 0.4)' }}
          >
            TICKETS RESERVIEREN
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1300ms' }}
      >
        <button 
          onClick={() => scrollToSection('film')}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
        >
          <ChevronDown className="w-6 h-6 animate-bounce-slow" />
        </button>
      </div>
    </section>
  );
}
