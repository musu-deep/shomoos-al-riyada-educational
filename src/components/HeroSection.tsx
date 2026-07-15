import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Languages,
  Laptop2,
  PenTool,
  Sparkles,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { AcademicStageId } from '../types';

interface HeroSectionProps {
  onOpenPlanner: (stageId: AcademicStageId) => void;
  onOpenAudio: () => void;
}

const heroStats = [
  {
    title: 'المرحلة الابتدائية',
    value: 'الصف 1 — الصف 6',
    icon: BookOpen,
  },
  {
    title: 'المرحلة المتوسطة',
    value: 'المستويات 1 — 3',
    icon: Users,
  },
  {
    title: 'المرحلة الثانوية',
    value: 'المستويات 1 — 3',
    icon: GraduationCap,
  },
];

const campaignFeatures = [
  { label: 'منهج سوداني + عالمي', icon: BookOpen },
  { label: 'معلمون مؤهلون وخبرة عالية', icon: Users },
  { label: 'فصول صغيرة واهتمام فردي', icon: CheckCircle2 },
  { label: 'فعاليات وأنشطة وجوائز', icon: Award },
  { label: 'تنمية المهارات والإبداع', icon: Sparkles },
  { label: 'الدراسة أونلاين', icon: Laptop2 },
];

export default function HeroSection({ onOpenPlanner }: HeroSectionProps) {
  return (
    <section className="hero-cinematic-fullbleed" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true" />
      <div className="hero-curtain" aria-hidden="true" />
      <div className="hero-bottom-shade" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-two" aria-hidden="true" />

      <div className="hero-content-shell !pt-10 md:!pt-14">
        <div className="hero-layout !grid-cols-1 xl:!grid-cols-[1.02fr_.98fr] !gap-6 xl:!gap-10">
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hero-glass-panel !max-w-none !p-5 md:!p-8 xl:!p-10"
          >
            <span className="hero-panel-glint" aria-hidden="true" />

            <div className="flex flex-wrap items-center gap-2">
              <div className="hero-kicker !m-0">
                <Laptop2 className="h-4 w-4" />
                الدراسة أونلاين
              </div>
              <div className="hero-kicker !m-0 !text-white !border-white/20 !bg-white/10">
                <CalendarDays className="h-4 w-4 text-brand-gold" />
                تبدأ الدراسة في سبتمبر 2026
              </div>
            </div>

            <h2 id="hero-title" className="hero-title !mt-5 !text-[clamp(2.5rem,4.5vw,4.5rem)]">
              التسجيل مفتوح الآن
              <br />
              <span>للعام الدراسي 2026–2027</span>
            </h2>

            <p className="hero-description !mt-4">
              مؤسسة شموس الريادة التعليمية — بناء عقول متميزة لمستقبل واعد. تعليم تفاعلي
              للمراحل الابتدائية والمتوسطة والثانوية، يجمع بين المنهج السوداني والتعليم العالمي
              ويقدمه معلمون متخصصون في بيئة رقمية حديثة ومحفزة.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand-gold/50 bg-brand-gold/15 p-4 shadow-[0_18px_45px_rgba(250,204,21,.12)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-gold text-brand-charcoal shadow-lg">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-gold">عرض خاص لفترة محدودة</p>
                    <h3 className="mt-1 text-xl font-extrabold text-white">خصم 500 ريال سعودي</h3>
                    <p className="mt-1 text-xs text-white/75">على رسوم الدراسة لأول 20 طالباً</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-red-400/45 bg-gradient-to-br from-red-600/35 to-red-950/35 p-4 shadow-[0_18px_45px_rgba(220,38,38,.18)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-600 text-white shadow-lg ring-1 ring-white/30">
                    <Languages className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-red-200">ما يميزنا</p>
                    <h3 className="mt-1 text-xl font-extrabold text-white">تدريس اللغة الصينية</h3>
                    <p className="mt-1 text-xs text-white/75">تأسيس قوي يفتح آفاقاً عالمية لأبنائنا</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
              {campaignFeatures.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-h-16 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-2 text-xs font-bold text-white/90 backdrop-blur-lg"
                >
                  <Icon className="h-4 w-4 shrink-0 text-brand-gold" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="hero-actions !mt-5 !grid-cols-1 sm:!grid-cols-[1.2fr_.8fr]">
              <button
                type="button"
                onClick={() => onOpenPlanner('primary')}
                className="hero-primary-action"
              >
                <PenTool className="h-5 w-5" />
                <span>سجّل الآن واحجز مقعدك</span>
              </button>

              <a href="tel:0510300439" className="hero-secondary-action no-underline">
                <span className="text-center">للتسجيل والاستفسار<br /><strong dir="ltr">0510300439</strong></span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hidden min-h-[520px] items-end justify-center xl:flex"
          >
            <div className="mb-10 w-full max-w-md rounded-[2rem] border border-white/25 bg-white/[0.08] p-5 shadow-[0_35px_90px_rgba(0,0,0,.35)] backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <p className="text-xs font-bold text-brand-gold">مقاعد محدودة</p>
                  <h3 className="mt-1 text-2xl font-extrabold text-white">ابدأ رحلة التميز</h3>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/10">
                  <GraduationCap className="h-8 w-8 text-brand-gold" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/80">
                تعلم • تفاعل • إبداع، مع متابعة مستمرة، أدوات تعليمية حديثة، أنشطة منهجية جذابة،
                وجوائز تحفيزية تعزز المعرفة والمهارة والتميز.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="hero-stats-grid !mt-5 !w-full"
        >
          {heroStats.map(({ title, value, icon: Icon }, index) => (
            <article
              key={title}
              className="hero-floating-card !min-h-[108px]"
              style={{ animationDelay: `${index * 0.65}s` }}
            >
              <span className="hero-card-shine" aria-hidden="true" />
              <div className="hero-stat-icon">
                <Icon className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <p>{title}</p>
                <h3>{value}</h3>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
