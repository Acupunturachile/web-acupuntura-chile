import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import SEO from '../components/SEO';

export default function Blog() {
  const [firebasePosts, setFirebasePosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirebaseConfigured) {
      fetchFirebasePosts();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchFirebasePosts = async () => {
    try {
      const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFirebasePosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white pb-24">
      <SEO 
        title="Blog de Medicina China, Acupuntura y Salud Integral | Acupuntura Chile"
        description="Noticias, artículos clínicos y guías sobre medicina tradicional china, acupuntura, neurociencia, tratamiento del dolor, nutrición y salud integrativa."
        canonical="https://acupuntura-chile.cl/blog"
        keywords="Blog Acupuntura Chile, Noticias Medicina China, Salud Integral Santiago, Guía Acupuntura Providencia"
      />
      <div className="bg-brand-navy pt-24 pb-20 px-4 md:px-6 mb-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">Blog Médico</h1>
          <p className="text-lg text-white/80 leading-relaxed font-light">
            Artículos sobre acupuntura, medicina china, nutrición y bienestar, escritos por nuestro equipo de especialistas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
          </div>
        ) : firebasePosts.length === 0 ? (
          <div className="bg-brand-cream/30 border border-brand-cream-dark rounded-2xl p-12 text-center max-w-xl mx-auto">
            <p className="text-gray-600 mb-2">Aún no hay publicaciones en el blog.</p>
            <p className="text-xs text-gray-500">Próximamente compartiremos artículos e información sobre medicina china y acupuntura.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {firebasePosts.map((post) => (
              <article key={post.id} className="bg-brand-cream/30 rounded-2xl overflow-hidden border border-brand-cream-dark hover:shadow-lg transition-all duration-300 flex flex-col group">
                {post.imageUrl && (
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                      {post.category || 'General'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif text-brand-navy mb-4 group-hover:text-brand-gold transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="border-t border-brand-cream-dark pt-6 mt-auto">
                    <p className="text-xs text-brand-navy/60 font-medium uppercase mb-4 tracking-wide">{post.author || 'Equipo Médico'}</p>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center text-brand-navy font-medium text-sm group-hover:text-brand-gold transition-colors">
                       Leer artículo completo <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
           <h2 className="text-2xl font-serif text-brand-navy mb-4">¿Quieres saber si alguna técnica te puede ayudar?</h2>
           <Link to="/reserva-hora" className="inline-flex items-center bg-brand-gold hover:bg-brand-gold-hover text-white px-8 py-3 rounded-full font-medium transition-colors">
              Agenda tu evaluación <ChevronRight className="w-4 h-4 ml-1" />
           </Link>
        </div>
      </div>
    </div>
  );
}
