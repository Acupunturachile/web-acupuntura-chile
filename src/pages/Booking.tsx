import { MapPin, Clock, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { getWhatsAppEvaluationUrl, getWhatsAppContactUrl } from '../lib/whatsapp';

export default function Booking() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppEvaluationUrl({ name, phone, symptomOrReason: reason });
    window.open(url, '_blank');
  };

  return (
    <div className="w-full bg-brand-cream min-h-screen py-16 md:py-24 px-4 md:px-6">
      <SEO 
        title="Reserva tu Evaluación | Acupuntura Chile - Providencia, La Serena, Talca, Viña del Mar"
        description="Agendar hora para evaluación de acupuntura y medicina tradicional china. Atención personalizada por profesionales kinesiólogos y acupunturistas certificados."
        canonical="https://acupuntura-chile.cl/reserva-hora"
        keywords="Reserva Hora Acupuntura Chile, Agendar Acupuntura Providencia Santiago, Evaluación Acupuntura La Serena Talca Viña del Mar"
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-navy mb-4">Agenda tu evaluación</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Reserva tu evaluación inicial en Acupuntura Chile. Contamos con atención de lunes a sábado.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-cream-dark">
          {/* Left Side: Contact Info & Value Prop */}
          <div className="lg:w-5/12 bg-brand-navy text-white p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
             
             <div className="relative z-10">
               <h3 className="text-2xl font-serif mb-8 text-brand-cream">Nuestras Clínicas</h3>
               
               <ul className="space-y-6 text-white/90">
                 <li className="flex items-start">
                   <div className="bg-brand-gold/20 p-2 rounded-full mr-4 text-brand-gold shrink-0">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div className="space-y-3">
                     <div>
                       <strong className="block mb-1 font-medium text-brand-gold">Providencia, Santiago</strong>
                       Antonio Bellet 77, of. 703<br/>
                       <span className="text-white/70 text-sm">A pasos del Metro Manuel Montt</span>
                     </div>
                     <div>
                       <strong className="block mb-1 font-medium text-brand-gold">La Serena</strong>
                       Exequiel Pl. 2625
                     </div>
                     <div>
                       <strong className="block mb-1 font-medium text-brand-gold">Talca</strong>
                       3 Oriente 1385
                     </div>
                     <div>
                       <strong className="block mb-1 font-medium text-brand-gold">Viña del Mar</strong>
                       10 Norte 875
                     </div>
                   </div>
                 </li>
                 
                 <li className="flex items-start">
                   <div className="bg-brand-gold/20 p-2 rounded-full mr-4 text-brand-gold shrink-0">
                     <Clock className="w-5 h-5" />
                   </div>
                   <div>
                     <strong className="block mb-1 font-medium">Horario de Atención</strong>
                     Lunes a viernes: 9:00 - 20:00<br/>
                     Sábados: 9:00 - 14:00
                   </div>
                 </li>

                 <li className="flex items-start">
                   <div className="bg-brand-gold/20 p-2 rounded-full mr-4 text-brand-gold shrink-0">
                     <Phone className="w-5 h-5" />
                   </div>
                   <div>
                     <strong className="block mb-1 font-medium">Teléfonos</strong>
                     +56 9 3039 5842<br/>
                     +56 9 9163 0166
                   </div>
                 </li>
               </ul>
             </div>

             <div className="mt-12 bg-white/10 rounded-xl p-6 relative z-10 border border-white/10">
               <div className="flex items-center mb-3">
                 <ShieldCheck className="w-6 h-6 text-brand-gold mr-3" />
                 <h4 className="font-semibold text-lg">Garantía de Confianza</h4>
               </div>
               <p className="text-sm text-white/80 leading-relaxed font-light">Evaluación inicial y sin compromiso. Profesionales clínicos certificados.</p>
             </div>
          </div>

          {/* Right Side: Simple form / WA action */}
          <div className="lg:w-7/12 p-10 md:p-12 flex flex-col justify-center">
             <h2 className="text-3xl font-serif text-brand-navy mb-6">Estamos aquí para ayudarte</h2>
             <p className="text-gray-600 mb-8 leading-relaxed">
               Puedes solicitar información o agendar directamente vía WhatsApp, o dejarnos tus datos en el formulario y te contactaremos.
             </p>

             <a href={getWhatsAppContactUrl()} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-xl font-medium flex items-center justify-center transition-colors shadow-lg hover:shadow-xl mb-12 transform hover:-translate-y-1">
               <MessageCircle className="w-6 h-6 mr-3" />
               Necesito información por WhatsApp
             </a>

             <div className="relative">
               <div className="absolute inset-0 flex items-center" aria-hidden="true">
                 <div className="w-full border-t border-gray-200"></div>
               </div>
               <div className="relative flex justify-center text-sm font-medium leading-6">
                 <span className="bg-white px-6 text-gray-400 uppercase tracking-widest">O déjanos tus datos</span>
               </div>
             </div>

             <form className="mt-8 space-y-5" onSubmit={handleSubmitBooking}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-navy mb-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-shadow" 
                    placeholder="Juan Pérez" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-navy mb-1">Teléfono</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-shadow" 
                    placeholder="+56 9 1234 5678" 
                  />
                </div>
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-brand-navy mb-1">Motivo de consulta (Opcional)</label>
                  <textarea 
                    id="reason" 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-shadow resize-none" 
                    placeholder="Ej: Dolor de espalda crónico..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-medium py-4 rounded-lg transition-colors shadow-md mt-2 flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5 text-brand-gold" />
                  Solicitar mi evaluación
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
