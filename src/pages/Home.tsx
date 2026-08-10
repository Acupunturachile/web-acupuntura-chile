import { Link } from 'react-router-dom';
import { ShieldCheck, HeartPulse, UserCheck, ArrowRight, CheckCircle2, ChevronRight, MessageCircle, Star } from 'lucide-react';
import { treatments, faqs, successCases, googleReviews } from '../lib/data';
import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { getWhatsAppEvaluationUrl } from '../lib/whatsapp';

function getRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    if (weeks === 0) return 'Hace unos días';
    if (weeks === 1) return 'Hace 1 semana';
    return `Hace ${weeks} semanas`;
  }
  
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return 'Hace 1 mes';
  if (diffMonths < 12) return `Hace ${diffMonths} meses`;
  
  const diffYears = Math.floor(diffMonths / 12);
  if (diffYears === 1) return 'Hace 1 año';
  return `Hace ${diffYears} años`;
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentReview, setCurrentReview] = useState(0);

  // Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSymptom, setFormSymptom] = useState('');

  const handleHomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppEvaluationUrl({ name: formName, phone: formPhone, symptomOrReason: formSymptom });
    window.open(url, '_blank');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % googleReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // SEO schema setup inside component (typically head but can go here in standard React)
  return (
    <div className="w-full">
      <SEO 
        title="Acupuntura Chile | Centro Clínico de Acupuntura y Medicina Tradicional China"
        description="Acupuntura Chile: Especialistas en manejo de dolor crónico, estrés, fertilidad y salud integrativa con equipo clínico certificado. Sedes en Providencia (Santiago), La Serena, Talca, Viña del Mar y Curicó."
        canonical="https://acupuntura-chile.cl/"
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      {/* Hero Section */}
      <section className="relative bg-brand-navy pt-24 pb-32 px-4 md:px-6 overflow-hidden">
        {/* Video Background */}
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          autoPlay 
          loop 
          muted 
          playsInline 
          src="/video.mp4" 
        />
        {/* Overlay to keep the navy tonality */}
        <div className="absolute inset-0 bg-brand-navy/80 z-0"></div>
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-cream-dark via-brand-navy to-brand-navy pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-brand-cream/10 border border-brand-cream/20 text-brand-cream px-4 py-1.5 rounded-full text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-gold relative">
               <span className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-75"></span>
            </span>
            <span>Clínica de Acupuntura y Medicina China en Chile</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium tracking-tight mb-6 leading-tight">
            Recupera tu bienestar físico y emocional con <span className="text-brand-gold italic">Acupuntura</span> y Medicina China
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-10 leading-relaxed font-light">
            15 años ayudando a personas con dolor crónico, estrés, ansiedad e insomnio a través de un enfoque integrativo y basado en evidencia.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
            <Link to="/reserva-hora" className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-hover text-white px-8 py-4 rounded-full font-medium transition-colors shadow-lg text-lg text-center flex items-center justify-center">
              Agenda tu evaluación
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a href="https://wa.me/56930395842" className="w-full sm:w-auto bg-transparent border-2 border-white/20 hover:border-white text-white px-8 py-4 rounded-full font-medium transition-colors text-lg text-center flex items-center justify-center">
              <MessageCircle className="mr-2 w-5 h-5" />
              Habla por WhatsApp
            </a>
          </div>
          
          <div className="flex flex-wrap items-center justify-center mt-8 gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-brand-gold" /> Evaluación inicial</span>
            <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-brand-gold" /> Sin compromiso</span>
            <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-brand-gold" /> Profesionales certificados</span>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-20 px-4 md:px-6 bg-brand-cream relative pb-24">
        {/* Abstract curve visual */}
        <div className="w-full max-w-4xl mx-auto -mt-36 bg-white rounded-3xl shadow-xl p-8 md:p-14 relative z-20 text-center border-t-4 border-brand-gold">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-6">El problema que resolvemos</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            "No necesitas saber qué es la acupuntura. Necesitas dejar de convivir con el <strong className="text-brand-navy font-semibold">dolor de espalda</strong>, las <strong className="text-brand-navy font-semibold">migrañas que no ceden</strong>, la <strong className="text-brand-navy font-semibold">ansiedad que no te deja dormir</strong> o la tensión que arrastras hace meses. Te ayudamos a entender qué te pasa y cómo podemos acompañarte."
          </p>
          <div className="mt-8">
             <Link to="/tratamientos" className="inline-flex items-center text-brand-gold font-medium hover:text-brand-gold-hover transition-colors">
               Descubre cómo podemos ayudarte <ChevronRight className="w-4 h-4 ml-1" />
             </Link>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-24 px-4 md:px-6 bg-brand-cream-dark/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-4">Cómo trabajamos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Un proceso simple y transparente para iniciar tu camino hacia el bienestar.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-brand-gold/30"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-white border-8 border-brand-cream flex items-center justify-center shadow-lg mb-6 text-brand-gold">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-brand-navy mb-3">1. Evaluación inicial</h3>
              <p className="text-gray-600 leading-relaxed text-sm">Conversamos sobre tu síntoma, historial y objetivos.</p>
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-brand-navy border-8 border-brand-cream flex items-center justify-center shadow-lg mb-6 text-brand-gold">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-brand-navy mb-3">2. Plan personalizado</h3>
              <p className="text-gray-600 leading-relaxed text-sm">Combinamos acupuntura, quiropraxia, ventosas u otras terapias según tu caso.</p>
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-white border-8 border-brand-cream flex items-center justify-center shadow-lg mb-6 text-brand-gold">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-brand-navy mb-3">3. Evolución constante</h3>
              <p className="text-gray-600 leading-relaxed text-sm">Medimos avances sesión a sesión, generalmente entre 6 y 10 sesiones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Grid Preview */}
      <section className="py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-4">Nuestros Tratamientos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16">Terapias complementarias aplicadas por especialistas clínicos con enfoque neurocientífico.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {treatments.slice(0, 8).map((t) => (
              <div key={t.id} className="group rounded-2xl overflow-hidden border border-brand-cream-dark hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-brand-cream/30">
                <div className="h-48 overflow-hidden relative">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-brand-navy/20"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif text-brand-navy mb-2">{t.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 flex-grow">{t.shortDesc}</p>
                  <Link to={`/tratamientos/${t.id}`} className="inline-flex items-center text-brand-gold text-sm font-medium group-hover:text-brand-navy transition-colors">
                    Más información <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Block styled like the poster */}
      <section className="py-16 bg-brand-navy text-white text-center px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif mb-12">Beneficios de nuestros tratamientos</h2>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {['Equilibrio energético', 'Circulación mejorada', 'Relajación profunda', 'Alivio natural del dolor', 'Sistema inmunológico fortalecido', 'Salud holística'].map((b, i) => (
               <div key={i} className="flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                   <CheckCircle2 className="w-8 h-8 text-brand-gold" />
                 </div>
                 <span className="text-sm font-medium tracking-wide uppercase opacity-90">{b}</span>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-navy text-center mb-16">Historias reales de recuperación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successCases.map((c, i) => (
              <div key={i} className="bg-brand-cream/30 p-8 md:p-10 rounded-2xl border border-brand-cream-dark">
                <p className="text-brand-navy font-serif text-lg mb-6 leading-relaxed italic">"{c.quote}"</p>
                <div className="flex items-center">
                   <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold font-serif text-xl mr-4">
                     {c.name.charAt(0)}
                   </div>
                   <div>
                     <h4 className="font-semibold text-brand-navy">{c.name}</h4>
                     <p className="text-xs text-gray-500">Tratamiento para: {c.condition}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Carousel */}
      <section className="py-16 bg-gray-50 px-4 md:px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
             </div>
             <span className="font-bold text-gray-800 text-xl">5.0</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-2">Lo que dicen nuestros pacientes en Google</h2>
          <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline text-sm mb-12 inline-block">
             Ver todas las opiniones en Google Maps
          </a>

          <div className="relative h-[42rem] sm:h-[32rem] md:h-[28rem] lg:h-[24rem] flex items-center justify-center overflow-visible">
            {googleReviews.map((review, i) => (
              <div 
                key={i} 
                className={`absolute w-full transition-all duration-700 ease-in-out ${i === currentReview ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 -z-10 pointer-events-none'}`}
              >
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 inline-block w-full max-w-2xl mx-auto text-left relative">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                           {review.name.charAt(0)}
                        </div>
                        <div>
                           <div className="font-semibold text-gray-900">{review.name}</div>
                           <div className="text-xs text-gray-500">{getRelativeTime(review.datePosted)}</div>
                        </div>
                     </div>
                     <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                     </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed text-sm md:text-base">"{review.text}"</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-2">
             {googleReviews.map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => setCurrentReview(i)}
                 className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentReview ? 'bg-brand-gold' : 'bg-gray-300'}`}
                 aria-label={`Ver comentario ${i + 1}`}
               />
             ))}
          </div>
        </div>
      </section>

      {/* FAQ Block (GEO optimized) */}
      <section className="py-24 px-4 md:px-6 bg-brand-cream-dark/20 text-left">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-4">Preguntas Frecuentes</h2>
            <p className="text-gray-600">Aclaramos tus dudas clave antes de tu evaluación.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-brand-cream-dark overflow-hidden">
                <button 
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-brand-navy pr-8">{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-brand-gold transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Contact Form / Map section */}
      <section className="py-24 bg-white px-4 md:px-6 border-b border-brand-cream-dark">
        <div className="max-w-6xl mx-auto bg-brand-navy rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-gold via-brand-navy to-brand-navy pointer-events-none"></div>
          
          <div className="p-10 md:p-16 text-white w-full md:w-1/2 relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-brand-cream">Reserva tu evaluación</h2>
            <p className="text-white/80 mb-8 leading-relaxed font-light">
              Déjanos tus datos o cuéntanos qué te ocurre. Nos pondremos en contacto contigo a la brevedad para coordinar tu cita en nuestras clínicas.
            </p>
            
            <form className="space-y-4" onSubmit={handleHomeSubmit}>
              <input 
                type="text" 
                placeholder="Tu Nombre" 
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-gold transition-colors" 
              />
              <input 
                type="tel" 
                placeholder="Tu Teléfono (ej. +56 9...)" 
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-gold transition-colors" 
              />
              <textarea 
                placeholder="Cuéntanos brevemente tu síntoma o condición" 
                value={formSymptom}
                onChange={(e) => setFormSymptom(e.target.value)}
                rows={3} 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-gold transition-colors resize-none"
              ></textarea>
              <button type="submit" className="w-full bg-brand-gold hover:bg-brand-gold-hover text-white font-medium py-3.5 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2 shadow-md">
                <MessageCircle className="w-5 h-5" />
                Solicitar evaluación
              </button>
            </form>
          </div>
          
          <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-200 relative grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             {/* Map placeholder -> typically an iframe Google Maps. Just using an image placeholder for aesthetic safety */}
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="Mapa Ubicación" className="w-full h-full object-cover" />
             <div className="absolute bottom-6 right-6 bg-white p-5 rounded-xl shadow-xl z-20 hidden md:block">
               <div className="font-semibold text-brand-navy mb-3 text-base">Nuestras Clínicas</div>
               <div className="space-y-3">
                 <div>
                   <div className="font-medium text-sm text-gray-800">Providencia, Santiago</div>
                   <div className="text-xs text-gray-600">Antonio Bellet 77, of. 703</div>
                 </div>
                 <div>
                   <div className="font-medium text-sm text-gray-800">La Serena</div>
                   <div className="text-xs text-gray-600">Exequiel Pl. 2625</div>
                 </div>
                 <div>
                   <div className="font-medium text-sm text-gray-800">Talca</div>
                   <div className="text-xs text-gray-600">3 Oriente 1385</div>
                 </div>
                 <div>
                   <div className="font-medium text-sm text-gray-800">Viña del Mar</div>
                   <div className="text-xs text-gray-600">10 Norte 875</div>
                 </div>
                 <div>
                   <div className="font-medium text-sm text-gray-800">Curicó</div>
                   <div className="text-xs text-gray-600">Peña 301 (esq. Villota)</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
