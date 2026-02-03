import { useEffect, useRef, useState } from 'react';
import { Clock, Calendar, MapPin, Ticket } from 'lucide-react';

export default function FilmInfo() {
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
    { icon: Ticket, label: 'Eintritt', value: 'Auf Spendenbasis' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="film"
      className="relative w-full py-20 lg:py-32 bg-film-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'
            }`}
          >
            <div className="relative overflow-hidden shadow-2xl group transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <img 
                src="/images/filmmaker-portrait.jpg" 
                alt="Filmmaker portrait"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-film opacity-20 -z-10" />
          </div>

          {/* Content */}
          <div>
            <h2 
              className={`font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-film-dark uppercase mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Der Film
            </h2>

            <div 
              className={`space-y-4 mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-film-dark/80 text-lg leading-relaxed">
                Eine Reise durch Asien. Eine Reise durchs Leben. Eine, die nicht endet und eine Geschichte diverser Kulturschocks, die erzählt werden will.
              </p>
              <p className="text-film-dark/80 text-lg leading-relaxed">
                In den vorangegangenen zwei Teilen dieser Filmtrilogie zieht es Martin, Teresa und ihren selbstgebauten Bus MR PINK durch Russland, die Mongolei, bis nach Kasachstan und Kirgistan, um in den Iran zu kommen. Nun sind einige Jahre vergangen. Wo werden sie landen und mit wem?
              </p>
              <p className="text-film-dark/80 text-lg leading-relaxed">
                Vor sieben Jahren lief der erste Teil der Reisefilmtrilogie auf der großen Leinwand in Dresden. Mit dem zweiten Teil kam Corona und die Premiere fand nur online statt.
              </p>
              <p className="text-film-dark/80 text-lg leading-relaxed">
                <strong className="text-film-orange">DAS ENDE VOM TELLERRAND</strong> feiert am 20. Februar in der Schauburg Dresden Premiere.
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.map((detail, index) => (
                <div 
                  key={detail.label}
                  className={`flex items-center gap-4 p-4 bg-white border-l-4 border-film-orange shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-lg hover:border-film-orange/80 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <detail.icon className="w-6 h-6 text-film-orange flex-shrink-0" />
                  <div>
                    <p className="text-sm text-film-dark/60 uppercase tracking-wider">{detail.label}</p>
                    <p className="font-oswald font-semibold text-film-dark">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
