import { useEffect, useRef, useState } from 'react';
import { Route } from 'lucide-react';

export default function RouteMap() {
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

  return (
    <section 
      ref={sectionRef}
      id="route"
      className="relative w-full py-20 lg:py-32 bg-film-dark overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-film-dark via-film-dark to-black/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className={`font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Durch den Iran
          </h2>
          <div 
            className={`flex items-center justify-center gap-2 text-film-orange transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Route className="w-6 h-6" />
            <span className="font-oswald text-xl">30.000 Kilometer · 9 Monate Auszeit</span>
          </div>
        </div>

        {/* Map Container */}
        <div 
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Content Box with Text */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-8 sm:p-12 lg:p-16">
            <div className="min-h-96 flex flex-col items-center justify-center">
              <h3 className="font-oswald font-bold text-3xl sm:text-4xl lg:text-5xl text-white uppercase mb-8 text-center">
                <span className="text-gradient">... und was danach geschah</span>
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
              className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10"
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
    </section>
  );
}
