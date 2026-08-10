import { Treatment, TeamMember, FAQ, SuccessCase, BlogPost, GoogleReview } from '../types';

export const treatments: Treatment[] = [
  {
    id: 'acupuntura',
    title: 'Acupuntura',
    shortDesc: 'Agujas muy finas e indoloras para mejorar la circulación y recuperar el equilibrio natural.',
    description: 'Terapia milenaria originaria de China, con más de 2.500 años de historia, que utiliza agujas muy finas e indoloras insertadas en puntos específicos del cuerpo para estimular el sistema nervioso, mejorar la circulación y favorecer el equilibrio natural del organismo.',
    usedFor: 'Dolor musculoesquelético (lumbar, cervical, articular), migrañas y dolores de cabeza, manejo de estrés y ansiedad, insomnio, y como apoyo en distintas condiciones de salud física y emocional.',
    sessionDesc: 'Comienza con una breve entrevista para conocer tu estado de salud y síntomas. Luego se insertan agujas muy delgadas en puntos específicos; el procedimiento no debería ser doloroso, aunque puede sentirse un leve estímulo al ingresar a la piel.',
    benefits: ['Alivio natural del dolor', 'Mejora de la circulación', 'Relajación profunda', 'Equilibrio energético', 'Apoyo al sistema inmunológico'],
    faqs: [
      {
        q: '¿Duelen las agujas de acupuntura?',
        a: 'No deberían doler. Son muy delgadas y, si bien se siente un leve estímulo al ingresar a la piel, no debería ser doloroso durante la sesión.'
      },
      {
        q: '¿Cuántas sesiones de acupuntura necesito?',
        a: 'En general se agenda con frecuencia de una a dos veces por semana, por un total de 6 a 10 sesiones, ajustado según la gravedad de cada caso.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1542848284-8afa78a08ccb?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'ventosas',
    title: 'Ventosas (Cupping)',
    shortDesc: 'Terapia de succión para liberar tensión muscular y mejorar la circulación.',
    description: 'Práctica terapéutica milenaria de la medicina tradicional china en la que se colocan tazas de vidrio, plástico o bambú sobre la piel, generando un vacío que produce un efecto de succión.',
    usedFor: 'Mejorar la circulación sanguínea local, liberar tensión muscular y favorecer la recuperación de zonas contracturadas, frecuentemente usada como complemento de la acupuntura.',
    sessionDesc: 'Se aplican las ventosas sobre zonas específicas del cuerpo durante minutos determinados, generando un efecto de succión que puede dejar marcas temporales en la piel (normales y esperables).',
    benefits: ['Circulación mejorada', 'Alivio de tensión muscular', 'Complemento ideal para dolor cervical y lumbar', 'Sensación de liviandad post-sesión'],
    faqs: [
      {
        q: '¿Las ventosas dejan marcas en la piel?',
        a: 'Sí, es normal que aparezcan marcas circulares temporales producto de la succión, las cuales desaparecen en pocos días.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'moxibustion',
    title: 'Moxibustión',
    shortDesc: 'Terapia de calor focalizado con artemisa para activar la circulación.',
    description: 'Técnica que utiliza el calor de la combustión de artemisa (hierba de San Juan) aplicado sobre puntos específicos del cuerpo.',
    usedFor: 'Activar la circulación sanguínea, oxigenar la zona tratada y mejorar la sensación general de bienestar; frecuentemente combinada con acupuntura.',
    sessionDesc: 'Se acerca un bastón o cono de artemisa encendido a la zona o punto a tratar, generando una sensación de calor controlado y agradable.',
    benefits: ['Mejora de calidad de vida', 'Refuerzo del sistema inmunológico', 'Complemento del tratamiento de acupuntura'],
    faqs: [
      {
        q: '¿La moxibustión quema la piel?',
        a: 'No. El calor se aplica de forma controlada y a una distancia segura, sin generar quemaduras cuando es realizada por un profesional certificado.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'masaje-tuina',
    title: 'Masaje Tuina',
    shortDesc: 'Masaje terapéutico chino tradicional para aliviar dolores y mejorar la movilidad.',
    description: 'Forma tradicional de masaje terapéutico chino, practicada desde hace más de 2.000 años, que combina manipulaciones manuales, presión, fricción y estiramientos basados en los principios de la medicina tradicional china.',
    usedFor: 'Aliviar tensión muscular, mejorar la circulación y complementar el tratamiento de dolor lumbar, cervical o de origen postural.',
    sessionDesc: 'Manipulaciones vigorosas pero adaptadas a la tolerancia del paciente sobre zonas específicas enfocadas en liberar bloqueos.',
    benefits: ['Circulación mejorada', 'Alivio natural del dolor', 'Relajación', 'Bienestar general'],
    faqs: [],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'auriculoterapia',
    title: 'Auriculoterapia',
    shortDesc: 'Estimulación de puntos en el oído externo para manejar estrés e insomnio.',
    description: 'Técnica terapéutica que estimula puntos específicos del pabellón auricular (oído externo), basada en los principios de la medicina tradicional china.',
    usedFor: 'Apoyo complementario en el manejo de estrés, ansiedad, insomnio, y otras condiciones, frecuentemente combinada con acupuntura corporal.',
    sessionDesc: 'Se identifican puntos reflejos en la oreja y se estimulan usando semillas, balines magnéticos o pequeñas agujas que el paciente puede llevar durante algunos días.',
    benefits: ['Relajación profunda', 'Apoyo emocional', 'Complemento de bajo riesgo a otras terapias'],
    faqs: [
      {
        q: '¿La auriculoterapia sirve para el estrés y la ansiedad?',
        a: 'Sí, muchas personas la utilizan como complemento para favorecer la relajación. La evaluación debe ser realizada por profesionales certificados.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'masoterapia',
    title: 'Masoterapia',
    shortDesc: 'Técnicas manuales para reducir tensión muscular y promover la relajación.',
    description: 'Forma de terapia física que utiliza una variedad de técnicas manuales para aliviar el dolor, reducir la tensión muscular y promover la relajación y el bienestar general.',
    usedFor: 'Complemento de tratamientos de dolor muscular, contracturas y relajación general.',
    sessionDesc: '',
    benefits: [],
    faqs: [],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'quiropraxia',
    title: 'Quiropraxia',
    shortDesc: 'Ajuste y alineación del sistema musculoesquelético y columna vertebral.',
    description: 'Forma de medicina alternativa enfocada en el diagnóstico y tratamiento de trastornos del sistema musculoesquelético, especialmente aquellos que afectan la columna vertebral.',
    usedFor: 'Dolor lumbar, dolor cervical, alteraciones posturales y de movilidad articular.',
    sessionDesc: '',
    benefits: ['Mejora de la movilidad articular', 'Alivio de dolor de columna', 'Complemento ideal con acupuntura y masaje Tuina'],
    faqs: [],
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop'
  }
];

export const team: TeamMember[] = [
  {
    name: 'Julio César Contreras',
    role: 'Kinesiólogo / Acupunturista',
    bio: 'Fundador de Acupuntura Chile, con 15 años de trayectoria combinando kinesiología y acupuntura para el manejo del dolor.',
    image: 'https://images.unsplash.com/photo-1612349317150-e410f624c427?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Héctor Lizama',
    role: 'Químico Farmacéutico / Acupunturista',
    bio: 'Especialista en la integración de tratamientos alopáticos y medicina integrativa.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Gerald Barra',
    role: 'Tecnólogo Médico, Especialista Medicina China',
    bio: 'Experto en Sangría y Acupuntura Tung. Más de 8 años de experiencia.',
    image: 'https://images.unsplash.com/photo-1537368910025-7001c0c20ab5?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Paola Villanueva',
    role: 'Acupunturista y Naturópata',
    bio: 'Especialista enfocada en el abordaje integrativo del cuerpo y control de estrés. Más de 8 años de experiencia.',
    image: 'https://images.unsplash.com/photo-1594824436951-7f12bc58baac?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Jairo Parra',
    role: 'Quiropráctico / Kinesiólogo',
    bio: 'Enfocado en la biomecánica corporal, resolución de dolores agudos de columna y correcciones posturales.',
    image: 'https://images.unsplash.com/photo-1618060932014-4bcd31d53242?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Jocelyn Gallardo',
    role: 'Masoterapeuta y Cosmetóloga',
    bio: 'Manejo de tejido blando, liberación miofascial y estética integral orientada al bienestar.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop'
  }
];

export const faqs: FAQ[] = [
  {
    q: '¿Tiene la acupuntura alguna contraindicación?',
    a: 'No tiene contraindicaciones absolutas, solo precauciones a evaluar caso a caso, las cuales se aclaran en la entrevista inicial.'
  },
  {
    q: '¿Cuántas sesiones son necesarias para un tratamiento de acupuntura?',
    a: 'Generalmente se agenda con una frecuencia de una a dos veces por semana, por un total aproximado de 6 a 10 sesiones según la gravedad del caso.'
  },
  {
    q: '¿Duelen las agujas de acupuntura?',
    a: 'No deberían doler. Son muy delgadas; se siente un leve estímulo al ingresar a la piel, pero no debería ser doloroso durante la sesión.'
  },
  {
    q: '¿Con qué ropa debo asistir a una sesión?',
    a: 'Con ropa cómoda, ya que se estimulan distintos puntos del cuerpo, no siempre relacionados directamente con la zona de dolor.'
  }
];

export const successCases: SuccessCase[] = [
  {
    name: 'Gladys',
    condition: 'Dolor agudo lumbar',
    therapy: 'Acupuntura y Ventosas',
    result: 'Alivio inmediato y recuperación de movilidad.',
    quote: 'El dolor no me dejaba dormir. Tras la primera sesión sentí un alivio que no conseguía con nada más. Recuperé mi calidad de vida.'
  },
  {
    name: 'Yolanda S.',
    condition: 'Estrés Severo y Neuralgia',
    therapy: 'Acupuntura, Moxibustión y Tuina',
    result: 'Mejora sostenida en el tiempo y reducción de estrés.',
    quote: 'La dedicación del equipo es increíble. No solo tratan el dolor, sino que te ayudan a entender de dónde viene y cómo manejarlo a largo plazo.'
  }
];

export const blogPosts: BlogPost[] = [];

export const googleReviews: GoogleReview[] = [
  {
    name: 'Ana Isabel Romero',
    rating: 5,
    datePosted: '2025-12-17',
    text: 'Muy buena experiencia, cada vez que voy a una sesion, salgo como nueva. Tenia muchos dolores de cabeza. Por estres, No podia dormir, ningun remedio me ayudaba, ahora duermo super bien. Ahora, No tomo nada para dormir. Tambien lo recomiendo para los dolores de rodillas . Es genial , porque salgo sin dolor. Muy buena atencion. Es personalizada, Hay que llegar a la hora, porque son puntuales y su agenda es por horario. Muy agradecida Tengo 60 años . Y lo mejor es que te van explicando para que sirve cada punto de nuestro sistema . Lo recomiendo al 100 por ciento.',
    link: 'https://maps.google.com/'
  },
  {
    name: 'Marcela Alejandra Rojas Guerrero',
    rating: 5,
    datePosted: '2026-06-17',
    text: 'Excelente atención..muy recomendado Fácil llegar cerca del metro Me atendió Katherine..',
    link: 'https://maps.google.com/'
  },
  {
    name: 'Miguel Gallardo Leiva',
    rating: 5,
    datePosted: '2026-04-17',
    text: 'Es totalmente necesario para la vida, para recuperar sanar y vivir de una mejor manera, es una sanacion fisica, mayormente mental, espiritual y de descanzo te atienden de primera a tal punto de sentir después de cada terapia un nuevo amanecer. En mi caso me atiendo con la Doctora Paola y ha sido una experiencia totalmente sanadora',
    link: 'https://maps.google.com/'
  },
  {
    name: 'Gislaine Valenzuela',
    rating: 5,
    datePosted: '2026-05-17',
    text: 'Hace más de un año que me atiendo acá con Paola Villanueva, que es una profesional maravillosa, me ha ayudado mucho con mis lesiones de hombro y otras dolencias, y yo siempre la recomiendo a mis conocidos. Espero que muchas personas tengan acceso a recibir esta medicina que realmente es sanadora.',
    link: 'https://maps.google.com/'
  },
  {
    name: 'Danili Universal',
    rating: 5,
    datePosted: '2026-05-17',
    text: 'Vine por primera vez y me realice un masaje de 90 m con Josellyn que fue muy amorosa. El masaje incluyó diversas técnicas de masaje relajajante y descontracturante terminando con un masaje facial y mascarilla facial que me dejó la Piel increíble. 100% recomendado🩷',
    link: 'https://maps.google.com/'
  },
  {
    name: 'Lidia Silva',
    rating: 5,
    datePosted: '2026-06-26',
    text: 'Nueva Vine principalmente por mal dormir, y estrés. Desde la primera sesión se empezaron a sentir las mejoras de manera paulatina. Muy buena profesional Paola, siempre dedicada y atenta a todo durante la consulta. Los masajes y acupuntura son espectaculares en las manos de ella ☺️',
    link: 'https://maps.google.com/'
  },
  {
    name: 'Maria Paz Escalona Orrego',
    rating: 5,
    datePosted: '2026-06-17',
    text: 'Excelente experiencia la atención muy buena y lo mejor que he tenido muy buenos resultados con los masajes y acupuntura los dolores se han pasado bastante',
    link: 'https://maps.google.com/'
  },
  {
    name: 'Aaron Stelingis',
    rating: 5,
    datePosted: '2025-11-17',
    text: 'Recomendado 100% atención integral profesional. Llevo un par de años asistiendo a sesiones y la verdad es que hay un antes y un después cada vez. Hector es sequisimo!',
    link: 'https://maps.google.com/'
  },
  {
    name: 'Gabriela Sagredo',
    rating: 5,
    datePosted: '2025-10-17',
    text: 'Llegué a Acupuntura Chile a través de Instagram, medio por el cual me comuniqué con ellos. Me respondieron con mucha amabilidad y resolvieron todas mis dudas. Decidí asistir porque quería probar nuevas alternativas, y sinceramente, no me arrepiento. Llegué por dolores relacionados con el tracto urinario (trigonitis) y actualmente voy en mi séptima sesión con Gerald, notando grandes y significativas mejoras desde la primera. Además, si durante la sesión surgen otros malestares —como dolores de cabeza o musculares— también son tratados, lo que hace que cada atención sea integral y personalizada. Totalmente recomendado 👌🏻',
    link: 'https://maps.google.com/'
  },
  {
    name: 'Viviana Romero',
    rating: 5,
    datePosted: '2026-01-17',
    text: 'Soy Viviana hace unas semanas me realicé terapias de acupuntura acá..por temas con el estómago y otros ,fue una muy buena experiencia,mis males tares desaparecieron..súper recomendable,Geral fue quien se encargó de dejarme muy bien !!!',
    link: 'https://maps.google.com/'
  },
  {
    name: 'Patricia Ponce',
    rating: 5,
    datePosted: '2026-04-17',
    text: 'Fue muy buena experiencia, encontrarme con este centro médico de acupuntura,muy buena atención ,responsables y con muy buen resultado.',
    link: 'https://maps.google.com/'
  },
  {
    name: 'VICTOR',
    rating: 5,
    datePosted: '2025-10-17',
    text: 'Super bien aconsejable venir si quieres resultados distintos, sobre todo para patologías como el estrés.... Happy 👌👌👌',
    link: 'https://maps.google.com/'
  }
];
