import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import profileData from './data/profile.json';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero data={profileData} />
        <About data={profileData} />
        <Stats data={profileData} />
        <Experience data={profileData} />
        <Education data={profileData} />
        <Skills data={profileData} />
        <Projects data={profileData} />
        <Contact data={profileData} />
      </main>
      <Footer data={profileData} />
    </div>
  );
}
