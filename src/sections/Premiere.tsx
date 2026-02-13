import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Mail, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function Premiere() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tickets: '1',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      console.log('Sending form data:', formData);
      
      const response = await fetch('/api/reserve-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setSubmitMessage({ 
          type: 'success', 
          text: 'Ticket-Reservierung erfolgreich versendet! Du erhältst eine Bestätigungsmail.' 
        });
        // Form zurücksetzen
        setFormData({
          name: '',
          email: '',
          tickets: '1',
          phone: '',
          message: ''
        });
        // Dialog nach 3 Sekunden schließen
        setTimeout(() => {
          setShowDialog(false);
          setSubmitMessage({ type: '', text: '' });
        }, 3000);
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: data.error || 'Fehler beim Versenden der Reservierung' 
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Fehler bei der Communicationsübertragung. Bitte versuche es später erneut.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <DialogContent className="bg-film-dark border-white/20 text-white max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-oswald text-2xl uppercase text-gradient">
              Ticket Reservierung
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Reserviere dein Ticket für die Premiere am 20. Februar 2026
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            {/* Name */}
            <div>
              <label className="block text-white/80 text-sm font-oswald uppercase mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-film-orange focus:outline-none transition-colors"
                placeholder="Dein Name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/80 text-sm font-oswald uppercase mb-2">
                E-Mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-film-orange focus:outline-none transition-colors"
                placeholder="deine@email.de"
              />
            </div>

            {/* Anzahl Tickets */}
            <div>
              <label className="block text-white/80 text-sm font-oswald uppercase mb-2">
                Anzahl Tickets *
              </label>
              <select
                name="tickets"
                value={formData.tickets}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white focus:border-film-orange focus:outline-none transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num} className="bg-film-dark">
                    {num} {num === 1 ? 'Ticket' : 'Tickets'}
                  </option>
                ))}
              </select>
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-white/80 text-sm font-oswald uppercase mb-2">
                Telefon (optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-film-orange focus:outline-none transition-colors"
                placeholder="+49 123 456789"
              />
            </div>

            {/* Nachricht */}
            <div>
              <label className="block text-white/80 text-sm font-oswald uppercase mb-2">
                Nachricht (optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-film-orange focus:outline-none transition-colors resize-none"
                placeholder="Weitere Informationen oder Fragen..."
                rows={3}
              />
            </div>

            {/* Status Message */}
            {submitMessage.text && (
              <div className={`p-3 rounded ${
                submitMessage.type === 'success' 
                  ? 'bg-green-900/30 border border-green-500/50 text-green-300' 
                  : 'bg-red-900/30 border border-red-500/50 text-red-300'
              }`}>
                {submitMessage.text}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 bg-gradient-film text-film-dark font-oswald font-bold uppercase tracking-wider transition-all duration-300 ${
                isSubmitting 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,149,28,0.35)]'
              }`}
            >
              {isSubmitting ? 'Wird versendet...' : 'Ticket reservieren'}
            </button>

            <p className="text-white/40 text-xs text-center">
              * Erforderliche Felder
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
