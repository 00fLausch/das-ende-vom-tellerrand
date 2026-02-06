import { useEffect, useRef, useState } from 'react';
import { Car, Film, Monitor, Star, Route } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  link?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: '2012-2014',
    title: 'Erste Weltreise',
    description: 'Nordamerika, Südamerika, Asien mit dem Mitsubishi Van "Herr Lehmann"',
    icon: Car,
    link: 'https://herrlehmanns-weltreise.de/herr-lehmanns-weltreise-auf-4-raedern-um-den-globus-full-movie-90min-roadmovie-vanlife-film/',
  },
  {
    year: '2019',
    title: 'Teil 1 Premiere',
    description: 'IN 927 KM RECHTS - Über 400 Gäste in der Schauburg Dresden',
    icon: Film,
    link: 'https://herrlehmanns-weltreise.de/in-927-km-rechts-teil-1-auf-der-anderen-seite-des-fernsehers/',
  },
  {
    year: '2020',
    title: 'Teil 2 Online',
    description: 'Abfahrt ins Nichts - Premiere fand nur online statt (Corona)',
    icon: Monitor,
    link: 'https://herrlehmanns-weltreise.de/abfahrt-ins-nichts-teil-2-auf-der-anderen-seite-des-fernsehers/',
  },
  {
    year: '2026',
    title: 'Teil 3 Premiere',
    description: 'DAS ENDE VOM TELLERRAND - Zurück im Kino!',
    icon: Star,
    link: '#premiere',
  },
];

export default function Timeline() {
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate line progress
          setTimeout(() => setLineProgress(100), 300);
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
      id="timeline"
      className="relative w-full py-20 lg:py-32 bg-film-dark overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className={`font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Die Reise
          </h2>
          <p 
            className={`text-white/60 text-lg max-w-2xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            30.000 Kilometer. 9 Monate Auszeit. Und was danach geschah. Eine Lebensreise in drei Teilen.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 hidden md:block">
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-film-orange to-film-yellow transition-all duration-1500 ease-out"
              style={{ height: `${lineProgress}%` }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-0">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const Icon = item.icon;

              return (
                <div 
                  key={item.year}
                  className={`relative md:flex md:items-center md:justify-between transition-all duration-1000 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${300 + index * 200}ms`,
                    transform: isVisible 
                      ? 'translateX(0)' 
                      : isLeft ? 'translateX(-50px)' : 'translateX(50px)'
                  }}
                >
                  {/* Content */}
                  <div className={`md:w-5/12 ${isLeft ? 'md:text-right md:pr-12' : 'md:order-3 md:pl-12'}`}>
                    <a 
                      href={item.link}
                      target={item.link?.startsWith('#') ? undefined : '_blank'}
                      rel={item.link?.startsWith('#') ? undefined : 'noopener noreferrer'}
                      onClick={(e) => {
                        if (item.link?.startsWith('#')) {
                          e.preventDefault();
                          const element = document.querySelector(item.link);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                      className={`block bg-white/5 backdrop-blur-sm p-6 border border-white/10 hover:border-film-orange/50 hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-film-orange/10 transition-all duration-300 cursor-pointer ${isLeft ? 'md:ml-auto' : ''}`}
                    >
                      <span className="font-oswald text-film-orange text-xl font-bold">{item.year}</span>
                      <h3 className="font-oswald font-bold text-white text-2xl uppercase mt-2 mb-3">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </a>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex md:order-2 md:w-2/12 md:justify-center md:items-center">
                    <div 
                      className={`relative w-12 h-12 rounded-full bg-gradient-film flex items-center justify-center transition-all duration-500 ${
                        isVisible ? 'scale-100' : 'scale-0'
                      }`}
                      style={{ transitionDelay: `${500 + index * 200}ms` }}
                    >
                      <Icon className="w-6 h-6 text-film-dark" />
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full bg-film-orange animate-ping opacity-30" />
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-5/12 md:order-1" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Durch den Iran Section - integrated */}
        <div className="mt-16 sm:mt-20">
          {/* Content Box with Text */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-8 sm:p-12 lg:p-16 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <div className="min-h-96 flex flex-col items-center justify-center relative z-10">
                <h3 className="font-oswald font-bold text-3xl sm:text-4xl lg:text-5xl uppercase mb-8 text-center">
                  <span 
                    className="text-gradient inline-block"
                    style={{ 
                      clipPath: 'inset(0 100% 0 0)',
                      animation: 'reveal-text 12s steps(26, end) infinite, fade-letters 12s steps(26, end) infinite'
                    }}
                  >
                    ... und was danach geschah
                  </span>
                </h3>
                <div className="space-y-6 max-w-2xl mx-auto text-white/80">
                  <p className="text-lg leading-relaxed text-center">
                    Vom Losgehen und Wiederankommen und der Kunst, verrückt zu werden, um in dieser verrückten Welt nicht verrückt zu werden.
                  </p>
                  <p className="text-lg leading-relaxed text-center">
                    Wenn du magst, dann werde ein Teil dieser abenteuerlichen Reise der zutiefst menschlichen Begegnungen, wo der Weg selbst zum Ziel wird und die Vergänglichkeit sich der Kreativität hingebend, auf die Freiheit verweist, die hinter der nächsten Kurve auf Verwirklichung wartet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            {[
              { value: '30.000', label: 'Kilometer' },
              { value: '9', label: 'Monate Reise' },
              { value: '9', label: 'Jahre Vanlife' },
              { value: '1', label: 'Welt' },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-film-orange/40 hover:shadow-lg hover:shadow-film-orange/10 hover:bg-white/10 cursor-default"
                style={{ transitionDelay: `${900 + index * 100}ms` }}
              >
                <div className="font-oswald font-bold text-3xl sm:text-4xl text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
