import { Teacher, LiveSession, Subject } from './types';

export const TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'أ. عبد الرحمن السوداني',
    role: 'كبير معلمي اللغة العربية والهوية الثقافية',
    stages: ['primary', 'intermediate', 'secondary', 'language_center'],
    languages: ['العربية'],
    bio: 'أكثر من 15 عاماً في تدريس اللغة العربية والقرآن الكريم للطلاب في المناهج العربية والسودانية، متخصص في تنمية المهارات اللغوية للنازحين والمتضررين من الحرب وتوفير بيئة نفسية داعمة.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    totalStudents: 340,
    availableHours: ['10:00 ص', '02:00 م', '05:00 م', '08:00 م']
  },
  {
    id: 't2',
    name: 'الأستاذة وانغ لي (Wang Li)',
    role: 'أخصائية تدريس اللغة الصينية لغير الناطقين بها',
    stages: ['language_center', 'secondary'],
    languages: ['الصينية', 'الإنجليزية'],
    bio: 'حاصلة على ماجستير تعليم اللغة الصينية للوافدين من جامعة بكين. خبرة 8 سنوات في تبسيط مستويات الـ HSK وتدريب الطلاب العرب بلغة تواصل ممتازة وجذابة.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    totalStudents: 180,
    availableHours: ['09:00 ص', '11:00 ص', '04:00 م', '07:00 م']
  },
  {
    id: 't3',
    name: 'د. سارة جيمس (Sarah James)',
    role: 'أستاذة اللغة الإنجليزية المكثفة والآيلتس',
    stages: ['intermediate', 'secondary', 'language_center'],
    languages: ['الإنجليزية'],
    bio: 'متخصصة بريطانية في برامج اللغة الإنجليزية المكثفة والتحضير للاختبارات الدولية. تركز على التميز الصوتي والمحادثة المباشرة.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    rating: 5.0,
    totalStudents: 420,
    availableHours: ['01:00 م', '03:00 م', '06:00 م', '09:00 م']
  },
  {
    id: 't4',
    name: 'أ. محمد الفاتح الكباشي',
    role: 'معلم الرياضيات والفيزياء المتقدمة',
    stages: ['intermediate', 'secondary'],
    languages: ['العربية', 'الإنجليزية'],
    bio: 'مطور مناهج علمية حائز على جوائز التميز الأكاديمي. يسخر منصة شموس الريادة لتبسيط العلوم الدقيقة والمفاهيم الرياضية للمرحلتين المتوسطة والثانوية.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    totalStudents: 290,
    availableHours: ['08:00 ص', '12:00 م', '03:00 م', '06:00 م']
  },
  {
    id: 't5',
    name: 'أ. لينا تشينغ (Lina Zheng)',
    role: 'معلمة اللغة الصينية والترجمة التجارية',
    stages: ['language_center'],
    languages: ['الصينية', 'العربية'],
    bio: 'شغوفة بتعليم الثقافة واللغة الصينية لرواد الأعمال والطلاب الشباب العربي. تركز على الكفاءة المهنية والمحادثة التفاعلية الحية.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 4.7,
    totalStudents: 150,
    availableHours: ['10:00 ص', '01:00 م', '05:00 م', '08:00 م']
  }
];

