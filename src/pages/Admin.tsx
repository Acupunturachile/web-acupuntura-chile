import { useState, useEffect } from 'react';
import { auth, db, googleProvider, isFirebaseConfigured, storage } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Trash2, Edit2, Plus, LogOut, AlertCircle, ShieldAlert, CheckCircle2, Image as ImageIcon, Sparkles, Search, Bold, Italic, Heading2, List, Quote, Link as LinkIcon, Eye, FileText, HelpCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ALLOWED_ADMIN_EMAILS = [
  'contacto@acupuntura-chile.cl',
  'm.painecura.g@gmail.com'
];

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Medicina China');
  const [author, setAuthor] = useState('Equipo Acupuntura Chile');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentMode, setContentMode] = useState<'edit' | 'preview'>('edit');

  // Image Upload states
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [imageSourceMode, setImageSourceMode] = useState<'url' | 'upload'>('upload');

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showStatus('error', 'La imagen supera el límite de 5MB.');
      return;
    }

    const storageRef = ref(storage, `blog_images/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading file:', error);
        showStatus('error', 'Error al subir la imagen a Firebase.');
        setUploadProgress(null);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadUrl);
          showStatus('success', 'Imagen subida correctamente.');
        } catch (error) {
          console.error('Error getting download URL:', error);
          showStatus('error', 'Error al obtener la dirección de la imagen.');
        } finally {
          setUploadProgress(null);
        }
      }
    );
  };

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user || !isFirebaseConfigured) return;

    const userEmail = user.email?.toLowerCase() || '';
    const isAuthorized = ALLOWED_ADMIN_EMAILS.includes(userEmail);

    if (!isAuthorized) return;

    // Real-time listener for blog posts
    const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetchedPosts);
    }, (error) => {
      console.error("Error fetching posts:", error);
      showStatus('error', 'Error al sincronizar con Firebase.');
    });

    return () => unsubscribeSnapshot();
  }, [user]);

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in: ", error);
      showStatus('error', 'Error al iniciar sesión con Google.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setPosts([]);
      resetForm();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !excerpt.trim()) {
      showStatus('error', 'Por favor completa todos los campos requeridos (Título, Resumen y Contenido).');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingPost) {
        const postRef = doc(db, 'blogPosts', editingPost.id);
        await updateDoc(postRef, {
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: content.trim(),
          category: category.trim() || 'General',
          author: author.trim() || 'Equipo Médico',
          imageUrl: imageUrl.trim(),
          updatedAt: serverTimestamp()
        });
        showStatus('success', 'Publicación actualizada correctamente.');
      } else {
        await addDoc(collection(db, 'blogPosts'), {
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: content.trim(),
          category: category.trim() || 'General',
          author: author.trim() || 'Equipo Médico',
          imageUrl: imageUrl.trim(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        showStatus('success', 'Nueva noticia publicada correctamente.');
      }
      resetForm();
    } catch (error) {
      console.error("Error saving post: ", error);
      showStatus('error', 'Hubo un error al guardar la noticia en Firebase.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, postTitle: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${postTitle}"?`)) {
      try {
        await deleteDoc(doc(db, 'blogPosts', id));
        showStatus('success', 'Noticia eliminada correctamente.');
        if (editingPost?.id === id) {
          resetForm();
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        showStatus('error', 'No se pudo eliminar la noticia.');
      }
    }
  };

  const startEditing = (post: any) => {
    setEditingPost(post);
    setTitle(post.title || '');
    setExcerpt(post.excerpt || '');
    setContent(post.content || '');
    setCategory(post.category || 'Medicina China');
    setAuthor(post.author || 'Equipo Acupuntura Chile');
    setImageUrl(post.imageUrl || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingPost(null);
    setTitle('');
    setExcerpt('');
    setContent('');
    setCategory('Medicina China');
    setAuthor('Equipo Acupuntura Chile');
    setImageUrl('');
    setContentMode('edit');
  };

  const insertMarkdown = (tag: string) => {
    switch (tag) {
      case 'bold':
        setContent(prev => prev + '**texto en negrita**');
        break;
      case 'italic':
        setContent(prev => prev + '*texto en cursiva*');
        break;
      case 'h2':
        setContent(prev => prev + (prev && !prev.endsWith('\n') ? '\n\n' : '') + '## Título de sección\n');
        break;
      case 'h3':
        setContent(prev => prev + (prev && !prev.endsWith('\n') ? '\n\n' : '') + '### Subtítulo\n');
        break;
      case 'list':
        setContent(prev => prev + (prev && !prev.endsWith('\n') ? '\n\n' : '') + '- Primer elemento\n- Segundo elemento\n');
        break;
      case 'quote':
        setContent(prev => prev + (prev && !prev.endsWith('\n') ? '\n\n' : '') + '> "Cita destacada sobre salud y acupuntura"\n');
        break;
      case 'link':
        setContent(prev => prev + '[Texto del enlace](https://ejemplo.cl)');
        break;
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-24">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-brand-gold mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-brand-navy mb-4">Base de Datos No Configurada</h1>
          <p className="text-gray-600 mb-6">
            La base de datos Firebase no se encuentra vinculada en la configuración.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-24 pb-16">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-brand-gold" />
          </div>
          <h1 className="text-3xl font-serif text-brand-navy mb-3">Panel de Administración del Blog</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Inicia sesión con tu cuenta de Google autorizada para crear, editar o eliminar publicaciones del blog de Acupuntura Chile.
          </p>
          
          <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-cream-dark/60 text-left mb-8 text-xs text-gray-700 space-y-1">
            <span className="font-semibold block text-brand-navy mb-1">Cuentas con acceso administrativo:</span>
            <div className="flex items-center gap-1.5 text-gray-800">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
              contacto@acupuntura-chile.cl
            </div>
            <div className="flex items-center gap-1.5 text-gray-800">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
              m.painecura.g@gmail.com
            </div>
          </div>

          <button 
            onClick={handleLogin}
            className="w-full flex justify-center items-center gap-3 bg-brand-navy text-white px-6 py-3.5 rounded-xl hover:bg-brand-navy-light transition-all font-medium shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Acceder con Google
          </button>
        </div>
      </div>
    );
  }

  const userEmail = user.email?.toLowerCase() || '';
  const isAuthorized = ALLOWED_ADMIN_EMAILS.includes(userEmail);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-24 pb-16">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-red-100 max-w-lg w-full text-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-brand-navy mb-3">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            La cuenta con la que has ingresado (<strong className="text-gray-900">{user.email}</strong>) no dispone de permisos para administrar el blog.
          </p>

          <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-left text-xs text-red-800 mb-6">
            <span className="font-semibold block mb-1">Cuentas autorizadas para el blog:</span>
            <ul className="list-disc list-inside space-y-1">
              <li>contacto@acupuntura-chile.cl</li>
              <li>m.painecura.g@gmail.com</li>
            </ul>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex justify-center items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Salir e intentar con otra cuenta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-brand-navy">Gestión de Blog (Noticias)</h1>
            <p className="text-xs text-gray-500 mt-1">
              Base de datos Firebase habilitada • Admin autorizado
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-gray-400 block">Sesión activa</span>
              <span className="text-xs font-semibold text-brand-navy">{user.email}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs bg-gray-100 text-gray-700 px-3.5 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <LogOut className="w-3.5 h-3.5" /> Salir
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
            {statusMessage.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif text-brand-navy">
                {editingPost ? 'Editar Noticia' : 'Crear Nueva Noticia'}
              </h2>
              {editingPost && (
                <button 
                  onClick={resetForm}
                  className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200"
                >
                  Cancelar Edición
                </button>
              )}
            </div>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Título <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Beneficios de la Acupuntura en el Otoño"
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none text-sm transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Categoría</label>
                  <input 
                    type="text" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Ej: Medicina China"
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Autor</label>
                  <input 
                    type="text" 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Ej: Equipo Médico"
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  Imagen de Portada
                </label>
                <div className="flex border-b border-gray-100 mb-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setImageSourceMode('upload')}
                    className={`pb-2 px-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      imageSourceMode === 'upload'
                        ? 'border-b-2 border-brand-gold text-brand-navy font-bold'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Subir desde PC
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSourceMode('url')}
                    className={`pb-2 px-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      imageSourceMode === 'url'
                        ? 'border-b-2 border-brand-gold text-brand-navy font-bold'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Pegar URL externa
                  </button>
                </div>

                {imageSourceMode === 'upload' ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-brand-gold transition-colors relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploadProgress !== null}
                    />
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="w-8 h-8 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">
                        {uploadProgress !== null ? `Subiendo: ${uploadProgress}%` : 'Arrastra o haz clic para subir una imagen'}
                      </span>
                      <span className="text-xs text-gray-400">Formatos: PNG, JPG, WEBP (Máx: 5MB)</span>
                    </div>
                    {uploadProgress !== null && (
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100 rounded-b-2xl overflow-hidden">
                        <div
                          className="h-full bg-brand-gold transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full border border-gray-200 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none text-sm transition-all"
                    />
                    <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  </div>
                )}

                {imageUrl && (
                  <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-200 h-28 max-w-sm group">
                    <img src={imageUrl} alt="Vista previa de portada" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Resumen o Extracto <span className="text-red-500">*</span>
                </label>
                <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Un breve resumen visible en la lista del blog..."
                  className="w-full border border-gray-200 rounded-xl p-3 h-20 resize-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none text-sm transition-all"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                    Contenido Completo <span className="text-red-500">*</span>
                    <span className="text-[10px] bg-brand-gold/10 text-brand-gold font-bold px-1.5 py-0.5 rounded">Markdown</span>
                  </label>
                  
                  <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setContentMode('edit')}
                      className={`px-2.5 py-1 rounded-md flex items-center gap-1 font-medium transition-colors ${
                        contentMode === 'edit' ? 'bg-white text-brand-navy shadow-xs' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" /> Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => setContentMode('preview')}
                      className={`px-2.5 py-1 rounded-md flex items-center gap-1 font-medium transition-colors ${
                        contentMode === 'preview' ? 'bg-white text-brand-navy shadow-xs' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Vista Previa
                    </button>
                  </div>
                </div>

                {/* Markdown Toolbar */}
                {contentMode === 'edit' && (
                  <div className="flex flex-wrap items-center gap-1 p-1.5 bg-gray-50 border border-b-0 border-gray-200 rounded-t-xl text-gray-700 text-xs">
                    <button
                      type="button"
                      onClick={() => insertMarkdown('bold')}
                      className="p-1.5 rounded hover:bg-white hover:shadow-xs transition-colors"
                      title="Negrita (**texto**)"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('italic')}
                      className="p-1.5 rounded hover:bg-white hover:shadow-xs transition-colors"
                      title="Cursiva (*texto*)"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('h2')}
                      className="p-1.5 rounded hover:bg-white hover:shadow-xs transition-colors font-semibold"
                      title="Título de Sección (## Título)"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('h3')}
                      className="p-1.5 rounded hover:bg-white hover:shadow-xs transition-colors text-xs font-semibold"
                      title="Subtítulo (### Subtítulo)"
                    >
                      H3
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-1" />
                    <button
                      type="button"
                      onClick={() => insertMarkdown('list')}
                      className="p-1.5 rounded hover:bg-white hover:shadow-xs transition-colors"
                      title="Lista con viñetas (- ítem)"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('quote')}
                      className="p-1.5 rounded hover:bg-white hover:shadow-xs transition-colors"
                      title="Cita de texto (> Cita)"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('link')}
                      className="p-1.5 rounded hover:bg-white hover:shadow-xs transition-colors"
                      title="Enlace ([Texto](url))"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {contentMode === 'edit' ? (
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe el artículo usando formato Markdown (Ej: ## Encabezado, **negrita**, - listas...)"
                    className="w-full border border-gray-200 rounded-b-xl rounded-t-none p-3 h-52 resize-y focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none text-sm transition-all font-mono text-gray-800"
                    required
                  />
                ) : (
                  <div className="w-full border border-gray-200 rounded-xl p-4 min-h-[210px] max-h-[300px] overflow-y-auto bg-gray-50/50 text-sm">
                    {content ? (
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => <h1 className="text-xl font-serif text-brand-navy font-bold mt-4 mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-lg font-serif text-brand-navy font-bold mt-3 mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-base font-serif text-brand-navy font-semibold mt-3 mb-1">{children}</h3>,
                          p: ({ children }) => <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3 text-gray-700 pl-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3 text-gray-700 pl-2">{children}</ol>,
                          blockquote: ({ children }) => <blockquote className="border-l-4 border-brand-gold pl-3 py-1 my-3 italic text-gray-600 bg-brand-cream/40 rounded-r-md">{children}</blockquote>,
                          a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-gold underline font-medium">{children}</a>,
                          strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                        }}
                      >
                        {content}
                      </ReactMarkdown>
                    ) : (
                      <p className="text-gray-400 italic text-center pt-8">Escribe algo en el editor para ver la vista previa en formato Markdown.</p>
                    )}
                  </div>
                )}

                <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-brand-gold shrink-0" />
                  Soporta Markdown: <code className="bg-gray-100 px-1 rounded text-gray-700">## Título</code>, <code className="bg-gray-100 px-1 rounded text-gray-700">**negrita**</code>, <code className="bg-gray-100 px-1 rounded text-gray-700">*cursiva*</code>, <code className="bg-gray-100 px-1 rounded text-gray-700">- listas</code>, <code className="bg-gray-100 px-1 rounded text-gray-700">&gt; citas</code>.
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-brand-gold text-white py-3 rounded-xl hover:bg-brand-gold-hover transition-colors font-medium flex justify-center items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Guardando...'
                  ) : editingPost ? (
                    'Actualizar Noticia'
                  ) : (
                    <><Plus className="w-4 h-4"/> Publicar Noticia</>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* List Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-serif text-brand-navy text-lg">
                    Noticias en Firebase ({posts.length})
                  </h3>
                  <p className="text-xs text-gray-500">Sincronización en tiempo real</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-48">
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar noticia..."
                      className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100 max-h-[700px] overflow-y-auto">
                {filteredPosts.length === 0 ? (
                  <div className="p-12 text-center text-gray-500 text-sm">
                    {posts.length === 0 ? (
                      <div className="space-y-2">
                        <p className="font-medium text-gray-700">No hay noticias registradas en Firebase.</p>
                        <p className="text-xs text-gray-500">Utiliza el formulario de la izquierda para publicar la primera noticia en tu blog.</p>
                      </div>
                    ) : (
                      <p>No se encontraron noticias con la búsqueda "{searchTerm}".</p>
                    )}
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <div key={post.id} className="p-5 hover:bg-gray-50/80 flex items-start justify-between gap-4 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] font-bold tracking-wider uppercase text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">
                            {post.category || 'General'}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Reciente'}
                          </span>
                          {post.author && (
                            <span className="text-[11px] text-gray-500">
                              • Por {post.author}
                            </span>
                          )}
                        </div>
                        <h4 className="font-medium text-brand-navy text-base mb-1 truncate">{post.title}</h4>
                        <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button 
                          onClick={() => startEditing(post)}
                          className="p-2 text-brand-navy bg-brand-cream/60 rounded-lg hover:bg-brand-cream transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

