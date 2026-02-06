import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Calendar, MapPin, Play } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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
          className={`font-oswald font-normal text-lg sm:text-xl md:text-2xl text-film-yellow mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          Auf der anderen Seite des Fernsehers
        </p>

        {/* Main Title */}
        <h1 
          className={`font-oswald font-bold text-white uppercase tracking-tight leading-tight mb-12 transition-all duration-1000 ${
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

        {/* Trailer Section */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          {/* Trailer Video */}
          <div className="relative mb-8">
            {!isPlaying ? (
              <div className="relative aspect-video overflow-hidden shadow-2xl group cursor-pointer"
                   onClick={() => setIsPlaying(true)}>
                <img 
                  src="/images/trailer-thumb.jpg" 
                  alt="Trailer thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-film flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(241,149,28,0.45)] transition-all duration-300 animate-pulse-scale"
                    aria-label="Play trailer"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-film-dark fill-film-dark ml-1" />
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-film-orange animate-ping opacity-30" />
                  </button>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-6 pb-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-oswald text-lg uppercase tracking-wider text-center">
                    Das Ende vom Tellerrand - Offizieller Trailer
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video overflow-hidden shadow-2xl">
                <iframe 
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/HA9MjXkE5Gg?autoplay=1"
                  title="Das Ende vom Tellerrand - Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </div>

          {/* YouTube Release Info */}
          <div className="text-center mb-6">
            {/* Event Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6 animate-[pulse-strong_2.5s_ease-in-out_infinite]">
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="w-5 h-5 text-film-orange" />
                <span className="font-oswald text-lg">20. Februar 2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5 text-film-orange" />
                <span className="font-oswald text-lg">Schauburg Dresden</span>
              </div>
            </div>

            <p className="text-white/80 mb-6 animate-[pulse-strong_2.5s_ease-in-out_infinite]">
              Der komplette Film erscheint am <strong className="text-film-orange">15. März</strong> auf YouTube
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollToSection('premiere')}
                className="px-8 py-3 bg-gradient-film text-film-dark font-oswald font-bold uppercase tracking-wider hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,149,28,0.35)] transition-all duration-300"
              >
                Tickets Reservieren
              </button>
              <a 
                href="https://www.youtube.com/@LehmannsWeltreise"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 text-white font-oswald uppercase tracking-wider hover:bg-film-orange hover:shadow-[0_12px_30px_rgba(241,149,28,0.35)] transition-all duration-300 border border-white/20"
              >
                <Play className="w-4 h-4" />
                Zum YouTube Kanal
              </a>
            </div>
          </div>
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
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-sm uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce-slow" />
        </button>
      </div>
    </section>
  );
}
