import { useEffect, useRef, useState } from 'react';
import { Clock, Calendar, MapPin, Heart, Play } from 'lucide-react';

export default function Premiere() {
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

  const details = [
    { icon: Calendar, label: 'Premiere', value: '20. Februar 2026' },
    { icon: Clock, label: 'Uhrzeit', value: '19:30 Uhr' },
    { icon: MapPin, label: 'Ort', value: 'Schauburg Dresden' },
    { icon: Heart, label: 'Eintritt', value: 'Auf Spendenbasis' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="premiere"
      className="relative w-full py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/trailer.jpg" 
          alt="Film Poster"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-film-dark via-transparent to-film-dark/50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className={`font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Premiere
          </h2>
          <p 
            className={`text-film-orange text-xl sm:text-2xl font-oswald uppercase tracking-wider transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            ★ DAS ENDE VOM TELLERRAND feiert in der Schauburg Dresden ★
          </p>
        </div>



        {/* Details Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {details.map((detail, index) => (
            <div 
              key={detail.label}
              className={`bg-white/10 backdrop-blur-sm p-6 border border-white/20 text-center transition-all duration-700 hover:bg-white/20 hover:border-film-orange/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-film-orange/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${500 + index * 100}ms`,
                transform: isVisible ? 'rotateY(0deg)' : 'rotateY(-90deg)'
              }}
            >
              <detail.icon className="w-8 h-8 text-film-orange mx-auto mb-3" />
              <p className="text-white/60 text-sm uppercase tracking-wider mb-1">{detail.label}</p>
              <p className="font-oswald font-bold text-white text-lg">{detail.value}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <a 
            href="https://www.youtube.com/watch?v=sCoBlg0hGME"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-film text-film-dark font-oswald font-bold uppercase tracking-wider text-lg hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,149,28,0.35)] transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Trailer ansehen
          </a>
          <a 
            href="#support"
            className="px-8 py-4 border-2 border-white/50 text-white font-oswald font-bold uppercase tracking-wider text-lg hover:bg-white/10 hover:border-white hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-center gap-2"
          >
            Projekt unterstützen
          </a>
        </div>
      </div>
    </section>
  );
}
