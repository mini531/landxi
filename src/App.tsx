import { useState, useEffect } from 'react';
import heroImg from './assets/hero.png';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="logo">LANDXI</div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-section animate-fade-in">
          <div className="hero-content">
            <h1 className="hero-title">
              Experience the <span className="text-gradient">Future</span> of landxi
            </h1>
            <p className="hero-subtitle">
              A premium digital landscape designed for performance, elegance, and seamless interaction.
            </p>
            <div className="hero-cta">
              <button className="btn-primary large">Explore Now</button>
              <button className="btn-secondary large">Learn More</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper glass">
              <img src={heroImg} alt="Landxi Hero" className="hero-img" />
              <div className="hero-overlay"></div>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="section-header">
            <h2 className="section-title">Why Choose Landxi?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card glass">
              <div className="feature-icon">⚡</div>
              <h3>Ultra Fast</h3>
              <p>Built with Vite and React for lightning-fast performance.</p>
            </div>
            <div className="feature-card glass">
              <div className="feature-icon">💎</div>
              <h3>Premium Design</h3>
              <p>Stunning visuals with modern glassmorphism and animations.</p>
            </div>
            <div className="feature-card glass">
              <div className="feature-icon">🛡️</div>
              <h3>Secure</h3>
              <p>Robust and scalable architecture for your digital assets.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer glass">
        <div className="footer-content">
          <p>&copy; 2026 Landxi. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Github</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
