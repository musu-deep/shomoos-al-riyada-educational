import {
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Languages,
  Laptop2,
  PenTool,
  Phone,
  Sparkles,
  Tag,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { AcademicStageId } from '../types';

interface HeroSectionProps {
  onOpenPlanner: (stageId: AcademicStageId) => void;
  onOpenAudio: () => void;
}

const stages = [
  { id: 'primary' as AcademicStageId, title: 'المرحلة الابتدائية', value: 'الصف 1 — الصف 6', note: 'بداية قوية لمستقبل واعد', icon: BookOpen },
  { id: 'intermediate' as AcademicStageId, title: 'المرحلة المتوسطة', value: 'المستويات 1 — 3', note: 'بناء المعرفة وتنمية المهارات', icon: Users },
  { id: 'secondary' as AcademicStageId, title: 'المرحلة الثانوية', value: 'المستويات 1 — 3', note: 'نحو مستقبل جامعي مشرق', icon: GraduationCap },
];

const features = [
  { label: 'منهج سوداني + عالمي', icon: BookOpen },
  { label: 'معلمون مؤهلون وذوو خبرة عالية', icon: Users },
  { label: 'فصول صغيرة تضمن اهتماماً فردياً', icon: GraduationCap },
  { label: 'أدوات تعليمية حديثة ومتطورة', icon: Laptop2 },
  { label: 'أنشطة وفعاليات وجوائز', icon: Award },
  { label: 'تنمية المهارات والإبداع', icon: Sparkles },
  { label: 'أساس قوي في الإنجليزية', icon: Languages },
];

export default function HeroSection({ onOpenPlanner }: HeroSectionProps) {
  return (
    <section className="hero-cinematic-fullbleed !min-h-[830px]" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true" />
      <div className="hero-curtain" aria-hidden="true" />
      <div className="hero-bottom-shade" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-two" aria-hidden="true" />

      <div className="mx-auto w-[min(1500px,calc(100%-2rem))] px-2 pb-6 pt-8 md:px-5 md:pt-10">
        <div className="grid items-stretch gap-5 xl:grid-cols-[0.88fr_1.12fr]">
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/35 bg-gradient-to-br from-[#183f7b]/85 to-[#071b43]/88 p-6 shadow-[0_30px_90px_rgba(0,0,0,.4)] backdrop-blur-2xl md:p-8"
          >
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_24px_white]" />

            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-xl border border-brand-gold/45 bg-brand-gold/10 px-4 py-2 text-xs font-extrabold text-brand-gold">
                <Laptop2 className="h-4 w-4" /> الدراسة أونلاين
              </span>
            </div>

            <h2 id="hero-title" className="text-[clamp(2.5rem,4.2vw,4.5rem)] font-extrabold leading-[1.12] tracking-tight text-white">
              التسجيل مفتوح الآن
            </h2>
            <h3 className="mt-2 text-[clamp(1.55rem,2.7vw,2.75rem)] font-extrabold text-brand-gold">
              للعام الدراسي 2026–2027
            </h3>
            <p className="mt-3 text-lg font-bold text-white">مؤسسة شموس الريادة التعليمية</p>
            <p className="text-base text-white/80">— بناء عقول متميزة لمستقبل واعد —</p>

            <div className="mt-5 grid gap-3 rounded-2xl border border-white/20 bg-white/[0.07] p-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/20 bg-white/10">
                  <CalendarDays className="h-6 w-6 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs text-white/65">تبدأ الدراسة في</p>
                  <p className="font-extrabold text-brand-gold">سبتمبر 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:border-r sm:border-white/15 sm:pr-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gold text-[#0a1c43]">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-white/65">عرض خاص لأول 20 طالباً</p>
                  <p className="text-xl font-extrabold text-white"><span className="text-brand-gold">500</span> ريال سعودي</p>
                  <p className="text-[11px] text-white/65">خصم على رسوم الدراسة</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button onClick={() => onOpenPlanner('primary')} className="hero-primary-action !min-h-14">
                <PenTool className="h-5 w-5" /> سجّل الآن
              </button>
              <button onClick={() => onOpenPlanner('primary')} className="hero-secondary-action !min-h-14">
                استكشف المراحل
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.72 }}
            className="relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.025]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_42%,rgba(255,255,255,.08),transparent_34%)]" />
            <div className="absolute bottom-7 right-7 max-w-sm rounded-3xl border border-white/25 bg-[#0a285d]/68 p-5 shadow-2xl backdrop-blur-2xl">
              <p className="text-xs font-bold text-brand-gold">مقاعد محدودة</p>
              <h3 className="mt-1 text-2xl font-extrabold text-white">ابدأ رحلة التميز</h3>
              <div className="my-4 h-px bg-white/15" />
              <p className="text-sm leading-7 text-white/75">تعلم • تفاعل • إبداع، عبر فصول مباشرة ومحتوى تفاعلي ومتابعة مستمرة.</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-white/25 bg-[#123872]/70 p-5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <Laptop2 className="h-10 w-10 text-brand-gold" />
              <div><h3 className="font-extrabold text-white">تعليم تفاعلي</h3><p className="text-xs text-white/70">من أي مكان</p></div>
            </div>
          </article>
          {stages.map(({ id, title, value, note, icon: Icon }) => (
            <button key={id} onClick={() => onOpenPlanner(id)} className="rounded-2xl border border-white/25 bg-[#123872]/70 p-5 text-right shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-brand-gold/50">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-[#16458b]"><Icon className="h-7 w-7 text-brand-gold" /></div>
                <div><h3 className="font-extrabold text-white">{title}</h3><p className="text-sm text-white/85">({value})</p><p className="mt-1 text-xs text-white/55">{note}</p></div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_320px]">
          <div>
            <h3 className="mb-3 text-center text-2xl font-extrabold text-white">مزايا تعليمية تصنع الفرق</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {features.map(({ label, icon: Icon }) => (
                <div key={label} className="flex min-h-[105px] flex-col items-center justify-center rounded-2xl border border-white/25 bg-[#123872]/70 p-3 text-center shadow-xl backdrop-blur-xl">
                  <Icon className="mb-2 h-7 w-7 text-brand-gold" />
                  <p className="text-xs font-bold leading-5 text-white">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-red-400/65 bg-gradient-to-br from-red-600/55 to-red-950/80 p-5 shadow-[0_0_34px_rgba(239,68,68,.38)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-red-600 ring-2 ring-yellow-300/70"><Languages className="h-7 w-7 text-white" /></div>
              <div><p className="font-extrabold text-brand-gold">ما يميزنا</p><h3 className="text-xl font-extrabold text-white">تدريس اللغة الصينية</h3></div>
            </div>
            <div className="mt-4 rounded-xl border border-brand-gold/45 bg-black/15 p-3 text-center text-sm font-bold text-white">لأول مرة: أساس قوي في اللغة الصينية</div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 rounded-2xl border border-white/25 bg-[#0c2f66]/78 p-4 shadow-2xl backdrop-blur-xl md:grid-cols-3">
          <div className="flex items-center justify-center gap-3 md:justify-start"><Tag className="h-9 w-9 text-brand-gold" /><div><p className="text-xs text-white/60">عرض خاص</p><p className="font-extrabold text-white">خصم <span className="text-2xl text-brand-gold">500</span> ريال لأول 20 طالباً</p></div></div>
          <div className="flex items-center justify-center gap-3 border-white/15 md:border-x"><CalendarDays className="h-9 w-9 text-brand-gold" /><div><p className="text-xs text-white/60">تبدأ الدراسة في</p><p className="text-xl font-extrabold text-brand-gold">سبتمبر 2026</p></div></div>
          <a href="tel:0510300439" className="flex items-center justify-center gap-3 no-underline md:justify-end"><Phone className="h-9 w-9 text-brand-gold" /><div><p className="text-xs text-white/60">للتواصل والاستفسار</p><p dir="ltr" className="text-2xl font-extrabold text-white">0510300439</p></div></a>
        </div>
      </div>
    </section>
  );
}
