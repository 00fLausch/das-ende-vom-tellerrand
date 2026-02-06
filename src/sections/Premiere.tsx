import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Mail, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function Premiere() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
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
    { icon: Calendar, label: 'Datum', value: '20. Februar 2026' },
    { icon: Clock, label: 'Uhrzeit', value: '19:30 Uhr' },
    { icon: MapPin, label: 'Ort', value: 'Filmtheater Schauburg Dresden' },
    { icon: Users, label: 'Plätze', value: '400 verfügbar' },
  ];

  return (
    <>
      <section 
        ref={sectionRef}
        id="premiere"
        className="relative w-full py-20 lg:py-32 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/schauburg.jpg" 
            alt="Schauburg Dresden"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
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
              className={`text-white/60 text-lg transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Sei dabei bei der großen Kinopremiere
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
                  transitionDelay: `${300 + index * 100}ms`,
                  transform: isVisible ? 'rotateY(0deg)' : 'rotateY(-90deg)'
                }}
              >
                <detail.icon className="w-8 h-8 text-film-orange mx-auto mb-3" />
                <p className="text-white/60 text-sm uppercase tracking-wider mb-1">{detail.label}</p>
                <p className="font-oswald font-bold text-white text-lg">{detail.value}</p>
              </div>
            ))}
          </div>

          {/* Address */}
          <div 
            className={`text-center mb-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <p className="text-white/80 text-lg">
              Königsbrücker Straße 8, 01097 Dresden
            </p>
            <p className="text-film-orange mt-2">
              Eintritt auf Spendenbasis
            </p>
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <button 
              onClick={() => setShowDialog(true)}
              className="px-8 py-4 bg-gradient-film text-film-dark font-oswald font-bold uppercase tracking-wider text-lg hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,149,28,0.35)] transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Jetzt Ticket reservieren
            </button>
            <a 
              href="https://t.me/+23N8QGXeHmdmOGZi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white/50 text-white font-oswald font-bold uppercase tracking-wider text-lg hover:bg-white/10 hover:border-white hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Telegram Gruppe
            </a>
          </div>
        </div>
      </section>

      {/* Reservation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-film-dark border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-oswald text-2xl uppercase text-gradient">
              Ticket Reservierung
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Reserviere dein Ticket für die Premiere am 20. Februar 2026
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="p-4 bg-white/5 border border-white/10">
              <p className="text-white mb-2">Schicke eine E-Mail an:</p>
              <a 
                href="mailto:mail@herrlehmanns-weltreise.de"
                className="text-film-orange font-oswald text-lg hover:underline"
              >
                mail@herrlehmanns-weltreise.de
              </a>
            </div>
            
            <div className="text-white/60 text-sm">
              <p>Bitte gib folgende Informationen an:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Name</li>
                <li>Anzahl der Tickets</li>
                <li>Telefonnummer (optional)</li>
              </ul>
            </div>

            <p className="text-film-yellow text-sm">
              Wir haben 400 Plätze verfügbar. First come, first served!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
