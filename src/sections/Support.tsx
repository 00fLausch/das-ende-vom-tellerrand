import { useEffect, useRef, useState } from 'react';
import { Heart, Target, Users, Film } from 'lucide-react';

// Fundraising Daten Interface
interface FundraisingData {
  raised: number;
  goal: number;
  percentage: number;
  isLoading: boolean;
  error: boolean;
}

export default function Support() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Live Fundraising Daten
  const [fundraising, setFundraising] = useState<FundraisingData>({
    raised: 1631,  // Aktuelle Fallback-Werte
    goal: 1800,
    percentage: 91,
    isLoading: true,
    error: false
  });

  // Funktion zum Abrufen der GoFundMe Daten
  const fetchFundraisingData = async () => {
    setFundraising(prev => ({ ...prev, isLoading: true, error: false }));
    
    try {
      // Fetch from our API instead of directly from GoFundMe
      const response = await fetch('/api/fundraising-data');
      
      if (!response.ok) throw new Error('API fetch failed');
      
      const data = await response.json();
      
      setFundraising({
        raised: data.raised,
        goal: data.goal,
        percentage: data.percentage,
        isLoading: false,
        error: false
      });
      
      // Animiere Progress Bar
      if (isVisible) {
        setTimeout(() => setProgress(data.percentage), 500);
      }
    } catch (error) {
      console.log('Fundraising data fetch failed, using fallback values:', error);
      setFundraising(prev => ({ ...prev, isLoading: false, error: true }));
    }
  };

  // Lade Daten beim ersten Render
  useEffect(() => {
    fetchFundraisingData();
    
    // Aktualisiere alle 2 Minuten
    const interval = setInterval(fetchFundraisingData, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate progress bar mit aktuellen Daten
          setTimeout(() => setProgress(fundraising.percentage), 500);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [fundraising.percentage]);

  return (
    <section 
      ref={sectionRef}
      id="support"
      className="relative w-full py-20 lg:py-32 bg-gradient-to-b from-film-dark to-black overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, white 25%, transparent 25%), linear-gradient(-45deg, white 25%, transparent 25%), linear-gradient(45deg, transparent 75%, white 75%), linear-gradient(-45deg, transparent 75%, white 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Heart 
            className={`w-12 h-12 text-film-orange mx-auto mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
          <h2 
            className={`font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Unterstütze das Projekt
          </h2>
          <p 
            className={`text-white/60 text-lg max-w-2xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Der Film und ich leben von deiner Unterstützung. Ein Film auf Spendenbasis. 
            Frei für alle zu sehen.
          </p>
        </div>

        {/* Progress Section */}
        <div 
          className={`bg-white/5 backdrop-blur-sm p-8 border border-white/10 mb-12 transition-all duration-1000 hover:border-film-orange/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-film-orange" />
              <span className="text-white font-oswald uppercase tracking-wider">Fundraising Ziel</span>
            </div>
            <span className="text-film-orange font-oswald text-xl">
              {fundraising.percentage}% erreicht
              {fundraising.isLoading && <span className="ml-2 text-sm opacity-60">...</span>}
            </span>
          </div>
          
          <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="relative h-full transition-all duration-1500 ease-out rounded-full overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Base Gradient */}
              <div className="absolute inset-0 bg-gradient-film" />
              
              {/* Kontinuierlicher Shine-Effekt von links nach rechts - viel deutlicher */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, transparent 20%, rgba(255,255,255,0.95) 50%, transparent 80%, transparent 100%)',
                  animation: 'shine-sweep 1.5s linear infinite',
                  width: '60%'
                }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-white/60">
            <span>€{fundraising.raised.toLocaleString('de-DE')} gesammelt</span>
            <span>Ziel: €{fundraising.goal.toLocaleString('de-DE')}</span>
          </div>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { 
              icon: Film, 
              title: 'Film finanzieren', 
              description: 'Hilf uns, die Produktionskosten zu decken und den Film für alle zugänglich zu machen.',
              delay: 400
            },
            { 
              icon: Users, 
              title: 'Community', 
              description: 'Werde Teil einer Community von Abenteurern und Filmbegeisterten.',
              delay: 500
            },
            { 
              icon: Heart, 
              title: 'Unabhängigkeit', 
              description: 'Deine Unterstützung ermöglicht unabhängige, werbefreie Filmarbeit.',
              delay: 600
            },
          ].map((card) => (
            <div 
              key={card.title}
              className={`bg-white/5 backdrop-blur-sm p-6 border border-white/10 text-center hover:border-film-orange/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-film-orange/10 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${card.delay}ms` }}
            >
              <card.icon className="w-10 h-10 text-film-orange mx-auto mb-4" />
              <h3 className="font-oswald font-bold text-white text-xl uppercase mb-3">{card.title}</h3>
              <p className="text-white/60">{card.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <a 
            href="https://www.gofundme.com/f/auf-der-anderen-seite-des-fernsehers-teil-3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-film text-film-dark font-oswald font-bold uppercase tracking-wider text-lg hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,149,28,0.35)] transition-all duration-300"
          >
            <Heart className="w-5 h-5" />
            Zum Fundraising
          </a>
          <p className="text-white/40 text-sm mt-4">
            Jeder Beitrag zählt - Danke für deine Unterstützung!
          </p>
        </div>
      </div>
    </section>
  );
}
