import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Code Splitting with React.lazy
const Home = lazy(() => import('./pages/Home'));
const Tratamientos = lazy(() => import('./pages/Tratamientos'));
const TratamientoDetail = lazy(() => import('./pages/TratamientoDetail'));
const CasosExito = lazy(() => import('./pages/CasosExito'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const Admin = lazy(() => import('./pages/Admin'));
const Booking = lazy(() => import('./pages/Booking'));

function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center bg-brand-cream/50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-brand-navy border-t-brand-gold rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-brand-navy">Cargando...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tratamientos" element={<Tratamientos />} />
            <Route path="/tratamientos/:id" element={<TratamientoDetail />} />
            <Route path="/casos-de-exito" element={<CasosExito />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/reserva-hora" element={<Booking />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

