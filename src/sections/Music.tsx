import { useEffect, useRef, useState } from 'react';
import { Music, Headphones, Volume2 } from 'lucide-react';

export default function MusicSection() {
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
      id="music"
      className="relative w-full py-20 lg:py-32 bg-film-light overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className={`font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-film-dark uppercase mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Die Musik <span className="text-gradient">zum Film</span>
          </h2>
          <p 
            className={`text-film-dark/60 text-lg max-w-2xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Alles handgemacht. Eigenes Auto, eigene Abenteuer, eigene Filmmusik.
          </p>
        </div>

        {/* Main Content */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Content Box */}
          <div className="bg-white p-8 sm:p-10 shadow-xl border-l-4 border-film-orange">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Small Image */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 overflow-hidden">
                  <img 
                    src="/images/frox.jpg" 
                    alt="frOx - Filmmusik"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative frame */}
                <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-film-orange -z-10" />
              </div>

              {/* Text & Links */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-film-dark/80 text-lg leading-relaxed mb-6">
                  Eigene Filmmusik von <a href="https://youtu.be/Lv0jcF-bQpc" target="_blank" rel="noopener noreferrer" className="font-bold text-film-orange hover:underline">TimeFrog</a> & <a href="https://distrokid.com/hyperfollow/frox1/frox-is-born" target="_blank" rel="noopener noreferrer" className="font-bold text-film-orange hover:underline">frOx</a> auf allen gängigen Kanälen.
                </p>

                {/* Artist Links as simple buttons */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a 
                    href="https://youtu.be/Lv0jcF-bQpc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-film-dark text-white font-oswald uppercase tracking-wider hover:bg-film-orange transition-colors duration-300"
                  >
                    <Headphones className="w-4 h-4" />
                    TimeFrog
                  </a>
                  <a 
                    href="https://distrokid.com/hyperfollow/frox1/frox-is-born"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-film-dark text-film-dark font-oswald uppercase tracking-wider hover:bg-film-dark hover:text-white transition-colors duration-300"
                  >
                    <Music className="w-4 h-4" />
                    frOx
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
