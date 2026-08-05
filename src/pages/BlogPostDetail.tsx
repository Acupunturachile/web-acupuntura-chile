import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import SEO from '../components/SEO';

export default function BlogPostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    if (!id) return;
    try {
      if (isFirebaseConfigured) {
        const docRef = doc(db, 'blogPosts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        }
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 bg-white">
        <h1 className="text-3xl font-serif text-brand-navy mb-4">Artículo no encontrado</h1>
        <Link to="/blog" className="text-brand-gold hover:underline">Volver al blog</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white pb-24 pt-24 md:pt-32">
      <SEO 
        title={`${post.title} | Blog Acupuntura Chile`}
        description={post.excerpt || (post.content ? post.content.slice(0, 150) : 'Artículo del Blog Clínico de Acupuntura Chile.')}
        canonical={`https://acupuntura-chile.cl/blog/${post.id}`}
        ogImage={post.imageUrl || 'https://acupuntura-chile.cl/og-image.jpg'}
        ogType="article"
        articleSchema={{
          headline: post.title,
          description: post.excerpt || post.title,
          authorName: post.author || 'Equipo Clínico Acupuntura Chile',
          imageUrl: post.imageUrl
        }}
      />
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <Link to="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-navy mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Volver al blog
        </Link>
        
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full mb-4 inline-block">
            {post.category || 'General'}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-brand-navy mt-4 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
            <span>Por <span className="font-medium text-brand-navy">{post.author || 'Equipo Médico'}</span></span>
            {post.createdAt && (
              <>
                <span>•</span>
                <span>{new Date(post.createdAt.toDate ? post.createdAt.toDate() : post.createdAt).toLocaleDateString()}</span>
              </>
            )}
          </div>

          {post.imageUrl && (
            <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto max-h-[450px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Render Markdown Content */}
        <div className="text-gray-700 leading-relaxed font-light">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-2xl md:text-3xl font-serif text-brand-navy font-semibold mt-6 mb-3">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl md:text-2xl font-serif text-brand-navy font-semibold mt-6 mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-serif text-brand-navy font-medium mt-4 mb-2">{children}</h3>,
              p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700 pl-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-700 pl-2">{children}</ol>,
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-brand-gold pl-4 py-1.5 my-4 italic text-gray-600 bg-brand-cream/30 rounded-r-lg">{children}</blockquote>,
              a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline font-medium">{children}</a>,
              strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              hr: () => <hr className="my-6 border-gray-200" />,
            }}
          >
            {post.content || post.excerpt}
          </ReactMarkdown>
        </div>
        
        {/* Placeholder if there's no actual content (for static posts that only have excerpt) */}
        {!post.content && (
          <div className="mt-8 p-6 bg-brand-cream/30 rounded-xl border border-brand-cream-dark text-center">
            <p className="text-gray-600">Este es un artículo de demostración. Su contenido completo aparecería aquí.</p>
          </div>
        )}
      </div>
    </div>
  );
}