export const SUBJECTS: Subject[] = [
  // Primary Stage
  {
    id: 's_pri_1',
    name: 'اللغة العربية التأسيسية',
    englishName: 'Foundational Arabic',
    description: 'تأسيس القراءة والكتابة والنطق السليم، وبناء مخارج الحروف الصحيحة مع دعم الطلاب المتأخرين دراسياً.',
    iconName: 'BookOpen',
    topics: ['القراءة السريعة', 'مخارج الحروف الأبجدية', 'جماليات الخط العربي', 'الإملاء والقواعد البسيطة']
  },
  {
    id: 's_pri_2',
    name: 'الرياضيات الأساسية',
    englishName: 'Primary Mathematics',
    description: 'تعليم العمليات الأربع الأساسية بأسلوب تفاعلي، لتنمية التفكير المنطقي والذكاء الرياضي.',
    iconName: 'Calculator',
    topics: ['الجمع والطرح السريع', 'جدول الضرب التفاعلي', 'الهندسة المبسطة', 'مسائل التفكير والذكاء']
  },
  {
    id: 's_pri_3',
    name: 'علوم واستكشاف الطبيعة',
    englishName: 'Primary Science',
    description: 'مغامرة شيقة لاستكشاف الكواكب والحيوانات وجسم الإنسان والظواهر الطبيعية من حولنا.',
    iconName: 'Compass',
    topics: ['جسم الإنسان وأجهزته', 'المجموعة الشمسية والنجوم', 'دورة حياة الكائنات الحية', 'تجارب علمية منزلية آمنة']
  },

  // Intermediate Stage
  {
    id: 's_int_1',
    name: 'العلوم الطبيعية المتكاملة',
    englishName: 'Integrated Sciences',
    description: 'تأصيل التفكير العلمي وتدريس أساسيات الفيزياء والكيمياء والأحياء تمهيداً للمرحلة الثانوية.',
    iconName: 'FlaskConical',
    topics: ['الخلية الحية وهيكلها', 'المادة والتحولات الفيزيائية', 'أساسيات الجدول الدوري', 'النظام البيئي والمناخ']
  },
  {
    id: 's_int_2',
    name: 'أساسيات علوم البرمجة والذكاء الاصطناعي',
    englishName: 'Introduction to Programming',
    description: 'مقدمة حماسية لكتابة الأكواد وتصميم الألعاب التفاعلية باستخدام لغات بصرية ومكتوبة بسيطة.',
    iconName: 'Cpu',
    topics: ['التفكير البرمجي السليم', 'برمجة سكراتش المرئية', 'مقدمة للغة بايثون', 'أخلاقيات الذكاء الاصطناعي']
  },

  // Secondary Stage
  {
    id: 's_sec_1',
    name: 'الفيزياء والرياضيات المتقدمة',
    englishName: 'Advanced Physics & Calculus',
    description: 'تأهيل كامل لاختبارات القبول الجامعي وفهم الميكانيكا والطاقة وحساب التفاضل والتكامل.',
    iconName: 'Binary',
    topics: ['ميكانيكا نيوتن والحركة', 'التفاضل والتكامل الأساسي', 'الكهرباء والمغناطيسية', 'تمارين التحصيلي والقدرات الدولية']
  },
  {
    id: 's_sec_2',
    name: 'العلوم الطبية الحيوية والكيمياء',
    englishName: 'Biomedical Chemistry & Biology',
    description: 'دراسة الهياكل العضوية الدقيقة، والأحماض النووية، وآليات التفاعل الكيميائي المتقدمة.',
    iconName: 'Dna',
    topics: ['الكيمياء العضوية', 'علم الوراثة والـ DNA', 'التفاعلات والروابط الذرية', 'فسيولوجيا الإنسان المتقدمة']
  },

  // Language Center
  {
    id: 's_lang_1',
    name: 'اللغة الصينية لغة المستقبل (HSK)',
    englishName: 'Chinese for Tomorrow (HSK)',
    description: 'منهج متميز لتجاوز مستويات الـ HSK من الصفر، يشمل النطق بالبينين (Pinyin) ورسم الرموز والحديث بثقة.',
    iconName: 'Languages',
    topics: ['نطق النغمات الأربعة السليم', 'المحادثات اليومية المعتادة', 'الكتابة التفاعلية للرموز', 'التحضير الرسمي للـ HSK']
  },
  {
    id: 's_lang_2',
    name: 'الإنجليزية المكثفة والمحادثة الحرة',
    englishName: 'Intensive English & Speaking',
    description: 'تطوير الطلاقة الكلامية، تقوية الاستماع والمحادثة في بيئة حية بنسبة 100% مع أساتذة ناطقين باللغة كأم.',
    iconName: 'Volume2',
    topics: ['إتقان اللكنة والنطق الصحيح', 'المحادثة التجارية والمهنية', 'اجتياز التوفل والآيلتس', 'الكتابة الأكاديمية وصياغة الرسائل']
  },
  {
    id: 's_lang_3',
    name: 'العربية الفصحى لغير الناطقين بها',
    englishName: 'Arabic for Non-Native Speakers',
    description: 'تعليم لغة القرآن الكريم والحديث اليومي للطلاب من كافة الجنسيات بأسلوب تفاعلي مشوق.',
    iconName: 'PenTool',
    topics: ['محادثات الحياة اليومية بالشرق الأوسط', 'قواعد النحو العربي بيسر', 'القرآن والتلاوة وصوتيات الحروف', 'الأدب والشعر العربي التأسيسي']
  }
];

