import React, { useState } from 'react';
import { 
  TrendingUp, Users, DollarSign, Award, BarChart3, HelpCircle, 
  ShieldCheck, Monitor, HelpCircle as HelpIcon, ArrowUpRight, Check 
} from 'lucide-react';
import { PERF_PILLARS } from '../data';
import { motion } from 'motion/react';

export default function StatsDashboard() {
  const [activeTab, setActiveTab] = useState<'feasibility' | 'hierarchy' | 'quality'>('feasibility');

  return (
    <div className="bg-white rounded-3xl border border-brand-cream shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="bg-brand-olive text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-brand-cream/10">
        <div>
          <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-2.5 py-1 rounded-full font-bold border border-brand-gold/30">
            دراسة الجدوى والتميز الإداري 📊
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-display mt-2">
            مؤشرات تشغيل مدرسة شموس الريادة (عام 2025م)
          </h3>
          <p className="text-brand-cream/80 text-xs mt-1">
            مقتطفات تفاعلية مستندة إلى خطة الهيكل الإداري والموازنة السنوية وتوصيات رفع كفاءة التدريس.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-black/20 p-1 rounded-xl border border-white/5 self-stretch md:self-auto justify-between gap-1">
          {[
            { id: 'feasibility', label: 'دراسة الجدوى والميزانية' },
            { id: 'hierarchy', label: 'الهيكل التنظيمي' },
            { id: 'quality', label: 'آليات ضبط الجودة' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-brand-gold text-brand-charcoal'
                  : 'text-brand-cream hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Tab 1: Feasibility and Financials */}
        {activeTab === 'feasibility' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cost card 1 */}
              <div className="bg-brand-sand/30 p-5 rounded-2xl border border-brand-cream space-y-2">
                <div className="flex justify-between items-center text-brand-olive-light">
                  <span className="text-[10px] font-bold uppercase tracking-wider">ميزانية التشغيل (عن بعد)</span>
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-2xl font-extrabold text-brand-olive font-display">55,000 ريال</div>
                <p className="text-[11px] text-brand-charcoal/80">
                  تشمل الرواتب (48k) وحملات التسويق وتجهيز المنصة الإلكترونية وتسيير الأعمال الأساسية.
                </p>
              </div>

              {/* Cost card 2 */}
              <div className="bg-brand-sand/30 p-5 rounded-2xl border border-brand-cream space-y-2">
                <div className="flex justify-between items-center text-brand-gold-dark">
                  <span className="text-[10px] font-bold uppercase tracking-wider">أجور الهيئة التعليمية</span>
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl font-extrabold text-brand-charcoal font-display">48,000 - 86,400 ريال</div>
                <p className="text-[11px] text-brand-charcoal/80">
                  مخصصة لاستقطاب 18 معلماً ومشرفاً لتقديم جودة أكاديمية تليق بالطلاب السودانيين والشركاء.
                </p>
              </div>

              {/* Cost card 3 */}
              <div className="bg-brand-sand/30 p-5 rounded-2xl border border-brand-cream space-y-2">
                <div className="flex justify-between items-center text-green-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider">الاستيعاب المبدئي للمدرسة</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-2xl font-extrabold text-green-800 font-display">300 طالب وطالبة</div>
                <p className="text-[11px] text-brand-charcoal/80">
                  الطاقة المبدئية موزعة على 12 فصلاً مع خطط واعدة للتوسع التدريجي لخدمة 500 طالب.
                </p>
              </div>
            </div>

            {/* Financial break-down representing slide 5/6 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
              <div className="bg-white rounded-2xl border border-brand-cream p-5 space-y-4">
                <h4 className="font-bold text-sm text-brand-charcoal flex items-center gap-1.5 border-b border-brand-cream pb-3">
                  <BarChart3 className="w-4 h-4 text-brand-olive" />
                  تفصيل رواتب المعلمين والكوادر (النموذج السنوي):
                </h4>
                
                <div className="space-y-2.5">
                  {[
                    { role: 'معلمي الفصول الأساسية', count: 8, salary: '500 ريال', total: '48,000 ريال' },
                    { role: 'معلمي المواد الإضافية', count: 4, salary: '500 ريال', total: '24,000 ريال' },
                    { role: 'المدير العام للتعليم عن بعد', count: 1, salary: 'مشمول', total: 'شرفي' },
                    { role: 'وكلاء المراحل الثلاثة', count: 3, salary: 'مشمول', total: 'شرفي' },
                    { role: 'الإداريون والمشرفون', count: 2, salary: '600 ريال', total: '14,400 ريال' },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between text-xs p-2.5 rounded-lg bg-brand-sand/20 hover:bg-brand-sand/50 transition-colors">
                      <span className="font-semibold text-brand-charcoal">{row.role} ({row.count} موظف)</span>
                      <span className="text-brand-olive font-bold">{row.total}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm p-3 rounded-lg bg-brand-olive text-white font-bold">
                    <span>مجموع الميزانية السنوية للرواتب:</span>
                    <span>86,400 ريال سنوياً</span>
                  </div>
                </div>
              </div>

              {/* Recommendations representing Slide 8 */}
              <div className="bg-brand-gold/5 rounded-2xl border border-brand-gold/30 p-5 space-y-4">
                <h4 className="font-bold text-sm text-brand-gold-dark flex items-center gap-1.5 border-b border-brand-gold/20 pb-3">
                  <Award className="w-4 h-4" />
                  توصيات تحسين الأداء المالي والربحية (2025):
                </h4>
                
                <ul className="space-y-3">
                  {[
                    'إضافة برامج إثرائية مميزة (اللغة الإنجليزية المكثفة، الذكاء الاصطناعي، والبرمجة الصيفية).',
                    'زيادة عدد الطلاب تدريجياً وبشكل منهجي حتى 500 طالب مع الحفاظ التام على جودة التعليم الفردي ومعدلات النجاح.',
                    'تقليل التكاليف التشغيلية للمقرات والأنشطة عبر توظيف حلول "التعليم عن بعد" والطاقة المتجددة الصديقة للبيئة.',
                    'تنظيم دورات مسائية لتعليم اللغات والمهارات لرجال الأعمال والراغبين ببرامج سريعة وموجهة.'
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs text-brand-charcoal leading-relaxed">
                      <span className="bg-brand-gold text-brand-charcoal font-bold text-[10px] rounded-full w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Hierarchy Pyramid */}
        {activeTab === 'hierarchy' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <p className="text-xs text-brand-charcoal/80 text-center max-w-xl mx-auto leading-relaxed">
              يتكون الهيكل الإداري لمدرسة شموس الريادة من نموذج هرمي مترابط يضمن الإشراف السلس على كافة العمليات التعليمية اليومية وخدمة الأسر المتأثرة.
            </p>

            {/* Pyramid display representing Slide 3 */}
            <div className="max-w-md mx-auto space-y-3 pt-4">
              {[
                { step: 1, title: 'المدير العام للمؤسسة', desc: 'الإشراف على العمليات التعليمية والإدارية والمالية الكلية بالتنسيق مع مجموعة فرح شاه.', bg: 'bg-brand-olive text-white' },
                { step: 2, title: 'وكلاء المراحل الثلاثة', desc: 'وكيل لكل مرحلة تعليمية (الابتدائية، المتوسطة، الثانوية) لمتابعة تحصيل الفصول والطلاب أولاً بأول.', bg: 'bg-brand-olive-light text-white' },
                { step: 3, title: 'المشرفون الأكاديميون والتربويون', desc: 'الإشراف المباشر والتربوي على تسيير المناهج ودعم المعلمين في إعداد الحصص.', bg: 'bg-brand-gold text-brand-charcoal' },
                { step: 4, title: 'الكادر الإداري والمساعد', desc: 'السكرتاريا ومسؤولو الدعم الفني للمنصة لضمان سلامة جلسات البث الصوتي وحل صعوبات تقنية.', bg: 'bg-brand-cream text-brand-charcoal border border-brand-cream' }
              ].map((lvl) => (
                <div 
                  key={lvl.step} 
                  className={`p-4 rounded-xl text-right transition-all hover:scale-[1.01] hover:shadow-sm ${lvl.bg}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm">{lvl.step}. {lvl.title}</span>
                    <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-full">المستوى التنظيمي {lvl.step}</span>
                  </div>
                  <p className="text-[11px] opacity-90 mt-1 leading-relaxed">{lvl.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Quality and Monitoring Loop */}
        {activeTab === 'quality' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {PERF_PILLARS.map((pillar, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border border-brand-cream bg-brand-sand/15 hover:bg-brand-sand/30 transition-all flex gap-4"
              >
                <div className="bg-brand-olive text-white p-3 rounded-xl h-fit">
                  {idx === 0 ? <BarChart3 className="w-5 h-5 text-brand-gold" /> :
                   idx === 1 ? <Award className="w-5 h-5 text-brand-gold" /> :
                   idx === 2 ? <Monitor className="w-5 h-5 text-brand-gold" /> :
                   <ShieldCheck className="w-5 h-5 text-brand-gold" />}
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-brand-charcoal text-sm">{pillar.title}</h4>
                  <p className="text-xs text-brand-charcoal/80 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
}
