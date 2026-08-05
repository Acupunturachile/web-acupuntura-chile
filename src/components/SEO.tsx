import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  faqSchema?: Array<{ question: string; answer: string }>;
  articleSchema?: {
    headline: string;
    description: string;
    datePublished?: string;
    authorName?: string;
    imageUrl?: string;
  };
}

export default function SEO({
  title = 'Acupuntura Chile | Clínica de Acupuntura y Medicina China Tradicional',
  description = 'Clínica líder de Acupuntura y Medicina Tradicional China en Chile. Tratamientos para dolor crónico, estrés, ansiedad, fertilidad y migraña en Providencia (Santiago), La Serena, Talca, Viña del Mar y Curicó.',
  keywords = 'Acupuntura Chile, Acupuntura Providencia, Acupuntura Santiago, Medicina China Chile, Tratamiento Dolor Crónico, Acupuntura Estrés Ansiedad, Acupuntura Fertilidad, Acupuntura La Serena, Acupuntura Talca, Acupuntura Viña del Mar, Acupuntura Curicó',
  canonical = 'https://acupuntura-chile.cl',
  ogImage = 'https://acupuntura-chile.cl/og-image.jpg',
  ogType = 'website',
  faqSchema,
  articleSchema,
}: SEOProps) {
  const siteTitle = title.includes('Acupuntura Chile') ? title : `${title} | Acupuntura Chile`;

  // GEO & Local Business Schema for Santiago/Providencia, La Serena, Talca, Viña del Mar
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    'name': 'Acupuntura Chile',
    'alternateName': 'Clínica de Acupuntura y Medicina China Chile',
    'url': 'https://acupuntura-chile.cl',
    'logo': 'https://acupuntura-chile.cl/logo.png',
    'image': ogImage,
    'description': description,
    'telephone': '+56930395842',
    'priceRange': '$$',
    'medicalSpecialty': [
      'Acupuncture',
      'TraditionalChineseMedicine',
      'ComplementaryMedicine',
      'PainManagement'
    ],
    'paymentAccepted': 'Efectivo, Transferencia, Tarjeta de Débito, Tarjeta de Crédito',
    'currenciesAccepted': 'CLP',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '09:00',
        'closes': '14:00'
      }
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Antonio Bellet 77, Oficina 703 (Metro Manuel Montt)',
      'addressLocality': 'Providencia',
      'addressRegion': 'Región Metropolitana',
      'postalCode': '7500000',
      'addressCountry': 'CL'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '-33.4258',
      'longitude': '-70.6142'
    },
    'department': [
      {
        '@type': 'MedicalClinic',
        'name': 'Acupuntura Chile - Sede Providencia (Santiago)',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Antonio Bellet 77, of. 703',
          'addressLocality': 'Providencia',
          'addressRegion': 'Región Metropolitana',
          'addressCountry': 'CL'
        },
        'telephone': '+56930395842'
      },
      {
        '@type': 'MedicalClinic',
        'name': 'Acupuntura Chile - Sede La Serena',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Exequiel Pl. 2625',
          'addressLocality': 'La Serena',
          'addressRegion': 'Coquimbo',
          'addressCountry': 'CL'
        },
        'telephone': '+56991630166'
      },
      {
        '@type': 'MedicalClinic',
        'name': 'Acupuntura Chile - Sede Talca',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '3 Oriente 1385',
          'addressLocality': 'Talca',
          'addressRegion': 'Maule',
          'addressCountry': 'CL'
        },
        'telephone': '+56930395842'
      },
      {
        '@type': 'MedicalClinic',
        'name': 'Acupuntura Chile - Sede Viña del Mar',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '10 Norte 875',
          'addressLocality': 'Viña del Mar',
          'addressRegion': 'Valparaíso',
          'addressCountry': 'CL'
        },
        'telephone': '+56930395842'
      },
      {
        '@type': 'MedicalClinic',
        'name': 'Acupuntura Chile - Sede Curicó',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Peña 301 (esq. Villota)',
          'addressLocality': 'Curicó',
          'addressRegion': 'Maule',
          'addressCountry': 'CL'
        },
        'telephone': '+56930395842'
      }
    ]
  };

  // AEO Schema (Answer Engine Optimization - FAQPage)
  const faqJsonLd = faqSchema && faqSchema.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqSchema.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  } : null;

  // Article Schema
  const articleJsonLd = articleSchema ? {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    'headline': articleSchema.headline,
    'description': articleSchema.description,
    'datePublished': articleSchema.datePublished || new Date().toISOString(),
    'author': {
      '@type': 'Person',
      'name': articleSchema.authorName || 'Equipo Clínico Acupuntura Chile'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Acupuntura Chile',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://acupuntura-chile.cl/logo.png'
      }
    },
    'image': articleSchema.imageUrl || ogImage
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Acupuntura Chile" />
      <meta property="og:locale" content="es_CL" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data Scripts (SEO, AEO, GEO) */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {faqJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      )}

      {articleJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd)}
        </script>
      )}
    </Helmet>
  );
}
