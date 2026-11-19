import { Injectable, signal, computed } from '@angular/core';
import { Project, DeveloperProfile, WorkExperienceItem, EducationItem, EnterpriseAppDemo } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly profileData = signal<DeveloperProfile>({
    name: 'Alejandro Santiago Mata',
    alias: 'Alex Santiago',
    photoUrl: '/assets/AlexFotoCasual.jpeg',
    title: 'Desarrollador Full Stack & Mobile Engineer',
    secondaryTitle: 'Especialista en Flutter, Sistemas en Tiempo Real & Arquitecturas Cloud',
    location: 'México',
    bio: 'Ingeniero en Sistemas Computacionales egresado del TESH con experiencia profesional en desarrollo Full Stack y móvil en RC Lighting. Especializado en Flutter, arquitecturas reactivas, streaming en tiempo real con NDI/GoPro, renderizado 3D con Three.js, Firebase y desarrollo de productos escalables.',
    githubUrl: 'https://github.com/AlexSantiago25',
    githubUser: 'AlexSantiago25',
    linkedinUrl: 'https://www.linkedin.com/in/alejandro-santiago-mata-003153318',
    email: 'contacto@alexsantiago.dev',
    status: 'Disponible para contratación Full Stack / Mobile',
    skills: [
      {
        category: 'Mobile & Frontend',
        items: ['Flutter 3.9+', 'Dart', 'Angular 21', 'TypeScript', 'Three.js (Render 3D)', 'Material 3', 'Canvas & CustomPainter']
      },
      {
        category: 'Arquitectura & Streaming',
        items: ['NDI Protocol (Video Stream)', 'Body Tracking', 'Riverpod 2.6+', 'Provider', 'Signals', 'Clean Architecture', 'Offline-First']
      },
      {
        category: 'Backend & Cloud DB',
        items: ['Cloud Firestore', 'Firebase Realtime DB', 'Cloud Functions', 'SQLite (sqflite)', 'Node.js', 'REST APIs']
      },
      {
        category: 'Hardware & Integraciones',
        items: ['GoPro API Integration', 'Android Home Widgets', 'Speech-to-Text', 'Optimización Base64', 'Git / CI']
      }
    ]
  });

  private readonly workExperienceData = signal<WorkExperienceItem[]>([
    {
      company: 'RC Lighting',
      role: 'Desarrollador Full Stack',
      period: 'Febrero 2024 – Agosto 2026',
      type: 'Tiempo Completo',
      summary: 'Desarrollo integral de ecosistema móvil, sistemas de streaming de video de baja latencia con cámaras GoPro y software interactivo de renderizado 3D con Three.js y Flutter.',
      achievements: [
        {
          title: 'Ecosistema E-commerce & Rentas',
          description: 'Lideré el desarrollo integral de aplicaciones móviles en Flutter para la venta y alquiler de equipo especializado, optimizando el flujo de conversión y la gestión de membresías.'
        },
        {
          title: 'App Multimedia y Streaming en Tiempo Real',
          description: 'Diseñé e implementé un sistema de transmisión de video de alta calidad e ínfima latencia integrando protocolo NDI con cámaras GoPro, incorporando procesamiento interactivo mediante funciones de Body Tracking.'
        },
        {
          title: 'Simulador y Visualización 3D',
          description: 'Desarrollé un software interactivo de renderizado 3D para la simulación de espacios y luminarias utilizando Three.js y Flutter, permitiendo a los usuarios previsualizar proyectos con alto grado de fidelidad visual.'
        },
        {
          title: 'Arquitectura & Backend',
          description: 'Construí e integré servicios en la nube con Cloud Firestore, Firebase Realtime Database y Cloud Functions, garantizando sincronización de datos en tiempo real y arquitectura backend escalable mediante APIs REST.'
        }
      ],
      technologies: [
        'Flutter',
        'Dart',
        'Three.js (3D)',
        'NDI Protocol',
        'GoPro API',
        'Body Tracking',
        'Cloud Firestore',
        'Firebase Realtime Database',
        'Cloud Functions',
        'APIs REST'
      ]
    }
  ]);

  private readonly educationData = signal<EducationItem[]>([
    {
      institution: 'Tecnológico de Estudios Superiores de Huixquilucan',
      institutionUrl: 'https://teshuixquilucan.edomex.gob.mx/',
      degree: 'Ingeniería en Sistemas Computacionales',
      period: 'Septiembre 2021 – Febrero 2026',
      location: 'Huixquilucan, Estado de México',
      status: 'Egresado',
      highlights: [
        'Formación rigurosa en ingeniería de software, arquitectura de sistemas distribuidos y bases de datos.',
        'Desarrollo de proyectos prácticos orientados a entornos móviles, computación visual y microservicios.'
      ]
    }
  ]);

  private readonly enterpriseDemosData = signal<EnterpriseAppDemo[]>([
    {
      id: 'rc_camera',
      title: 'RC Camera • Mini Estudio Multimedia & Suite para Eventos',
      subtitle: 'Transmisión NDI, Módulos Interactivos de Fiesta, Body Tracking & Control de Cabina 360',
      videos: [
        { url: '/assets/apps_xrc/XRC_RCcamera.mp4', title: 'Módulo Motion FX & Detección de Cuerpo' },
        { url: '/assets/apps_xrc/XRC_RCcamera2.mp4', title: 'Módulo FestCam & Filtros' },
        { url: '/assets/apps_xrc/XRC_RCcamera3.mp4', title: 'Transmisión NDI & Configuración' }
      ],
      videoUrl: '/assets/apps_xrc/XRC_RCcamera.mp4',
      sourceContext: 'Desarrollado para RC Lighting / XRC',
      summary: 'Mini estudio audiovisual modular desarrollado en Flutter para eventos, antros y activaciones de marca. Integra 4 módulos independientes: transmisión NDI profesional con control de FPS/filtros, módulo FestCam para fotos/videos con enlace BLE a Cabina 360 y cámaras GoPro, minijuego interactivo Motion FX con Body Tracking en tiempo real que convierte la pose en un stickman para proyectar en pantallas, y panel de control remoto dedicado para la cabina 360.',
      technicalHighlights: [
        'Módulo NDI Broadcast: Transmisión de ultra baja latencia con C/C++ (libndi.so) y Dart FFI a consolas OBS/vMix, con selector de resolución, ajuste de FPS y filtros de imagen en tiempo real.',
        'Módulo FestCam & Hardware BLE: Modo fiesta para captura de fotos/video con stickers y filtros interactivos; sincronización Bluetooth Low Energy para accionar cabinas 360 de la empresa o disparar cámaras GoPro.',
        'Módulo Motion FX (Minijuego Interactivo NDI): Algoritmo de Body Tracking que detecta la pose humana y renderiza un avatar stickman reactivo a gestos de brazos para proyectar únicamente los gráficos por NDI a pantallas de eventos.',
        'Módulo Booth 360: Control remoto inalámbrico independiente vía BLE para calibrar velocidad, sentido de giro y paradas de la plataforma giratoria 360 sin depender de la cámara.'
      ],
      technologies: [
        'Flutter',
        'Dart FFI',
        'C/C++ (libndi.so)',
        'Protocolo NDI',
        'Body Tracking & Pose ML',
        'Bluetooth Low Energy (BLE)',
        'GoPro BLE API',
        'Hardware Cabina 360'
      ],
      badge: 'Suite Modular & Mini Estudio'
    },
    {
      id: 'xrc_studio',
      title: 'XRC Studio • Simulador 3D de Espacios & Previsualizador',
      subtitle: 'Renderizado 3D Interactivo sin Curva de Aprendizaje: De Tiras LED a Cabinas DJ y Pistas de Baile',
      videos: [
        { url: '/assets/apps_xrc/XRC_XRCStudio.mp4', title: 'Simulación 3D & Haces Volumétricos' },
        { url: '/assets/apps_xrc/XRC_XRCStudio2.mp4', title: 'Secuenciador y Dinámica de Luminarias' }
      ],
      videoUrl: '/assets/apps_xrc/XRC_XRCStudio.mp4',
      sourceContext: 'Desarrollado para RC Lighting / XRC',
      summary: 'Software de escritorio concebido para mostrarle al cliente su espacio real con la iluminación montada antes de realizar la compra o evento. Diseñado para que cualquier persona sin experiencia en modelado 3D lo use con facilidad: los modelos de iluminación vienen prefabricados y, al seleccionar uno, aparece una vista previa translúcida ("fantasmita") para colocarlo, rotarlo y ubicarlo con total precisión sobre pistas de baile, cabinas de DJ, trusses, candiles y tiras LED.',
      technicalHighlights: [
        'Colocación Intuitiva Asistida ("Ghost Preview"): Sistema de raycasting en Three.js que proyecta un fantasmita translúcido del modelo sobre el suelo o estructura, facilitando el diseño de escenarios a usuarios no técnicos.',
        'Biblioteca Prefabricada Integral: Catálogo 3D optimizado que incluye tiras LED, pistas de baile interactivas, cabinas DJ, candiles, cabezas móviles robóticas y estructuras truss con texturas y emisión lumínica en tiempo real.',
        'Validación Visual con el Cliente: Permite previsualizar el ambiente final del evento, antro o residencia, validando la atmósfera lumínica antes del montaje físico.',
        'Línea de Tiempo & Secuenciador Keyframe: Interpolación cinemática Pan & Tilt, dimmer de intensidad, rueda de gobos y paletas de color sincronizadas.'
      ],
      technologies: [
        'Flutter Desktop',
        'Three.js',
        'WebGL 3D Engine',
        'Raycasting & Ghost Placement',
        'Simulación de Iluminación',
        'Keyframe Sequencer',
        'Modelos 3D Prefabricados'
      ],
      badge: 'Simulador 3D & Previsualizador'
    },
    {
      id: 'xrc_app',
      title: 'XRC • E-commerce de Controladores Industriales & DMX',
      subtitle: 'Marketplace Especializado en Interfaces iRC Pulse, PixelBox, XRC NANO y Consolas',
      videos: [
        { url: '/assets/apps_xrc/XRC_XRCApp.mp4', title: 'Catálogo de Controladores & Interfaces' },
        { url: '/assets/apps_xrc/XRC_XRCapp2.mp4', title: 'Navegación & Gestión de Pedidos' }
      ],
      videoUrl: '/assets/apps_xrc/XRC_XRCApp.mp4',
      sourceContext: 'Desarrollado para RC Lighting / XRC',
      summary: 'Plataforma e-commerce móvil (estilo Amazon / Mercado Libre) especializada en la venta de controladores industriales y hardware/software de control para iluminación. Centraliza equipos de gama profesional como interfaces iRC Pulse, controladores PixelBox, consolas All-In-One, interfaces XRC NANO C-DMX, cableado DMX de 5 pines y fuentes de poder.',
      technicalHighlights: [
        'Marketplace Especializado en Hardware DMX: Organización de interfaces industriales (iRC Pulse, PixelBox, XRC NANO, consolas All-In-One) con fichas técnicas y especificaciones de salida.',
        'Sincronización en Tiempo Real: Cloud Firestore y Firebase Realtime Database para actualización instantánea de stock disponible y precios en vivo.',
        'Embudo de Compra Ágil: Carrito persistente, checkout seguro con pasarela de pagos integrada y seguimiento de estado de pedidos para técnicos y empresas de producción.'
      ],
      technologies: [
        'Flutter',
        'Dart',
        'Cloud Firestore',
        'Firebase Realtime DB',
        'Firebase Auth',
        'Cloud Functions',
        'APIs REST',
        'Hardware DMX'
      ],
      badge: 'E-commerce • Controladores & DMX'
    },
    {
      id: 'rc_lighting_app',
      title: 'RC Lighting • Tienda Oficial de Luminarias & Pistas LED',
      subtitle: 'Catálogo de Productos de Fabricación Propia para Eventos, Antros y Hogares',
      videos: [
        { url: '/assets/apps_xrc/XRC_RCLIGHTINGapp.mp4', title: 'Tienda Oficial & Catálogo Interactivo' }
      ],
      videoUrl: '/assets/apps_xrc/XRC_RCLIGHTINGapp.mp4',
      sourceContext: 'Desarrollado para RC Lighting / XRC',
      summary: 'Aplicación móvil de comercio electrónico enfocada en la venta directa de los productos físicos fabricados por RC Lighting. Abarca todo el catálogo de luminarias: pistas de baile interactivas (Infinity, Gold, Silver), candiles y aros LED pixel RGBW, barras LED, tiras de flex neón, módulos LED de alta potencia (10W a 90W) y centros de carga, ofreciendo una experiencia de compra directa y fluida.',
      technicalHighlights: [
        'Catálogo Visual Multi-Categoría: Menú estructurado de luminarios LED, pistas de baile, candiles decorativos, tiras flexibles y circuitos de control con soporte multi-moneda (MXN/USD).',
        'Galerías de Demostración y Especificaciones: Fotos y videos de alta fidelidad que muestran el efecto lumínico real de cada producto para facilitar la decisión de compra de dueños de antros y eventos.',
        'Arquitectura Cloud & Notificaciones Push: Firebase Cloud Messaging para alertas de nuevos lanzamientos de fábrica, promociones y seguimiento post-venta.'
      ],
      technologies: [
        'Flutter',
        'Dart',
        'Cloud Firestore',
        'Firebase Cloud Messaging',
        'Multi-moneda (MXN/USD)',
        'APIs REST',
        'Riverpod'
      ],
      badge: 'Tienda Oficial • Productos Físicos'
    }
  ]);

  private readonly projectsData = signal<Project[]>([
    {
      id: 'anteros',
      title: 'BesMe (Anteros)',
      subtitle: 'Diario Compartido & Complicidad para Parejas',
      tagline: 'Donde dos corazones escriben y dibujan la misma historia',
      category: 'mobile',
      categoryLabel: 'Móvil & Cloud Realtime',
      logoUrl: '/assets/projects/anteros/LogoSinFondo.png',
      coverImage: '/assets/projects/anteros/screenshots/BesMe_MenuPrincipal1.jpg',
      summary: 'Aplicación móvil de conexión íntima para parejas inspirada en el legendario diario de Arthur Morgan & John Marston (Red Dead Redemption 2). Combina caligrafía manuscrita, dibujo vectorial a mano alzada y sincronización en tiempo real.',
      fullOverview: 'BesMe traslada la magia de un diario de memorias viviente a la pareja moderna. A diferencia de apps de notas tradicionales, permite redactar con fuentes manuscritas y lienzos artísticos de dibujo libre. El reto técnico clave consistió en sincronizar trazos vectoriales y notas sin incurrir en costos de Firebase Storage: cada trazo se procesa y comprime como imagen ultra-ligera en Base64 dentro de Cloud Firestore, logrando actualización instantánea y consumo prácticamente nulo.',
      inspiration: 'Inspirado en el inconfundible cuaderno de bocetos y diario de viaje de Red Dead Redemption 2.',
      highlights: [
        'Ingeniería Base64 sin costos de Storage: trazos vectoriales comprimidos directamente en Firestore (Spark Plan Friendly).',
        'Widget Nativo en Pantalla de Inicio: sincronización en vivo mediante home_widget y notificaciones push silenciosas (FCM).',
        'Lienzo de Dibujo Híbrido: CustomPainter optimizado con pincel, pluma de tinta, lápiz y control de grosor.',
        'Arquitectura de Seguridad: Aislamiento estricto de parejas por coupleId con reglas Firestore granulares.'
      ],
      features: [
        {
          title: 'Diario Compartido con Lienzo Híbrido',
          description: 'Textos con tipografías manuscritas y canvas para dibujar libremente en pergaminos rústicos y papel sepia.',
          icon: 'feather'
        },
        {
          title: 'Notas Adhesivas & Android Widget',
          description: 'Pizarra de post-its colaborativa que se refleja al instante en el widget de inicio del celular.',
          icon: 'layout'
        },
        {
          title: 'Toques de Amor & Háptica',
          description: 'Alertas interactivas en vivo con respuesta háptica y animaciones cuando extrañas a tu pareja.',
          icon: 'heart'
        },
        {
          title: 'Planificador de Citas & Wishlist',
          description: 'Ruleta de ideas clasificadas por ambiente, contador de días juntos y listas de deseos sincronizadas.',
          icon: 'calendar'
        }
      ],
      technologies: [
        { name: 'Flutter 3.9+', category: 'core' },
        { name: 'Dart', category: 'core' },
        { name: 'Riverpod 2.6+', category: 'state' },
        { name: 'Cloud Firestore', category: 'database' },
        { name: 'Firebase Auth', category: 'core' },
        { name: 'Firebase Cloud Messaging', category: 'native' },
        { name: 'home_widget (Android)', category: 'native' },
        { name: 'CustomPainter Vectorial', category: 'graphics' }
      ],
      screenshots: [
        {
          url: '/assets/projects/anteros/screenshots/BesMe_MenuPrincipal1.jpg',
          title: 'Menú Principal Bento Grid',
          description: 'Interfaz moderna en formato Bento Grid con acceso rápido a todas las dinámicas de pareja.'
        },
        {
          url: '/assets/projects/anteros/screenshots/BesMe_MenuPrincipal2.jpg',
          title: 'Métricas & Actividades Compartidas',
          description: 'Seguimiento de racha, días juntos, estados de ánimo y próximas fechas especiales.'
        },
        {
          url: '/assets/projects/anteros/screenshots/BesMe_DiarioCompartido.jpg',
          title: 'Diario Estilo Arthur Morgan',
          description: 'Lienzo de dibujo manuscrito y composición sobre texturas de pergamino.'
        },
        {
          url: '/assets/projects/anteros/screenshots/BesMe_NotasAdhesivas.jpg',
          title: 'Pizarra de Notas Adhesivas',
          description: 'Post-its interactivos con sincronización instantánea y conexión a widget.'
        },
        {
          url: '/assets/projects/anteros/screenshots/BesMe_PlanificadorCitas&CalendarioComp.jpg',
          title: 'Planificador de Citas & Calendario',
          description: 'Calendario de hitos, ruleta de planes románticos y recordatorios automáticos.'
        },
        {
          url: '/assets/projects/anteros/screenshots/BesMe_Whislist.jpg',
          title: 'Wishlist & Listas de Compras',
          description: 'Lista de regalos soñados y pendientes compartidos con checklist reactivo.'
        },
        {
          url: '/assets/projects/anteros/screenshots/BesMe_EditarPerfil.jpg',
          title: 'Perfil & Wiki de Pareja',
          description: 'Configuración de datos y glosario íntimo de preferencias de ambos.'
        },
        {
          url: '/assets/projects/anteros/screenshots/BesMe_MenuPrincipal3.jpg',
          title: 'Herramientas y Ajustes',
          description: 'Sección de utilidades, vinculación por código y personalización visual.'
        }
      ],
      githubUrl: 'https://github.com/AlexSantiago25/anteros',
      accentColor: '#f43f5e',
      accentGradient: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
      badgeStyle: 'badge-purple',
      badgeLabel: 'Flutter • Riverpod • Firestore'
    },
    {
      id: 'storylab',
      title: 'StoryLab',
      subtitle: 'Laboratorio Narrativo para Autores & Diseñadores',
      tagline: 'Suite creativa multidisciplinaria para creadores de universos transmedia',
      category: 'creative',
      categoryLabel: 'Creative Suite & Desktop/Mobile',
      logoUrl: '/assets/projects/storylab/StoryLab_logo.png',
      coverImage: '/assets/projects/storylab/screenshots/StoryLab_MenuPrincipal.jpg',
      summary: 'Plataforma de autoría narrativa con soporte nativo para 7 formatos creativos (Novela, Cine, Videojuegos GDD, YouTube, Manga, Teatro y Rol D&D). Integra un grafo relacional interactivo y dictado por voz.',
      fullOverview: 'StoryLab fue concebido para eliminar la dispersión de herramientas que sufren los creadores de historias. Proporciona entornos de trabajo especializados por formato: desde el desglose de tomas B-Roll y hooks para creadores de YouTube, hasta fichas de misiones, mecánicas y facciones para Game Designers (GDD), además de un potente grafo de personajes renderizado con CustomPainter.',
      inspiration: 'Diseñado bajo la estética "Luxury Book & Grimoire", con tonos carbón, cuero, papiro y foil dorado.',
      highlights: [
        'Soporte nativo para 7 formatos: Novela, Guion de Cine, Videojuegos (GDD), YouTube A/B Roll, Cómic/Manga, Teatro y Rol.',
        'Grafo Interactivo de Conexiones: renderizado fluido con CustomPainter para vincular entidades, lore y relaciones semánticas.',
        'Dictado por Voz Integrado (Speech-to-Text): captura de ideas y transcripción al vuelo sin interrumpir el flujo creativo.',
        'Arquitectura Offline-First con SQLite: almacenamiento local con sqflite para máxima privacidad de la propiedad intelectual.'
      ],
      features: [
        {
          title: 'Visual Connection Graph',
          description: 'Grafo relacional de alta velocidad que mapea personajes, facciones, alianzas y rivalidades.',
          icon: 'share-2'
        },
        {
          title: 'Game Design Document (GDD)',
          description: 'Módulo para videojuegos con árboles de misiones, facciones, mecánicas y diálogos ramificados.',
          icon: 'cpu'
        },
        {
          title: 'Desglose Audiovisual para YouTube',
          description: 'Planificación de ganchos iniciales, guión A-Roll y tabla de tomas B-Roll cinematográficas.',
          icon: 'video'
        },
        {
          title: 'Ecosistema de Universos Compartidos',
          description: 'Crea universos transmedia donde novelas, juegos y cortometrajes conviven en un mismo canon.',
          icon: 'book-open'
        }
      ],
      technologies: [
        { name: 'Flutter 3.x (Material 3)', category: 'core' },
        { name: 'Dart', category: 'core' },
        { name: 'Provider', category: 'state' },
        { name: 'SQLite (sqflite / ffi)', category: 'database' },
        { name: 'Speech to Text', category: 'native' },
        { name: 'CustomPainter Grafo', category: 'graphics' },
        { name: 'flutter_animate', category: 'graphics' },
        { name: 'Google Fonts Editorial', category: 'graphics' }
      ],
      screenshots: [
        {
          url: '/assets/projects/storylab/screenshots/StoryLab_MenuPrincipal.jpg',
          title: 'Dashboard Central de Creación',
          description: 'Panel de inicio con acceso a proyectos recientes, citas de autores y métricas de redacción.'
        },
        {
          url: '/assets/projects/storylab/screenshots/StoryLab_AnaquelObras.jpg',
          title: 'Anaquel & Biblioteca de Obras',
          description: 'Estantería organizada por universos, formatos literarios y estado de desarrollo.'
        },
        {
          url: '/assets/projects/storylab/screenshots/StoryLab_MapaConexiones.jpg',
          title: 'Grafo Relacional Interactivo',
          description: 'Visualización de conexiones entre protagonistas, antagonistas y locaciones.'
        },
        {
          url: '/assets/projects/storylab/screenshots/StoryLab_GameDesign.jpg',
          title: 'Módulo Game Design (GDD)',
          description: 'Diseño de misiones, mecánicas de juego, facciones y estructura de niveles.'
        },
        {
          url: '/assets/projects/storylab/screenshots/StoryLab_GuionVideoYt.jpg',
          title: 'Guión & Retención para YouTube',
          description: 'Estructuración por hook, retención de audiencia, thumbnail y llamados a la acción.'
        },
        {
          url: '/assets/projects/storylab/screenshots/StoryLab_B_Roll.jpg',
          title: 'Planificador de Tomas B-Roll',
          description: 'Checklist y desglose cinematográfico para producción audiovisual.'
        },
        {
          url: '/assets/projects/storylab/screenshots/StoryLab_Historia_Novela.jpg',
          title: 'Editor de Capítulos & Lore',
          description: 'Entorno de concentración libre de distracciones con tipografía tipográfica fina.'
        },
        {
          url: '/assets/projects/storylab/screenshots/StoryLab_CrearHistoria.jpg',
          title: 'Asistente de Nuevos Proyectos',
          description: 'Flujo guiado para iniciar novelas, videojuegos, guiones o campañas de rol.'
        }
      ],
      githubUrl: 'https://github.com/AlexSantiago25/storylab',
      accentColor: '#d4af37',
      accentGradient: 'linear-gradient(135deg, #d4af37 0%, #f59e0b 100%)',
      badgeStyle: 'badge-amber',
      badgeLabel: 'Flutter • SQLite • Custom Graph'
    },
    {
      id: 'loot_room',
      title: 'PaperPlan (Loot Room)',
      subtitle: 'Gamificación & Inventario Espacial de Hogar',
      tagline: 'Organiza tu casa visualmente como si fuera un inventario RPG',
      category: 'gamification',
      categoryLabel: 'Spatial Engine & RPG Utility',
      logoUrl: '/assets/projects/loot_room/PaperPlanLogo.png',
      coverImage: '/assets/projects/loot_room/screenshots/PaperPlan_MenuPrincipal.jpg',
      summary: 'Sistema interactivo 2D para mapear planos de viviendas, muebles y objetos con mecánicas de inventario de cofre RPG y rarezas (Común, Raro, Legendario) bajo una estética de libreta escolar.',
      fullOverview: 'PaperPlan nace de una necesidad universal: recordar exactamente en qué cajón o estante dejamos nuestras pertenencias. Convierte la tarea en una experiencia lúdica: dibujas las habitaciones de tu casa, colocas muebles interactivos en una cuadrícula 2D y guardas objetos en slots con niveles de rareza RPG. Un potente motor de búsqueda global permite escribir el nombre de cualquier objeto y recibir la ruta de navegación exacta instantáneamente.',
      inspiration: 'Estética de cuaderno escolar cuadriculado con bocetos a mano (Doodles) y videojuegos de rol clásicos.',
      highlights: [
        'Plano Arquitectónico 2D y Habitaciones: editor interactivo con cuadrícula y detección de colisiones.',
        'Muebles con Ranuras RPG: slots interactivos con medidores de capacidad y filtros por rareza.',
        'Buscador Global Instantáneo: rastreo en tiempo real con ruta de navegación (Habitación → Mueble → Ranura).',
        'Persistencia Ligera Offline: velocidad de respuesta ultrarrápida sin tiempos de carga gracias a JSON storage.'
      ],
      features: [
        {
          title: 'Plano 2D Interactivo de la Casa',
          description: 'Visualiza la distribución de tu hogar y navega de una habitación a otra con fluidez.',
          icon: 'grid'
        },
        {
          title: 'Inventario con Ranuras & Rarezas RPG',
          description: 'Clasifica tus pertenencias de Común a Legendario con indicadores visuales de colores.',
          icon: 'box'
        },
        {
          title: 'Buscador Global con Breadcrumbs',
          description: 'Encuentra cualquier objeto al instante con la ubicación exacta de su cajón o estante.',
          icon: 'search'
        },
        {
          title: 'Estética Cuaderno & Doodles',
          description: 'Textura de papel cuadriculado, márgenes y tipografía manuscrita Patrick Hand.',
          icon: 'edit-3'
        }
      ],
      technologies: [
        { name: 'Flutter 3.9+', category: 'core' },
        { name: 'Dart', category: 'core' },
        { name: 'Provider', category: 'state' },
        { name: 'Local JSON Storage', category: 'database' },
        { name: 'Custom Doodle Painters', category: 'graphics' },
        { name: 'Interactive 2D Grid Canvas', category: 'graphics' },
        { name: 'Patrick Hand Google Font', category: 'graphics' },
        { name: 'UUID Generator', category: 'native' }
      ],
      screenshots: [
        {
          url: '/assets/projects/loot_room/screenshots/PaperPlan_MenuPrincipal.jpg',
          title: 'Hub Principal de Habitaciones',
          description: 'Vista general de todas las áreas de la casa con conteo de muebles y objetos.'
        },
        {
          url: '/assets/projects/loot_room/screenshots/PaperPlan_PlanoCasa.jpg',
          title: 'Plano Arquitectónico 2D',
          description: 'Navegación espacial entre recámaras, cocina, sala y áreas de almacenamiento.'
        },
        {
          url: '/assets/projects/loot_room/screenshots/PaperPlan_ModoExploracion.jpg',
          title: 'Modo Exploración de Habitación',
          description: 'Lienzo interactivo que muestra los muebles colocados y su ocupación.'
        },
        {
          url: '/assets/projects/loot_room/screenshots/PaperPlan_OrganizacionObjetos.jpg',
          title: 'Inventario de Mueble & Slots RPG',
          description: 'Cofre interactivo con ranuras por rareza (Común, Raro, Legendario) y notas.'
        },
        {
          url: '/assets/projects/loot_room/screenshots/PaperPlan_AgregarMuebles.jpg',
          title: 'Catálogo de Muebles',
          description: 'Selección y posicionamiento de clósets, escritorios, cajoneras y estanterías.'
        },
        {
          url: '/assets/projects/loot_room/screenshots/PaperPlan_Buscador.jpg',
          title: 'Buscador Global Instantáneo',
          description: 'Localización inmediata de objetos con ruta guiada paso a paso.'
        }
      ],
      githubUrl: 'https://github.com/AlexSantiago25/loot_room',
      accentColor: '#38bdf8',
      accentGradient: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
      badgeStyle: 'badge-cyan',
      badgeLabel: 'Flutter • 2D Canvas • Gamification'
    }
  ]);

  // State signals
  readonly activeCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly selectedProject = signal<Project | null>(null);
  readonly activeScreenshotIndex = signal<number>(0);
  readonly isContactModalOpen = signal<boolean>(false);

  // Computed state
  readonly profile = computed(() => this.profileData());
  readonly workExperience = computed(() => this.workExperienceData());
  readonly education = computed(() => this.educationData());
  readonly enterpriseDemos = computed(() => this.enterpriseDemosData());

  readonly filteredProjects = computed(() => {
    const category = this.activeCategory();
    const query = this.searchQuery().trim().toLowerCase();
    const all = this.projectsData();

    return all.filter(project => {
      const matchesCategory = category === 'all' || project.category === category;
      if (!matchesCategory) return false;

      if (!query) return true;

      const inTitle = project.title.toLowerCase().includes(query);
      const inSubtitle = project.subtitle.toLowerCase().includes(query);
      const inSummary = project.summary.toLowerCase().includes(query);
      const inTech = project.technologies.some(t => t.name.toLowerCase().includes(query));

      return inTitle || inSubtitle || inSummary || inTech;
    });
  });

  readonly currentScreenshot = computed(() => {
    const project = this.selectedProject();
    if (!project || project.screenshots.length === 0) return null;
    const index = Math.min(this.activeScreenshotIndex(), project.screenshots.length - 1);
    return project.screenshots[index];
  });

  // Actions
  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  setSearchQuery(q: string): void {
    this.searchQuery.set(q);
  }

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
    this.activeScreenshotIndex.set(0);
  }

  closeProjectModal(): void {
    this.selectedProject.set(null);
    this.activeScreenshotIndex.set(0);
  }

  setActiveScreenshot(index: number): void {
    this.activeScreenshotIndex.set(index);
  }

  nextScreenshot(): void {
    const project = this.selectedProject();
    if (!project) return;
    const total = project.screenshots.length;
    this.activeScreenshotIndex.update(idx => (idx + 1) % total);
  }

  prevScreenshot(): void {
    const project = this.selectedProject();
    if (!project) return;
    const total = project.screenshots.length;
    this.activeScreenshotIndex.update(idx => (idx - 1 + total) % total);
  }

  toggleContactModal(open?: boolean): void {
    if (typeof open === 'boolean') {
      this.isContactModalOpen.set(open);
    } else {
      this.isContactModalOpen.update(v => !v);
    }
  }
}
