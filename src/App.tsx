import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import FilmInfo from './sections/FilmInfo';
import Timeline from './sections/Timeline';
import AboutFilmmaker from './sections/AboutFilmmaker';
import RouteMap from './sections/RouteMap';
import Trailer from './sections/Trailer';
import Premiere from './sections/Premiere';
import MusicSection from './sections/Music';
import Support from './sections/Support';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-film-dark">
      <Navigation />
      <main>
        <Hero />
        <FilmInfo />
        <Timeline />
        <AboutFilmmaker />
        <RouteMap />
        <Trailer />
        <Premiere />
        <MusicSection />
        <Support />
      </main>
      <Footer />
    </div>
  );
}

export default App;
