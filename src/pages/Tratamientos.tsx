import { Link } from 'react-router-dom';
import { treatments } from '../lib/data';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Tratamientos() {
  return (
    <div className="w-full py-16 md:py-24 px-4 md:px-6 bg-white min-h-screen">
      <SEO 
        title="Tratamientos de Acupuntura y Medicina Tradicional China | Acupuntura Chile"
        description="Conoce nuestros tratamientos clínicos: Acupuntura, Moxibustión, Ventosas (Cupping), Auriculoterapia, Masaje Tuina, Quiropraxia y Electroacupuntura en Providencia, Santiago, La Serena, Talca y Viña del Mar."
        canonical="https://acupuntura-chile.cl/tratamientos"
        keywords="Tratamientos Acupuntura Chile, Moxibustión Chile, Ventosas Cupping, Auriculoterapia Santiago, Masaje Tuina, Quiropraxia Providencia, Electroacupuntura"
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-navy mb-6">Nuestros Tratamientos</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Conoce todas nuestras terapias físicas y energéticas. Brindamos atención personalizada con 15 años de experiencia y un enfoque clínico, integral y basado en evidencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {treatments.map((t) => (
            <div key={t.id} className="group rounded-2xl overflow-hidden border border-brand-cream-dark hover:shadow-xl transition-all duration-300 flex flex-col bg-brand-cream/30">
              <div className="h-56 overflow-hidden relative">
                <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif text-brand-navy mb-3">{t.title}</h3>
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{t.shortDesc}</p>
                <Link to={`/tratamientos/${t.id}`} className="bg-white border border-brand-gold text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300 px-6 py-2.5 rounded-full font-medium inline-flex items-center justify-center self-start">
                  Ver detalles del tratamiento
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold via-brand-navy to-brand-navy pointer-events-none"></div>
           <div className="relative z-10">
              <h2 className="text-3xl font-serif mb-6">¿No sabes qué terapia necesitas?</h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg font-light">Todas nuestras atenciones comienzan con una evaluación inicial. Allí determinaremos el plan de tratamiento adecuado para tu condición.</p>
              <Link to="/reserva-hora" className="inline-flex items-center bg-brand-gold hover:bg-brand-gold-hover text-white px-8 py-4 rounded-full font-medium transition-colors text-lg shadow-lg">
                Agenda tu evaluación <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
