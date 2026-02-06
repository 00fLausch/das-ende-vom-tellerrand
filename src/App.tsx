import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import FilmInfo from './sections/FilmInfo';
import Timeline from './sections/Timeline';
import AboutFilmmaker from './sections/AboutFilmmaker';
import RouteMap from './sections/RouteMap';
import Premiere from './sections/Premiere';
import MusicSection from './sections/Music';
import Support from './sections/Support';
import Footer from './sections/Footer';

function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-film-dark overflow-x-hidden">
      <Navigation />
      
      {/* Fixed Vertical Ticket Button - Moved to Navigation */}

      <main>
        <Hero />
        <FilmInfo />
        <Premiere />
        <AboutFilmmaker />
        <Timeline />
        <MusicSection />
        <Support />
      </main>
      <Footer />
    </div>
  );
}

export default App;
