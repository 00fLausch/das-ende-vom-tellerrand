import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

export default function Trailer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  return (
    <section 
      ref={sectionRef}
      id="trailer"
      className="relative w-full py-20 lg:py-32 bg-film-light overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className={`font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-film-dark uppercase mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Trailer
          </h2>
          <p 
            className={`text-film-dark/60 text-lg transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Ein Vorgeschmack auf das Abenteuer
          </p>
        </div>

        {/* Trailer Thumbnail or Video */}
        <div 
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
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

        {/* CTA */}
        <div 
          className={`text-center mt-10 transition-all duration-1000 animate-[pulse-strong_2.5s_ease-in-out_infinite] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-film-dark/60 mb-4">
            Der komplette Film erscheint am <strong className="text-film-orange">15. März</strong> auf YouTube
          </p>
          <a 
            href="https://www.youtube.com/@LehmannsWeltreise"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-film-dark text-white font-oswald uppercase tracking-wider hover:bg-film-orange hover:shadow-[0_12px_30px_rgba(241,149,28,0.35)] transition-all duration-300"
          >
            <Play className="w-4 h-4" />
            Zum YouTube Kanal
          </a>
        </div>
      </div>
    </section>
  );
}
