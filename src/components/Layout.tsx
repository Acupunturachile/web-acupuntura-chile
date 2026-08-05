import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getWhatsAppContactUrl } from '../lib/whatsapp';

const Logo = ({ white = false }: { white?: boolean }) => (
  <div className="flex flex-col items-center justify-center leading-none">
    <span className={`font-sans font-medium tracking-[0.25em] text-sm md:text-base ${white ? 'text-white' : 'text-brand-navy'}`}>
      ACUPUNTURA
    </span>
    <span className={`font-handwriting text-3xl md:text-4xl -mt-2 md:-mt-3 ${white ? 'text-white' : 'text-brand-navy'}`}>
      Chile
    </span>
  </div>
);

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Tratamientos', path: '/tratamientos' },
    { name: 'Casos de Éxito', path: '/casos-de-exito' },
    { name: 'Blog Médico', path: '/blog' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      {/* Top Bar - Highlighting Trust & Location */}
      <div className="bg-brand-navy text-white/90 text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> Providencia • La Serena • Talca • Viña del Mar</span>
            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Lun-Vie 9:00-20:00 / Sáb 9:00-14:00</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Phone className="w-3 h-3 mr-1" /> +56 9 3039 5842</span>
            <span className="flex items-center">15 Años de Experiencia</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-brand-cream sticky top-0 z-40 border-b border-brand-cream-dark/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center h-full">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-brand-gold ${
                  location.pathname === link.path ? 'text-brand-gold' : 'text-brand-navy'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/reserva-hora"
              className="bg-brand-gold hover:bg-brand-gold-hover text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm"
            >
              Agenda tu evaluación
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-brand-navy"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t border-brand-cream-dark px-4 py-4 space-y-4 shadow-lg absolute w-full">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-brand-navy font-medium text-lg py-2"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/reserva-hora"
              className="block flex justify-center bg-brand-gold text-white px-6 py-3 rounded-full font-medium mt-4 text-center"
            >
              Agenda tu evaluación
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-navy text-white pt-16 pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-8">
          <div className="md:col-span-1">
            <div className="mb-6"><Logo white /></div>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              15 años ayudando a personas con dolor crónico, estrés y ansiedad a través de un enfoque basado en neurociencia y medicina tradicional china.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-xl text-brand-gold mb-6">Tratamientos</h3>
            <ul className="space-y-3 text-white/80 text-sm">
              <li><Link to="/tratamientos/acupuntura" className="hover:text-brand-gold transition-colors">Acupuntura</Link></li>
              <li><Link to="/tratamientos/ventosas" className="hover:text-brand-gold transition-colors">Ventosas</Link></li>
              <li><Link to="/tratamientos/quiropraxia" className="hover:text-brand-gold transition-colors">Quiropraxia</Link></li>
              <li><Link to="/tratamientos/masaje-tuina" className="hover:text-brand-gold transition-colors">Masaje Tuina</Link></li>
              <li><Link to="/tratamientos" className="hover:text-white transition-colors underline opacity-70">Ver todos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl text-brand-gold mb-6">Clínica</h3>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 shrink-0 text-brand-gold" />
                <span><strong>Providencia:</strong><br/>Antonio Bellet 77, of. 703<br/>(Metro Manuel Montt)</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 shrink-0 text-brand-gold" />
                <span><strong>La Serena:</strong><br/>Exequiel Pl. 2625</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 shrink-0 text-brand-gold" />
                <span><strong>Talca:</strong><br/>3 Oriente 1385</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 shrink-0 text-brand-gold" />
                <span><strong>Viña del Mar:</strong><br/>10 Norte 875</span>
              </li>
              <li className="flex items-center pt-2 border-t border-white/10">
                <Clock className="w-4 h-4 mr-2 text-brand-gold" />
                <span>Lun - Vie: 9:00 - 20:00<br/>Sáb: 9:00 - 14:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl text-brand-gold mb-6">Contacto</h3>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-brand-gold" />
                <span>+56 9 3039 5842</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-brand-gold" />
                <span>+56 9 9163 0166</span>
              </li>
              <li className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-brand-gold" />
                <span>contacto@acupuntura-chile.cl</span>
              </li>
            </ul>
            <div className="mt-8">
              <Link to="/reserva-hora" className="inline-block bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white px-6 py-2 rounded-full font-medium transition-colors text-sm">
                Reserva tu hora
              </Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Acupuntura Chile. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Profesionales Certificados</span>
            <span>Atención Basada en Evidencia</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={getWhatsAppContactUrl('Hola, me gustaría solicitar una evaluación en Acupuntura Chile.')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-brand-navy px-3 py-1.5 rounded shadow-sm text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          ¿En qué te ayudamos?
        </span>
      </a>
    </div>
  );
}