export const LIVE_SESSIONS: LiveSession[] = [
  {
    id: 'sess_1',
    title: 'جلسة نطق النغمات الصينية والمحادثة الأساسية 🇨🇳',
    teacherId: 't2',
    stageId: 'language_center',
    subjectName: 'اللغة الصينية لغة المستقبل (HSK)',
    startTime: 'مباشر الآن',
    durationMinutes: 45,
    isActive: true,
    activeListeners: 42,
    audioUrl: 'chinese_session_1',
    lessonContent: [
      'التعرف على النغمات الأربعة في لغة الماندرين (Pinyin tones).',
      'كيف تقول "مرحباً" و"كيف حالك" و"شكراً لك" بنبرات سليمة.',
      'تطبيق عملي: نطق جماعي متزامن مع المعلمة وانغ لي.',
      'مراجعة الرموز الأساسية: 你好, 谢谢, 再见.'
    ]
  },
  {
    id: 'sess_2',
    title: 'مبادئ الميكانيكا وقوانين الحركة لنيوتن ⚙️',
    teacherId: 't4',
    stageId: 'secondary',
    subjectName: 'الفيزياء والرياضيات المتقدمة',
    startTime: 'مباشر الآن',
    durationMinutes: 60,
    isActive: true,
    activeListeners: 28,
    audioUrl: 'physics_session_1',
    lessonContent: [
      'شرح القانون الأول والثاني للحركة (مبدأ القصور الذاتي والقوة).',
      'تطبيقات واقعية: لماذا نحتاج لأحزمة الأمان في السيارات؟',
      'حل مسائل مجمعة من امتحانات الشهادة الثانوية والمنافسات العلمية.',
      'جلسة أسئلة وأجوبة تفاعلية مع أ. محمد الكباشي.'
    ]
  },
  {
    id: 'sess_3',
    title: 'مهارات التحدث والطلاقة باللغة الإنجليزية 🇬🇧',
    teacherId: 't3',
    stageId: 'language_center',
    startTime: 'تبدأ خلال 15 دقيقة',
    subjectName: 'الإنجليزية المكثفة والمحادثة الحرة',
    durationMinutes: 45,
    isActive: false,
    activeListeners: 0,
    lessonContent: [
      'التخلص من التردد أثناء الحديث باللغة الإنجليزية أمام الجمهور.',
      'تعبيرات مهمة للاستخدام في السفر والمقابلات الشخصية.',
      'محاكاة سيناريوهات حقيقية: طلب الطعام، حجز فندق، الحديث في المطار.',
      'ملاحظات صوتية وتصحيحات نطق فورية من د. سارة جيمس.'
    ]
  },
  {
    id: 'sess_4',
    title: 'تأسيس الهمزات والإملاء الصحيح في لغتنا الجميلة 🇸🇩',
    teacherId: 't1',
    stageId: 'primary',
    startTime: 'تبدأ بعد ساعة',
    subjectName: 'اللغة العربية التأسيسية',
    durationMinutes: 50,
    isActive: false,
    activeListeners: 0,
    lessonContent: [
      'قواعد كتابة الهمزة المتوسطة على نبرة وعلى واو وعلى الألف.',
      'ألعاب تفاعلية ومسابقات إملاء فورية للطلاب.',
      'تمارين علاجية للحد من الأخطاء الإملائية الأكثر شيوعاً.',
      'فترة مخصصة للطلاب السودانيين لتعويض الفاقد التعليمي.'
    ]
  }
];

export const ACADEMIC_STAGES = [
  {
    id: 'primary',
    title: 'المرحلة الابتدائية',
    years: '6 سنوات دراسية',
    stats: '6 فصول | 150 طالب وطالبة | 6 معلمين أساسيين',
    description: 'تأسيس متين يركز على المهارات الأساسية وبناء القيم الدينية والوطنية والدعم النفسي للطلاب المتأثرين بالظروف الاستثنائية.',
    accent: 'border-brand-gold bg-brand-gold/5 text-brand-gold-dark'
  },
  {
    id: 'intermediate',
    title: 'المرحلة المتوسطة',
    years: '3 سنوات دراسية',
    stats: '3 فصول | 75 طالب وطالبة | 3 معلمين أساسيين',
    description: 'تطوير مهارات التفكير الناقد والتحليل العلمي والبرمجة واللغات الإضافية لتجهيز جيل مبدع ومستكشف.',
    accent: 'border-brand-olive-light bg-brand-olive-light/5 text-brand-olive'
  },
  {
    id: 'secondary',
    title: 'المرحلة الثانوية',
    years: '3 سنوات دراسية',
    stats: '3 فصول | 75 طالب وطالبة | 3 معلمين أساسيين',
    description: 'توجيه أكاديمي مكثف ومسارات متقدمة علمية وتكنولوجية مخصصة للنجاح في الشهادة والتمكين للقبول بأرقى الجامعات.',
    accent: 'border-brand-olive bg-brand-olive/10 text-brand-olive'
  },
  {
    id: 'language_center',
    title: 'مركز اللغات التخصصي',
    years: 'برامج مرنة ومستمرة',
    stats: 'عربية | صينية | إنجليزية | جلسات صوتية حية',
    description: 'برامج نطق ومحادثة ممتازة بشهادات معتمدة، تركز على تمكين المتدربين من التحدث بطلاقة وتصميم برامج تناسب احتياجاتهم.',
    accent: 'border-amber-500 bg-amber-500/5 text-amber-700'
  }
];

export const PERF_PILLARS = [
  {
    title: 'التقييم المستمر',
    description: 'اجتماعات شهرية تقييمية للأداء لكل فصل ولكل معلم مع وضع مؤشرات أداء واضحة ومتابعتها دورياً.',
    iconName: 'BarChart3'
  },
  {
    title: 'التحفيز والمكافآت',
    description: 'نظام تحفيز ومكافآت مجزية للمعلمين المتميزين بناءً على نتائج طلابهم ومستوى الإنجاز والالتزام الأكاديمي.',
    iconName: 'Award'
  },
  {
    title: 'المنصة الإلكترونية',
    description: 'تطبيق لوحة تحكم متكاملة لمتابعة الحضور والغياب، نتائج الاختبارات، والتفاعل الفوري مع أولياء الأمور.',
    iconName: 'Monitor'
  },
  {
    title: 'الإشراف والمتابعة',
    description: 'زيارات تفتيشية ودعم إداري مستمر من قبل المدير العام والوكلاء لضمان تطبيق أعلى معايير الجودة التعليمية.',
    iconName: 'ShieldCheck'
  }
];
