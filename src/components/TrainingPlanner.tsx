import React, { useState } from 'react';
import { 
  BookOpen, Calculator, Compass, Cpu, FlaskConical, Binary, Dna, 
  Languages, Volume2, PenTool, ChevronRight, ChevronLeft, User, 
  Phone, Sparkles, Clock, Heart, Award, CheckCircle, Printer, Calendar,
  AlertCircle
} from 'lucide-react';
import { SUBJECTS, ACADEMIC_STAGES } from '../data';
import { CustomTrainingPlan, AcademicStageId } from '../types';
import { motion, AnimatePresence } from 'motion/react';

// Map icon names to Lucide icons
const IconMap: { [key: string]: React.ComponentType<any> } = {
  BookOpen,
  Calculator,
  Compass,
  Cpu,
  FlaskConical,
  Binary,
  Dna,
  Languages,
  Volume2,
  PenTool
};

interface TrainingPlannerProps {
  onPlanCreated: (plan: CustomTrainingPlan) => void;
}

export default function TrainingPlanner({ onPlanCreated }: TrainingPlannerProps) {
  const [step, setStep] = useState(1);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [selectedStage, setSelectedStage] = useState<AcademicStageId>('language_center');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [weeklyHours, setWeeklyHours] = useState<number>(4);
  const [timePreference, setTimePreference] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');
  const [needSupport, setNeedSupport] = useState(false);
  const [supportDetails, setSupportDetails] = useState('');
  const [additionalGoals, setAdditionalGoals] = useState('');
  
  // Custom plans state for current user
  const [submittedPlan, setSubmittedPlan] = useState<CustomTrainingPlan | null>(null);

  // Filter subjects based on selected stage
  const getStageSubjects = () => {
    if (selectedStage === 'primary') {
      return SUBJECTS.filter(s => s.id.startsWith('s_pri_'));
    } else if (selectedStage === 'intermediate') {
      return SUBJECTS.filter(s => s.id.startsWith('s_int_'));
    } else if (selectedStage === 'secondary') {
      return SUBJECTS.filter(s => s.id.startsWith('s_sec_'));
    } else {
      return SUBJECTS.filter(s => s.id.startsWith('s_lang_'));
    }
  };

  const handleStageSelect = (stageId: AcademicStageId) => {
    setSelectedStage(stageId);
    setSelectedSubjects([]); // Reset selected subjects
  };

  const toggleSubject = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  // Cost calculator
  // Base cost per hour: 50 SAR.
  // Language center might be 65 SAR.
  // If "needSupport" is checked (representing displaced/affected families), they can claim 90% or 100% humanitarian discount.
  const calculateCost = () => {
    const baseRate = selectedStage === 'language_center' ? 65 : 50;
    const monthlyWeeks = 4.3; // average weeks in month
    let total = weeklyHours * baseRate * monthlyWeeks;
    
    // Additional fee for subjects
    total += selectedSubjects.length * 30;

    if (needSupport) {
      return Math.round(total * 0.1); // 90% discount for displaced / affected families
    }
    return Math.round(total);
  };

  const nextStep = () => {
    if (step === 1 && (!studentName.trim() || !studentPhone.trim())) {
      alert('الرجاء إدخال الاسم ورقم الهاتف للمتابعة.');
      return;
    }
    if (step === 2 && selectedSubjects.length === 0) {
      alert('الرجاء اختيار مادة واحدة على الأقل لتصميم خطتك.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPlan: CustomTrainingPlan = {
      id: 'plan_' + Date.now(),
      studentName,
      studentPhone,
      stageId: selectedStage,
      selectedSubjects,
      preferredLanguages: selectedStage === 'language_center' ? ['الصينية', 'الإنجليزية', 'العربية'] : ['العربية'],
      weeklyHours,
      learningGoals: additionalGoals ? [additionalGoals] : ['تطوير المهارات العامة والتحصيل الدراسي المتين'],
      sessionTimePreference: timePreference,
      needSpecialSupport: needSupport,
      supportDetails: needSupport ? supportDetails || 'دعم مالي واجتماعي للأسر المتأثرة' : undefined,
      createdAt: new Date().toLocaleDateString('ar-SA'),
      estimatedCost: calculateCost()
    };

    setSubmittedPlan(newPlan);
    onPlanCreated(newPlan);
  };

  const resetPlanner = () => {
    setStep(1);
    setStudentName('');
    setStudentPhone('');
    setSelectedStage('language_center');
    setSelectedSubjects([]);
    setWeeklyHours(4);
    setTimePreference('afternoon');
    setNeedSupport(false);
    setSupportDetails('');
    setAdditionalGoals('');
    setSubmittedPlan(null);
  };

  // Auto AI feedback generator based on selections
  const generateAIFeedback = () => {
    const stageName = ACADEMIC_STAGES.find(s => s.id === selectedStage)?.title || '';
    const chosenSubjectsNames = SUBJECTS.filter(s => selectedSubjects.includes(s.id)).map(s => s.name).join(' و ');
    
    let advice = '';
    if (selectedStage === 'language_center') {
      advice = `اختيار رائع لمركز اللغات! دراسة لغات مثل ${chosenSubjectsNames} بمعدل ${weeklyHours} ساعات أسبوعياً سيزيد من كفاءتك اللغوية بنسبة 40% خلال أول شهرين. نوصي بحضور جلستين صوتيتين حيتين أسبوعياً لكسر حاجز الخوف من التحدث باللغات الأجنبية.`;
    } else {
      advice = `خطتك للمرحلة ${stageName} ممتازة وشاملة لـ (${chosenSubjectsNames}). ستقوم منصة شموس الريادة بتعيين مستشار أكاديمي لمتابعة أثر الجلسات الحية وتقديم دعم دوري لتعويض أي فاقد تعليمي بسبب الظروف الاستثنائية.`;
    }

    if (needSupport) {
      advice += ` لقد قمنا بتفعيل "منحة الدعم الاجتماعي" الخاصة بك لضمان استمرارية تعليمك دون أي عوائق مادية. نحن معك خطوة بخطوة.`;
    }

    return advice;
  };

  return (
    <div id="training-planner-section" className="bg-white rounded-3xl border border-brand-cream shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-brand-olive to-brand-olive-light p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-brand-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              أداة ذكية مخصصة
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display">مُصمم الاحتياج التدريبي التفاعلي</h2>
            <p className="text-brand-cream/90 text-sm mt-1 max-w-xl">
              صمم خطتك الدراسية الخاصة، حدد مستواك وموادك المفضلة، وسيقوم نظامنا بتفصيل مسار تعليمي وجلسات صوتية حية تلاءم تطلعاتك.
            </p>
          </div>
          
          <div className="text-right bg-black/15 px-4 py-2 rounded-xl border border-white/10">
            <span className="text-xs text-brand-cream block">مرحلة التصميم</span>
            <span className="text-lg font-bold font-display text-brand-gold">{submittedPlan ? 'اكتملت بنجاح' : `الخطوة ${step} من 4`}</span>
          </div>
        </div>

        {/* Progress Bar */}
        {!submittedPlan && (
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-6 overflow-hidden">
            <div 
              className="bg-brand-gold h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!submittedPlan ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Student Information & Academic Level */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -20, y: 10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-brand-charcoal mb-2">
                        اسم الطالب / المتدرب بالكامل <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute right-3.5 top-3 w-5 h-5 text-brand-olive-light" />
                        <input
                          type="text"
                          required
                          placeholder="مثال: أحمد محمد فرح"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="w-full pr-11 pl-4 py-2.5 rounded-xl border border-brand-cream bg-brand-sand/30 focus:outline-none focus:border-brand-olive focus:ring-1 focus:ring-brand-olive transition-colors text-brand-charcoal"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brand-charcoal mb-2">
                        رقم الهاتف للتواصل <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3.5 top-3 w-5 h-5 text-brand-olive-light" />
                        <input
                          type="tel"
                          required
                          placeholder="مثال: 059XXXXXXXX أو WhatsApp"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          className="w-full pr-11 pl-4 py-2.5 rounded-xl border border-brand-cream bg-brand-sand/30 focus:outline-none focus:border-brand-olive focus:ring-1 focus:ring-brand-olive transition-colors text-brand-charcoal"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-3">
                      اختر المرحلة الدراسية أو المركز الذي ترغب في الانضمام إليه:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ACADEMIC_STAGES.map((stage) => (
                        <div
                          key={stage.id}
                          onClick={() => handleStageSelect(stage.id as AcademicStageId)}
                          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                            selectedStage === stage.id
                              ? 'border-brand-olive bg-brand-olive/5 ring-1 ring-brand-olive/30 shadow-md'
                              : 'border-brand-cream bg-white hover:border-brand-olive-light hover:bg-brand-sand/20'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-brand-charcoal">{stage.title}</h4>
                            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-brand-cream text-brand-olive">
                              {stage.years}
                            </span>
                          </div>
                          <p className="text-xs text-brand-charcoal/85 leading-relaxed mb-3">
                            {stage.description}
                          </p>
                          <div className="text-[11px] font-mono font-medium text-brand-olive-light border-t border-brand-cream/60 pt-2 flex items-center justify-between">
                            <span>{stage.stats}</span>
                            {selectedStage === stage.id && (
                              <span className="bg-brand-olive text-white p-0.5 rounded-full">
                                <CheckCircle className="w-4 h-4 fill-brand-gold text-brand-olive" />
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Subject Selector */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -20, y: 10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-bold text-lg text-brand-charcoal mb-1">تحديد المقررات والتركيز التدريبي</h3>
                    <p className="text-xs text-brand-charcoal/70 mb-4">
                      المواد المعروضة أدناه مخصصة بناءً على اختيارك لـ ({ACADEMIC_STAGES.find(s => s.id === selectedStage)?.title}). يمكنك تحديد مادة واحدة أو أكثر.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getStageSubjects().map((subject) => {
                        const IconComponent = IconMap[subject.iconName] || BookOpen;
                        const isSelected = selectedSubjects.includes(subject.id);
                        return (
                          <div
                            key={subject.id}
                            onClick={() => toggleSubject(subject.id)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                              isSelected
                                ? 'border-brand-gold bg-brand-gold/5 shadow-sm'
                                : 'border-brand-cream bg-white hover:bg-brand-sand/30'
                            }`}
                          >
                            <div className={`p-3 rounded-xl h-fit ${isSelected ? 'bg-brand-gold text-brand-charcoal' : 'bg-brand-cream text-brand-olive'}`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between items-center">
                                <h4 className="font-bold text-brand-charcoal text-sm">{subject.name}</h4>
                                <span className="text-[10px] uppercase tracking-wider text-brand-olive-light font-semibold font-display">
                                  {subject.englishName}
                                </span>
                              </div>
                              <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                                {subject.description}
                              </p>
                              
                              <div className="pt-2 flex flex-wrap gap-1">
                                {subject.topics.map((topic, idx) => (
                                  <span key={idx} className="text-[10px] bg-brand-cream/80 text-brand-olive-light px-2 py-0.5 rounded font-medium">
                                    • {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Intensity, Goals & Timing */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -20, y: 10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Weekly Hours Slider */}
                    <div className="bg-brand-sand/20 p-5 rounded-2xl border border-brand-cream">
                      <label className="block text-sm font-bold text-brand-charcoal mb-2">
                        كثافة التدريب الأسبوعية (عدد الساعات):
                      </label>
                      <p className="text-xs text-brand-charcoal/70 mb-4">
                        اختر عدد الساعات الأسبوعية التي تناسب وقتك وقدرتك على التحصيل.
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="2"
                          max="15"
                          value={weeklyHours}
                          onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                          className="w-full h-2 bg-brand-cream rounded-lg appearance-none cursor-pointer accent-brand-olive"
                        />
                        <span className="text-lg font-bold font-display text-brand-olive whitespace-nowrap bg-brand-cream px-3 py-1.5 rounded-xl border border-brand-cream">
                          {weeklyHours} ساعة/أسبوع
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] text-brand-olive-light mt-2 px-1">
                        <span>ساعتان (مخفف)</span>
                        <span>8 ساعات (متوسط)</span>
                        <span>15 ساعة (مكثف جداً)</span>
                      </div>
                    </div>

                    {/* Time Preferences */}
                    <div className="bg-brand-sand/20 p-5 rounded-2xl border border-brand-cream">
                      <label className="block text-sm font-bold text-brand-charcoal mb-3">
                        الفترة المفضلة للجلسات الصوتية الحية:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'morning', label: 'الصباحية', time: '8:00 ص - 12:00 م' },
                          { id: 'afternoon', label: 'الظهيرة', time: '12:00 م - 4:00 م' },
                          { id: 'evening', label: 'المسائية', time: '4:00 م - 9:00 م' }
                        ].map((pref) => (
                          <div
                            key={pref.id}
                            onClick={() => setTimePreference(pref.id as any)}
                            className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                              timePreference === pref.id
                                ? 'bg-brand-olive border-brand-olive text-white shadow-sm'
                                : 'bg-white border-brand-cream text-brand-charcoal hover:bg-brand-sand/30'
                            }`}
                          >
                            <Clock className={`w-4 h-4 mx-auto mb-1.5 ${timePreference === pref.id ? 'text-brand-gold' : 'text-brand-olive-light'}`} />
                            <span className="text-xs font-bold block">{pref.label}</span>
                            <span className={`text-[9px] ${timePreference === pref.id ? 'text-brand-cream/80' : 'text-brand-charcoal/60'}`}>{pref.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Goal specification */}
                  <div>
                    <label className="block text-sm font-bold text-brand-charcoal mb-2">
                      أهداف تعليمية محددة أو تحديات تواجهها (اختياري):
                    </label>
                    <textarea
                      placeholder="مثال: أرغب في التركيز على مهارة التحدث بطلاقة، أو تعويض ما فاتني في منهج الرياضيات، أو تقوية مهارة كتابة الأحرف الصينية..."
                      value={additionalGoals}
                      onChange={(e) => setAdditionalGoals(e.target.value)}
                      rows={3}
                      className="w-full p-4 rounded-xl border border-brand-cream bg-brand-sand/30 focus:outline-none focus:border-brand-olive text-sm text-brand-charcoal"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Noble Mission Support Discount & Cost calculation */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -20, y: 10 }}
                  className="space-y-6"
                >
                  <div className="bg-brand-olive/5 border border-brand-olive/20 rounded-2xl p-6">
                    <h3 className="font-bold text-brand-olive text-lg mb-2 flex items-center gap-2">
                      <Heart className="w-5 h-5 fill-brand-gold text-brand-gold" />
                      منحة الأسر المتأثرة بالظروف الاستثنائية والنزوح
                    </h3>
                    <p className="text-xs text-brand-charcoal/80 leading-relaxed mb-4">
                      تأكيداً على رسالة مدرسة شموس الريادة التعليمية وتحت رعاية "مجموعة فرح شاه للأعمال المتقدمة"، نلتزم بتقديم الدعم الكامل للطلاب المتأثرين بظروف الحرب في السودان أو النزوح الداخلي والخارجي، بتقديم منح كاملة أو تخفيضات هائلة لضمان عدم توقف المسيرة التعليمية لأبنائنا.
                    </p>

                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-brand-cream">
                      <input
                        type="checkbox"
                        id="support-checkbox"
                        checked={needSupport}
                        onChange={(e) => setNeedSupport(e.target.checked)}
                        className="w-5 h-5 text-brand-olive border-brand-cream rounded focus:ring-brand-olive accent-brand-olive cursor-pointer"
                      />
                      <label htmlFor="support-checkbox" className="text-xs md:text-sm font-bold text-brand-charcoal cursor-pointer select-none">
                        نعم، نحن أسرة متأثرة بظروف الحرب/النزوح ونرغب بطلب تخفيض المنحة الاجتماعية (خصم 90% أو منحة كاملة).
                      </label>
                    </div>

                    <AnimatePresence>
                      {needSupport && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 overflow-hidden"
                        >
                          <textarea
                            placeholder="يرجى ذكر تفاصيل بسيطة لمساعدتنا في تخصيص المنحة (مثال: عائلة نازحة من الخرطوم، مقيمين حالياً بمدينة أخرى، انقطاع عن المدارس لفترة...)"
                            value={supportDetails}
                            onChange={(e) => setSupportDetails(e.target.value)}
                            rows={2}
                            className="w-full p-3 text-xs rounded-xl border border-brand-cream focus:outline-none focus:border-brand-olive text-brand-charcoal bg-white"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Summary & Live Quote */}
                  <div className="bg-brand-sand/40 border border-brand-cream rounded-2xl p-6">
                    <h4 className="font-bold text-brand-charcoal text-sm mb-3">التكلفة والتقدير المالي المبدئي:</h4>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <p className="text-xs text-brand-charcoal/70">
                          تقدير الرسوم الشهرية بناءً على اختيارك لـ <span className="font-bold">{weeklyHours} ساعات أسبوعياً</span> ومع ميزات الجلسات الصوتية والمواد المصممة:
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-3xl font-extrabold font-display ${needSupport ? 'text-brand-gold-dark line-through text-lg opacity-60' : 'text-brand-olive'}`}>
                            {Math.round(weeklyHours * (selectedStage === 'language_center' ? 65 : 50) * 4.3 + selectedSubjects.length * 30)} ريال/شهرياً
                          </span>
                          {needSupport && (
                            <span className="text-3xl font-extrabold font-display text-brand-olive flex items-center gap-1.5">
                              {calculateCost()} ريال/شهرياً
                              <span className="text-xs font-semibold bg-brand-gold/20 text-brand-gold-dark px-2.5 py-0.5 rounded-full">
                                منحة مدعومة %90 🌟
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs bg-brand-cream px-4 py-3 rounded-xl border border-brand-cream max-w-xs">
                        <p className="font-semibold text-brand-charcoal mb-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-brand-gold-dark" />
                          ملاحظة توضيحية:
                        </p>
                        هذا تقدير مبدئي للمصروفات التشغيلية. مدرسة شموس الريادة توفر أيضاً خيارات دفع ميسرة وتقسيط مرن تماشياً مع مخرجات دراسة الجدوى للعام 2025.
                      </div>
                    </div>
                  </div>

                  {/* Interactive AI Assistant Advice preview */}
                  <div className="bg-brand-gold/10 border border-brand-gold/30 p-4 rounded-xl flex gap-3">
                    <div className="p-2 bg-brand-gold rounded-lg text-brand-charcoal h-fit">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-brand-gold-dark block">مستشار الذكاء الاصطناعي الأكاديمي لمدرسة شموس الريادة:</span>
                      <p className="text-xs text-brand-charcoal leading-relaxed mt-1">
                        "{generateAIFeedback()}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step Navigation Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-brand-cream/60">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-brand-cream text-brand-olive font-bold hover:bg-brand-sand/30 transition-colors cursor-pointer text-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                    السابق
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-olive text-white font-bold hover:bg-brand-olive/90 transition-colors cursor-pointer text-sm shadow-md"
                  >
                    التالي
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-gold text-brand-charcoal font-bold hover:bg-brand-gold/95 transition-all cursor-pointer text-sm shadow-lg transform active:scale-95"
                  >
                    <Award className="w-4 h-4" />
                    اعتماد خطتي التدريبية وإرسال الطلب
                  </button>
                )}
              </div>
            </form>
          ) : (
            /* Custom plan registered successfully layout! */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 px-4 max-w-2xl mx-auto space-y-6"
            >
              <div className="w-20 h-20 bg-brand-olive/10 text-brand-olive rounded-full flex items-center justify-center mx-auto border-2 border-brand-olive">
                <CheckCircle className="w-12 h-12 text-brand-olive fill-brand-gold" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-brand-charcoal font-display">تم تصميم خطتك التدريبية بنجاح!</h3>
                <p className="text-xs text-brand-charcoal/70">
                  تم تسجيل خطتك التفاعلية في نظام مدرسة شموس الريادة للعام الدراسي 2025/2026. سيقوم المشرف الأكاديمي بالتواصل معك في غضون 24 ساعة عبر الهاتف لتأكيد مواعيد الجلسات الصوتية الحية.
                </p>
              </div>

              {/* Interactive Certificate of Training Customization */}
              <div className="border-4 border-double border-brand-olive/40 bg-brand-sand/10 p-6 rounded-2xl relative text-right space-y-4 shadow-sm">
                <div className="absolute top-4 left-4 text-brand-olive-light opacity-10">
                  <Award className="w-24 h-24" />
                </div>
                
                <div className="flex justify-between items-center border-b border-brand-cream pb-3">
                  <div>
                    <h5 className="font-extrabold text-brand-olive text-sm font-display">مؤسسة شموس الريادة التعليمية</h5>
                    <span className="text-[9px] text-brand-olive-light">إحدى مؤسسات مجموعة فرح شاه للأعمال المتقدمة</span>
                  </div>
                  <span className="text-[10px] text-brand-olive-light bg-brand-cream px-2 py-0.5 rounded">رقم الطلب: #SR-{submittedPlan.id.split('_')[1]}</span>
                </div>

                <div className="space-y-3 text-xs text-brand-charcoal/90">
                  <p>تشهد المؤسسة بأن المتدرب(ة): <strong className="text-brand-olive text-sm font-bold">{submittedPlan.studentName}</strong></p>
                  <p>قد قام بتصميم احتياجه التدريبي المخصص للمرحلة: <strong className="font-bold">{ACADEMIC_STAGES.find(s => s.id === submittedPlan.stageId)?.title}</strong></p>
                  
                  <div className="bg-white/80 p-3 rounded-lg border border-brand-cream space-y-1">
                    <p className="font-semibold text-brand-charcoal text-[11px]">المناهج والمقررات المحددة:</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {SUBJECTS.filter(s => submittedPlan.selectedSubjects.includes(s.id)).map(sub => (
                        <span key={sub.id} className="bg-brand-cream text-brand-olive font-bold text-[10px] px-2 py-0.5 rounded">
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[11px] pt-1">
                    <div>
                      <span className="text-brand-olive-light block">الكثافة الدراسية:</span>
                      <strong>{submittedPlan.weeklyHours} ساعات أسبوعياً</strong>
                    </div>
                    <div>
                      <span className="text-brand-olive-light block">الفترة المفضلة:</span>
                      <strong>{submittedPlan.sessionTimePreference === 'morning' ? 'الصباحية' : submittedPlan.sessionTimePreference === 'afternoon' ? 'الظهر' : 'المسائية'}</strong>
                    </div>
                    <div>
                      <span className="text-brand-olive-light block">الدعم الاجتماعي الاستثنائي:</span>
                      <strong>{submittedPlan.needSpecialSupport ? 'مُفعّل (خصم المنحة الإنسانية)' : 'عادي (مساهمة كاملة)'}</strong>
                    </div>
                    <div>
                      <span className="text-brand-olive-light block">الرسوم الشهرية المعتمدة:</span>
                      <strong className="text-brand-gold-dark text-xs">{submittedPlan.estimatedCost} ريال سعودي</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-cream/60 flex justify-between items-center text-[10px] text-brand-olive-light">
                  <span>تاريخ الصياغة المبدئية: {submittedPlan.createdAt}</span>
                  <span className="font-bold">مكتب القبول والتسجيل ✍️</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-brand-cream text-brand-charcoal font-semibold hover:bg-brand-cream transition-colors text-xs"
                >
                  <Printer className="w-4 h-4" />
                  طباعة الخطة وحفظها PDF
                </button>
                <button
                  type="button"
                  onClick={resetPlanner}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-olive text-white font-bold hover:bg-brand-olive/90 transition-colors text-xs shadow-md"
                >
                  تعديل أو تصميم خطة جديدة
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
