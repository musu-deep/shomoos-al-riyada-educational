import {
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Languages,
  Laptop2,
  MessageCircleMore,
  PenTool,
  Phone,
  Play,
  Sparkles,
  Tag,
  Users,
  UserRound,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { AcademicStageId } from '../types';

interface HeroSectionProps {
  onOpenPlanner: (stageId: AcademicStageId) => void;
  onOpenAudio: () => void;
}

const stages = [
  {
    id: 'secondary' as AcademicStageId,
    title: 'المرحلة الثانوية',
    value: 'المستويات 1 — 3',
    note: 'نحو مستقبل جامعي مشرق',
    icon: GraduationCap,
  },
  {
    id: 'intermediate' as AcademicStageId,
    title: 'المرحلة المتوسطة',
    value: 'المستويات 1 — 3',
    note: 'بناء المعرفة وتنمية المهارات',
    icon: Users,
  },
  {
    id: 'primary' as AcademicStageId,
    title: 'المرحلة الابتدائية',
    value: 'الصف 1 — الصف 6',
    note: 'بداية قوية لمستقبل واعد',
    icon: BookOpen,
  },
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

const glassCard =
  'relative overflow-hidden border border-white/25 bg-[linear-gradient(145deg,rgba(33,71,133,.74),rgba(10,33,78,.92))] shadow-[0_28px_85px_rgba(0,0,0,.38),inset_0_1px_0_rgba(255,255,255,.30),inset_0_-1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl';

export default function HeroSection({ onOpenPlanner }: HeroSectionProps) {
  return (
    <section className="hero-cinematic-fullbleed !min-h-[840px]" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true" />
      <div className="hero-curtain" aria-hidden="true" />
      <div className="hero-bottom-shade" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-two" aria-hidden="true" />

      <div className="mx-auto w-[min(1520px,calc(100%-2rem))] px-2 pb-6 pt-8 md:px-5 md:pt-10">
        <div
          className="grid items-stretch gap-5 xl:grid-cols-[minmax(420px,.94fr)_minmax(0,1.06fr)]"
          style={{ direction: 'ltr' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.68 }}
            style={{ direction: 'rtl' }}
            className={`${glassCard} rounded-[2rem] p-6 text-right md:p-8`}
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent shadow-[0_0_24px_rgba(255,255,255,.9)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(255,255,255,.16),transparent_25%),linear-gradient(115deg,transparent_0_43%,rgba(255,255,255,.06)_50%,transparent_58%)]" />

            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 rounded-xl border border-brand-gold/45 bg-brand-gold/10 px-4 py-2 text-xs font-extrabold text-brand-gold shadow-[inset_0_1px_0_rgba(255,255,255,.15)]">
                <Laptop2 className="h-4 w-4" /> الدراسة أونلاين
              </span>
            </div>

            <h2
              id="hero-title"
              className="text-[clamp(2.5rem,4.15vw,4.55rem)] font-extrabold leading-[1.06] tracking-tight text-white"
            >
              التسجيل مفتوح الآن
            </h2>
            <h3 className="mt-3 text-[clamp(1.55rem,2.7vw,2.85rem)] font-extrabold text-brand-gold">
              للعام الدراسي <span dir="ltr">2026–2027</span>
            </h3>
            <p className="mt-4 text-lg font-bold text-white">مؤسسة شموس الريادة التعليمية</p>
            <p className="mt-1 text-base text-white/80">— بناء عقول متميزة لمستقبل واعد —</p>

            <div className="mt-5 grid gap-3 rounded-[1.35rem] border border-white/20 bg-white/[0.05] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.15)] sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.03] px-3 py-2">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.2)]">
                  <CalendarDays className="h-6 w-6 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs text-white/60">تبدأ الدراسة في</p>
                  <p className="font-extrabold text-brand-gold">سبتمبر 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.03] px-3 py-2 sm:border-r sm:border-white/15 sm:pr-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gold text-[#0a1c43] shadow-[0_16px_30px_rgba(250,204,21,.2),inset_0_1px_0_rgba(255,255,255,.55)]">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-white/60">عرض خاص لأول 20 طالباً</p>
                  <p className="text-xl font-extrabold text-white">
                    <span className="text-brand-gold">500</span> ريال سعودي
                  </p>
                  <p className="text-[11px] text-white/65">خصم على رسوم الدراسة</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => onOpenPlanner('primary')}
                className="hero-primary-action !min-h-14 !rounded-[1.05rem]"
              >
                <PenTool className="h-5 w-5" /> سجّل الآن
              </button>
              <button
                onClick={() => onOpenPlanner('primary')}
                className="hero-secondary-action !min-h-14 !rounded-[1.05rem]"
              >
                استكشف المراحل
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.985, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.72 }}
            style={{ direction: 'rtl' }}
            className="relative min-h-[525px] overflow-hidden rounded-[2rem] border border-white/18 bg-white/[0.035] shadow-[0_28px_85px_rgba(0,0,0,.24),inset_0_1px_0_rgba(255,255,255,.15)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_38%,rgba(255,255,255,.11),transparent_24%),radial-gradient(circle_at_18%_75%,rgba(250,204,21,.08),transparent_18%)]" />
            <div className="absolute inset-12 rounded-[2.4rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02))] shadow-[inset_0_1px_0_rgba(255,255,255,.16)]" />

            <div className="absolute right-[32%] top-8 grid h-16 w-16 place-items-center rounded-2xl border border-white/18 bg-white/[0.08] backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,.18),inset_0_1px_0_rgba(255,255,255,.18)]">
              <Play className="h-8 w-8 text-white/90" fill="currentColor" />
            </div>

            <div className="absolute left-6 top-20 w-[34%] rounded-[1.6rem] border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.04))] p-3 shadow-[0_22px_50px_rgba(0,0,0,.22),inset_0_1px_0_rgba(255,255,255,.25)] backdrop-blur-2xl">
              <div className="overflow-hidden rounded-[1rem] border border-white/12 bg-white/[0.04]">
                <div className="h-40 bg-[linear-gradient(180deg,rgba(9,30,66,.15),rgba(9,30,66,.42)),url('/images/shomoos-campus-hero.webp')] bg-cover bg-center" />
              </div>
              <div className="mt-3 flex items-center justify-between text-white/85">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-brand-gold" />
                  <span className="text-xs font-bold">تفاعل حي</span>
                </div>
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">
                  <Users className="h-4 w-4 text-white/90" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-[41%] top-36 flex items-end justify-center">
              <div className="relative w-[49%] min-w-[260px] max-w-[410px] rounded-[2rem] border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,.13),rgba(255,255,255,.05))] p-4 shadow-[0_35px_90px_rgba(0,0,0,.32),inset_0_1px_0_rgba(255,255,255,.24)] backdrop-blur-2xl">
                <div className="absolute -left-4 top-6 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10">
                  <Users className="h-5 w-5 text-white/90" />
                </div>
                <div className="absolute -right-4 top-16 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10">
                  <MessageCircleMore className="h-5 w-5 text-white/90" />
                </div>

                <div className="overflow-hidden rounded-[1.4rem] border border-white/15 bg-[linear-gradient(180deg,rgba(8,28,66,.18),rgba(8,28,66,.48)),url('/images/shomoos-campus-hero.webp')] bg-cover bg-center px-6 pb-5 pt-7 text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.2)]">
                    <UserRound className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white">تعلم تفاعلي بإشراف مباشر</h3>
                  <p className="mt-2 text-xs leading-6 text-white/75">
                    بيئة رقمية حديثة، متابعة مستمرة، ومحتوى محفّز يصنع تجربة قريبة من النموذج المعتمد.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 max-w-sm rounded-[1.7rem] border border-white/25 bg-[linear-gradient(145deg,rgba(17,54,114,.78),rgba(7,28,71,.92))] p-5 shadow-[0_25px_70px_rgba(0,0,0,.32),inset_0_1px_0_rgba(255,255,255,.24)] backdrop-blur-2xl">
              <p className="text-xs font-bold text-brand-gold">مقاعد محدودة</p>
              <h3 className="mt-1 text-2xl font-extrabold text-white">ابدأ رحلة التميز</h3>
              <div className="my-4 h-px bg-white/15" />
              <p className="text-sm leading-7 text-white/76">
                تعلم • تفاعل • إبداع، عبر فصول مباشرة ومحتوى تفاعلي ومتابعة مستمرة.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stages.map(({ id, title, value, note, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onOpenPlanner(id)}
              className={`${glassCard} rounded-[1.45rem] p-5 text-right transition duration-300 hover:-translate-y-1 hover:border-brand-gold/45 hover:shadow-[0_35px_95px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.32)]`}
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-[linear-gradient(145deg,rgba(26,79,162,.95),rgba(17,50,104,.9))] shadow-[0_15px_30px_rgba(17,50,104,.35),inset_0_1px_0_rgba(255,255,255,.28)]">
                  <Icon className="h-7 w-7 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white">{title}</h3>
                  <p className="text-sm text-white/85">({value})</p>
                  <p className="mt-1 text-xs text-white/55">{note}</p>
                </div>
              </div>
            </button>
          ))}

          <article className={`${glassCard} rounded-[1.45rem] p-5`}>
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-[linear-gradient(145deg,rgba(26,79,162,.95),rgba(17,50,104,.9))] shadow-[0_15px_30px_rgba(17,50,104,.35),inset_0_1px_0_rgba(255,255,255,.28)]">
                <Laptop2 className="h-7 w-7 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-extrabold text-white">تعليم تفاعلي</h3>
                <p className="text-sm text-white/85">من أي مكان</p>
                <p className="mt-1 text-xs text-white/55">فصول مباشرة • محتوى تفاعلي • متابعة مستمرة</p>
              </div>
            </div>
          </article>
        </div>

        <div
          className="mt-5 grid gap-4 xl:grid-cols-[1fr_320px]"
          style={{ direction: 'ltr' }}
        >
          <div style={{ direction: 'rtl' }}>
            <h3 className="mb-3 text-center text-2xl font-extrabold text-white">
              مزايا تعليمية تصنع الفرق
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {features.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className={`${glassCard} flex min-h-[105px] flex-col items-center justify-center rounded-[1.35rem] p-3 text-center`}
                >
                  <div className="mb-2 grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,.18)]">
                    <Icon className="h-6 w-6 text-brand-gold" />
                  </div>
                  <p className="text-xs font-bold leading-5 text-white">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{ direction: 'rtl' }}
            className="relative overflow-hidden rounded-[1.55rem] border border-red-400/70 bg-[linear-gradient(145deg,rgba(197,29,50,.88),rgba(109,8,23,.92))] p-5 shadow-[0_0_34px_rgba(239,68,68,.36),0_25px_70px_rgba(0,0,0,.24),inset_0_1px_0_rgba(255,255,255,.2)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,.14),transparent_24%)]" />
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-yellow-300/80 bg-red-600 shadow-[0_15px_35px_rgba(153,27,27,.38),inset_0_1px_0_rgba(255,255,255,.22)] ring-2 ring-yellow-300/65">
                <Languages className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="font-extrabold text-brand-gold">ما يميزنا</p>
                <h3 className="text-xl font-extrabold text-white">تدريس اللغة الصينية</h3>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-brand-gold/45 bg-black/15 p-3 text-center text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
              لأول مرة: أساس قوي في اللغة الصينية
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 rounded-[1.6rem] border border-white/25 bg-[linear-gradient(145deg,rgba(18,56,114,.82),rgba(9,32,74,.94))] p-4 shadow-[0_28px_85px_rgba(0,0,0,.38),inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-xl md:grid-cols-3">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,.18)]">
              <Tag className="h-8 w-8 text-brand-gold" />
            </div>
            <div>
              <p className="text-xs text-white/60">عرض خاص</p>
              <p className="font-extrabold text-white">
                خصم <span className="text-2xl text-brand-gold">500</span> ريال لأول 20 طالباً
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 border-white/15 md:border-x">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,.18)]">
              <CalendarDays className="h-8 w-8 text-brand-gold" />
            </div>
            <div>
              <p className="text-xs text-white/60">تبدأ الدراسة في</p>
              <p className="text-xl font-extrabold text-brand-gold">سبتمبر 2026</p>
            </div>
          </div>

          <a
            href="tel:0510300439"
            className="flex items-center justify-center gap-3 no-underline md:justify-end"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,.18)]">
              <Phone className="h-8 w-8 text-brand-gold" />
            </div>
            <div>
              <p className="text-xs text-white/60">للتواصل والاستفسار</p>
              <p dir="ltr" className="text-2xl font-extrabold text-white">
                0510300439
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
