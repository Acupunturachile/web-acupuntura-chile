import { successCases } from '../lib/data';
import { Quote, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import SEO from '../components/SEO';

export default function CasosExito() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-brand-cream min-h-screen pb-24">
      <SEO 
        title="Casos de Éxito y Testimonios de Pacientes | Acupuntura Chile"
        description="Conoce opiniones y casos reales de recuperación en pacientes tratados por dolor crónico, estrés, parálisis facial y migraña en Acupuntura Chile."
        canonical="https://acupuntura-chile.cl/casos-de-exito"
        keywords="Casos de Éxito Acupuntura Chile, Testimonios Acupuntura, Opiniones Pacientes Acupuntura Providencia Santiago"
      />
      <div className="pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-navy mb-6">Historias reales de recuperación</h1>
          <p className="text-lg text-gray-700 leading-relaxed font-light">
            Cada paciente es distinto, y por eso compartimos experiencias reales para que conozcas cómo trabajamos y qué resultados puedes esperar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {successCases.map((c, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-lg transition-shadow border border-brand-cream-dark flex flex-col relative overflow-hidden">
               <Quote className="absolute top-8 right-8 w-24 h-24 text-brand-cream scale-150 -rotate-12 opacity-50 pointer-events-none" />
              
               <div className="mb-8 relative z-10">
                 <p className="text-brand-navy font-serif text-xl md:text-2xl leading-relaxed italic relative z-10">
                   "{c.quote}"
                 </p>
               </div>
               
               <div className="flex-grow"></div>
               
               <div className="border-t border-brand-cream-dark pt-6 mt-6 flex flex-col sm:flex-row sm:items-center justify-between">
                 <div className="flex items-center mb-4 sm:mb-0">
                    <div className="w-14 h-14 bg-brand-navy text-brand-gold rounded-full flex items-center justify-center font-serif text-2xl mr-4 shadow-inner">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy text-lg">{c.name}</h4>
                      <p className="text-sm font-medium text-brand-gold mb-1">{c.condition}</p>
                      <p className="text-xs text-gray-500">Tratamiento: {c.therapy}</p>
                    </div>
                 </div>
                 
                 <Link to="/reserva-hora" className="inline-flex items-center justify-center text-center bg-brand-cream hover:bg-brand-gold text-brand-navy hover:text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
                   Reservar para mi caso
                 </Link>
               </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy text-white rounded-3xl p-10 md:p-14 text-center border-b-4 border-brand-gold">
           <Quote className="w-12 h-12 text-brand-gold mx-auto mb-6" />
           <h2 className="text-2xl md:text-3xl font-serif mb-6 max-w-2xl mx-auto">Revisa más experiencias en nuestras Reseñas de Google</h2>
           <p className="text-white/80 mb-8 max-w-xl mx-auto font-light">Nuestro compromiso con la transparencia se refleja en las opiniones de quienes nos han visitado.</p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://g.page/acupunturachile/review" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-white text-white hover:bg-white hover:text-brand-navy px-8 py-3 rounded-full font-medium transition-colors">
                 Déjanos tu reseña
              </a>
           </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-12 max-w-3xl mx-auto">
          Los resultados pueden variar de un paciente a otro. La evaluación profesional determina el plan de tratamiento adecuado para cada caso particular.
        </p>
      </div>
    </div>
  );
}
