import { useParams, Navigate, Link } from 'react-router-dom';
import { treatments } from '../lib/data';
import { ArrowLeft, CheckCircle, HelpCircle } from 'lucide-react';
import { useEffect } from 'react';
import SEO from '../components/SEO';

export default function TratamientoDetail() {
  const { id } = useParams();
  const treatment = treatments.find(t => t.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!treatment) {
    return <Navigate to="/tratamientos" replace />;
  }

  return (
    <div className="w-full bg-white pb-24">
      <SEO 
        title={`${treatment.title} | Tratamiento de Acupuntura y Medicina Tradicional China`}
        description={`${treatment.shortDesc} ${treatment.description.slice(0, 120)}...`}
        canonical={`https://acupuntura-chile.cl/tratamientos/${treatment.id}`}
        ogImage={treatment.image}
        ogType="article"
        keywords={`${treatment.title}, Acupuntura Chile, Medicina China, Tratamiento ${treatment.title} Santiago Providencia`}
        articleSchema={{
          headline: `${treatment.title} en Acupuntura Chile`,
          description: treatment.description,
          imageUrl: treatment.image,
          authorName: 'Equipo Clínico Acupuntura Chile'
        }}
        faqSchema={treatment.faqs ? treatment.faqs.map(f => ({ question: f.q, answer: f.a })) : undefined}
      />
      {/* Dynamic Header */}
      <div className="relative pt-24 pb-32 px-4 md:px-6 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <img src={treatment.image} alt="" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Link to="/tratamientos" className="inline-flex items-center text-brand-gold hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver a tratamientos
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            {treatment.title}
          </h1>
          <p className="text-xl text-brand-cream/90 max-w-2xl mx-auto font-light leading-relaxed">
            {treatment.shortDesc}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-brand-cream-dark/50">
          <div className="prose prose-lg prose-blue max-w-none text-gray-700">
            <h2 className="text-2xl font-serif text-brand-navy mb-4">¿Qué es?</h2>
            <p className="mb-8 leading-relaxed">{treatment.description}</p>
            
            <h2 className="text-2xl font-serif text-brand-navy mb-4">¿Para qué se usa?</h2>
            <p className="mb-8 leading-relaxed bg-brand-cream/50 p-6 rounded-xl border-l-4 border-brand-gold">
              {treatment.usedFor}
            </p>
            
            {treatment.sessionDesc && (
              <>
                <h2 className="text-2xl font-serif text-brand-navy mb-4">¿Cómo es una sesión?</h2>
                <p className="mb-8 leading-relaxed">{treatment.sessionDesc}</p>
              </>
            )}

            {treatment.benefits.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-serif text-brand-navy mb-6">Beneficios principales</h2>
                <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0">
                  {treatment.benefits.map((b, i) => (
                    <li key={i} className="flex items-start mb-0">
                      <CheckCircle className="w-6 h-6 text-brand-gold mr-3 shrink-0 flex-none" />
                      <span className="font-medium">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center pt-10 border-t border-brand-cream-dark">
             <Link to="/reserva-hora" className="inline-flex items-center text-center justify-center bg-brand-gold hover:bg-brand-gold-hover text-white px-8 py-4 rounded-full font-medium transition-colors text-lg shadow-lg w-full md:w-auto">
                Agenda tu evaluación
             </Link>
             <p className="text-sm text-gray-500 mt-4">Nuestra evaluación inicial es sin compromiso.</p>
          </div>
        </div>

        {/* FAQs */}
        {treatment.faqs && treatment.faqs.length > 0 && (
          <div className="mt-16 mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-8 text-center">Preguntas Frecuentes sobre {treatment.title}</h2>
            <div className="space-y-6">
              {treatment.faqs.map((faq, i) => (
                <div key={i} className="bg-brand-cream/30 p-6 rounded-xl border border-brand-cream-dark">
                  <h3 className="flex items-start text-lg font-medium text-brand-navy mb-2">
                    <HelpCircle className="w-5 h-5 text-brand-gold mr-2 shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 pl-7 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Schema.org Injection (Example GEO recommendation) */}
      {treatment.faqs && treatment.faqs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": treatment.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      )}
    </div>
  );
}
