import React, { useState } from 'react';
import { Sun, GraduationCap, Volume2, PenTool, Heart, ShieldCheck, Clock, ChevronLeft } from 'lucide-react';
import StageExplorer from './components/StageExplorer';
import AudioSessionHub from './components/AudioSessionHub';
import TrainingPlanner from './components/TrainingPlanner';
import StatsDashboard from './components/StatsDashboard';
import TeacherList from './components/TeacherList';
import HeroSection from './components/HeroSection';
import { CustomTrainingPlan, AcademicStageId } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'stages' | 'audio' | 'planner' | 'stats' | 'teachers'>('home');
  const [userPlans, setUserPlans] = useState<CustomTrainingPlan[]>([]);
  const [plannerPreselectedStage, setPlannerPreselectedStage] = useState<AcademicStageId | null>(null);

  const handlePlanCreated = (newPlan: CustomTrainingPlan) => {
    setUserPlans(prev => [newPlan, ...prev]);
  };

  const handleSelectStageForPlanner = (stageId: AcademicStageId) => {
    setPlannerPreselectedStage(stageId);
    setActiveTab('planner');
    // Scroll smoothly to planner section
    setTimeout(() => {
      document.getElementById('training-planner-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-brand-sand flex flex-col justify-between">
      
      {/* Dynamic Header row */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-cream shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo brand representing Page 1/2 of PDF */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-brand-olive text-white p-2.5 rounded-2xl relative shadow-md">
              <Sun className="w-7 h-7 text-brand-gold animate-spin-slow" />
              <GraduationCap className="w-4 h-4 text-white absolute -bottom-1 -left-1 bg-brand-olive-light rounded-full p-0.5" />
            </div>
            <div className="text-right">
              <h1 className="font-extrabold text-lg md:text-xl text-brand-charcoal font-display leading-tight tracking-tight">
                شموس الريادة <span className="text-brand-olive">التعليمية</span>
              </h1>
              <span className="text-[10px] text-brand-olive-light font-bold block leading-none">
                SHOMOOS AL-RIYADAH Educational Foundation
              </span>
              <span className="text-[9px] text-brand-charcoal/50 block">مجموعة فرح شاه للأعمال المتقدمة</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-1.5 md:gap-3 bg-brand-cream/40 p-1 rounded-xl border border-brand-cream">
            {[
              { id: 'home', label: 'الرئيسية' },
              { id: 'stages', label: 'المراحل والمقررات' },
              { id: 'audio', label: 'الجلسات الصوتية الحية' },
              { id: 'planner', label: 'مصمم الاحتياج' },
              { id: 'stats', label: 'دراسة الجدوى والتنظيم' },
              { id: 'teachers', label: 'نخبة المعلمين' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-brand-olive text-white shadow-sm'
                    : 'text-brand-charcoal/80 hover:bg-white hover:text-brand-charcoal'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Call-to-action button */}
          <button
            onClick={() => handleSelectStageForPlanner('language_center')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-gold text-brand-charcoal font-bold text-xs hover:bg-brand-gold/90 transition-all cursor-pointer shadow-sm transform active:scale-95"
          >
            <PenTool className="w-3.5 h-3.5" />
            صمم احتياجك مجاناً
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Render Tabs dynamically */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME PAGE */}
          {activeTab === 'home' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: -15 }}
              className="space-y-12"
            >
              {/* Cinematic full-width hero */}
              <HeroSection
                onOpenPlanner={handleSelectStageForPlanner}
                onOpenAudio={() => setActiveTab('audio')}
              />

              {/* Special Humanitarian Banner supporting السودان/النازحين */}
              <div className="bg-brand-gold/10 rounded-3xl p-6 md:p-8 border border-brand-gold/30 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-16 h-16 bg-brand-gold/20 text-brand-gold-dark rounded-2xl flex items-center justify-center border border-brand-gold/30">
                    <Heart className="w-8 h-8 fill-brand-gold text-brand-gold-dark" />
                  </div>
                </div>
                <div className="md:col-span-8 text-right space-y-2">
                  <h4 className="font-extrabold text-lg text-brand-charcoal font-display">
                    مبادرة دعم وتعويض الفاقد التعليمي لأبنائنا في السودان 🇸🇩
                  </h4>
                  <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                    إيماناً منا بضرورة تذليل العقبات أمام العائلات السودانية الكريمة المتأثرة بظروف الحرب والنزوح، توفر مدرسة شموس الريادة منحاً دراسية كاملة وتخفيضات تصل إلى 90% على كافة البرامج والمقررات، بدعم ورعاية سخية من "مجموعة فرح شاه للأعمال المتقدمة". تفعيل المنحة متاح مباشرة داخل مصمم الاحتياجات التدريبية.
                  </p>
                </div>
                <div className="md:col-span-2 text-center md:text-left">
                  <button
                    onClick={() => handleSelectStageForPlanner('primary')}
                    className="px-5 py-2.5 rounded-xl bg-brand-olive text-white font-bold text-xs hover:bg-brand-olive/95 transition-colors cursor-pointer shadow-sm inline-flex items-center gap-1"
                  >
                    تفاصيل المنحة والدعم
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Core Pillars / Three Educational Stages */}
              <div className="space-y-6">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <h3 className="text-xl md:text-3xl font-extrabold font-display text-brand-charcoal">
                    المراحل التعليمية ومراكز اللغات الشاملة
                  </h3>
                  <p className="text-xs text-brand-charcoal/70">
                    نغطي جميع مراحل التعليم العام بالإضافة لمركز اللغات التخصصي المعتمد وفق معايير الجودة العالمية.
                  </p>
                </div>

                <StageExplorer onSelectStageForPlanner={handleSelectStageForPlanner} />
              </div>

              {/* Live Session Hub Quick preview */}
              <div className="bg-brand-cream/30 rounded-3xl p-6 md:p-8 border border-brand-cream space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-display text-brand-charcoal flex items-center gap-2">
                      <Volume2 className="w-6 h-6 text-brand-gold animate-bounce" />
                      الاستوديو الصوتي التفاعلي والبث المباشر
                    </h3>
                    <p className="text-xs text-brand-charcoal/70">
                      جلسات صوتية مباشرة ميسرة بجودة صوت نقية تمكن الطالب من الاستماع، ورفع اليد، والتحدث مع المعلمين المعتمدين.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('audio')}
                    className="px-5 py-2.5 bg-brand-olive text-white font-bold text-xs rounded-xl hover:bg-brand-olive/95 transition-colors cursor-pointer shadow-sm"
                  >
                    عرض كافة الحصص الجارية
                  </button>
                </div>

                <AudioSessionHub />
              </div>

              {/* Feasibility Study Preview */}
              <StatsDashboard />

              {/* Dedicated Teacher List */}
              <TeacherList />

            </motion.div>
          )}

          {/* TAB 2: STAGES AND COURSES */}
          {activeTab === 'stages' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: -15 }}
              className="space-y-8"
            >
              <StageExplorer onSelectStageForPlanner={handleSelectStageForPlanner} />
            </motion.div>
          )}

          {/* TAB 3: LIVE AUDIO SESSIONS */}
          {activeTab === 'audio' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: -15 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl border border-brand-cream p-6 md:p-8 shadow-sm">
                <AudioSessionHub />
              </div>
            </motion.div>
          )}

          {/* TAB 4: TRAINING PLANNER */}
          {activeTab === 'planner' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: -15 }}
              className="space-y-8"
            >
              <TrainingPlanner onPlanCreated={handlePlanCreated} />

              {/* Render existing plans if user has submitted any in this session */}
              {userPlans.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-extrabold text-brand-charcoal text-base font-display">خططك التدريبية المصممة حالياً ({userPlans.length}):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userPlans.map((plan, i) => (
                      <div key={i} className="bg-white p-5 rounded-2xl border border-brand-cream space-y-3">
                        <div className="flex justify-between items-center border-b border-brand-cream pb-2">
                          <span className="font-bold text-brand-olive text-xs">{plan.studentName}</span>
                          <span className="text-[10px] bg-brand-cream text-brand-charcoal font-semibold px-2 py-0.5 rounded">خطّة معتمدة</span>
                        </div>
                        <p className="text-xs text-brand-charcoal/80">المستوى: <strong className="text-brand-charcoal">{plan.stageId === 'primary' ? 'ابتدائي' : plan.stageId === 'intermediate' ? 'متوسط' : plan.stageId === 'secondary' ? 'ثانوي' : 'مركز لغات'}</strong></p>
                        <p className="text-xs text-brand-charcoal/80">عدد الساعات الأسبوعية المجدولة: <strong>{plan.weeklyHours} ساعات</strong></p>
                        <p className="text-xs text-brand-charcoal/80">التكلفة التقديرية المقرة: <strong className="text-brand-gold-dark font-bold">{plan.estimatedCost} ريال/شهرياً</strong></p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: FEASIBILITY AND STRUCTURE */}
          {activeTab === 'stats' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: -15 }}
              className="space-y-8"
            >
              <StatsDashboard />
            </motion.div>
          )}

          {/* TAB 6: TEACHER SHOWCASE */}
          {activeTab === 'teachers' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: -15 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl border border-brand-cream p-6 md:p-8 shadow-sm">
                <TeacherList />
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Main Footer Block */}
      <footer className="bg-brand-charcoal text-brand-cream/80 border-t border-white/5 py-12 mt-16 text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <Sun className="w-6 h-6 text-brand-gold" />
              </div>
              <h5 className="font-bold text-white text-base font-display">مؤسسة شموس الريادة التعليمية</h5>
            </div>
            <p className="text-xs text-brand-cream/60 leading-relaxed max-w-md">
              مؤسسة تعليمية رائدة تقدم خدمات التعليم العام واللغات عن بعد بدقة عالية وجودة عالمية. نلتزم بدعم الطلاب المتضررين من الحرب في السودان وتوفير بدائل وحلول ذكية لبناء جيل نافع لأمته.
            </p>
          </div>

          <div className="space-y-3">
            <h6 className="font-bold text-white text-xs uppercase tracking-wider">مراكز تعليمية متخصصة</h6>
            <ul className="space-y-1.5 text-xs">
              <li>• مدرسة المرحلة الابتدائية (تأسيس كامل)</li>
              <li>• مدرسة المرحلة المتوسطة</li>
              <li>• مدرسة المرحلة الثانوية والتحصيلي</li>
              <li>• مركز تعليم اللغات (العربية، الصينية، الإنجليزية)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h6 className="font-bold text-white text-xs uppercase tracking-wider">مجموعة فرح شاه للأعمال المتقدمة</h6>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                رؤية تكنولوجية معتمدة 2025
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-gold" />
                دعم ومتابعة أكاديمية مستمرة
              </li>
              <li className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                رعاية مجتمعية وإنسانية شاملة
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-cream/40">
          <p>© {new Date().getFullYear()} مؤسسة شموس الريادة التعليمية. جميع الحقوق محفوظة لـ مجموعة فرح شاه للأعمال المتقدمة.</p>
          <div className="flex gap-4">
            <span>تاريخ إصدار دراسة الجدوى: 15 أبريل 2025م</span>
            <span>•</span>
            <span>منصة معززة ومحدثة تلقائياً</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
