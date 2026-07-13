import { GraduationCap, Globe2, PenTool, Sparkles, Users, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { AcademicStageId } from '../types';

interface HeroSectionProps {
  onOpenPlanner: (stageId: AcademicStageId) => void;
  onOpenAudio: () => void;
}

const heroStats = [
  {
    title: 'المراحل الأكاديمية',
    value: 'ابتدائي | متوسط | ثانوي',
    icon: GraduationCap,
  },
  {
    title: 'مركز اللغات التخصصي',
    value: 'عربية | صينية | إنجليزية',
    icon: Globe2,
  },
  {
    title: 'القدرة الاستيعابية 2025',
    value: '+300 طالب مستهدف',
    icon: Users,
  },
];

export default function HeroSection({ onOpenPlanner, onOpenAudio }: HeroSectionProps) {
  return (
    <section className="hero-cinematic-fullbleed" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true" />
      <div className="hero-curtain" aria-hidden="true" />
      <div className="hero-bottom-shade" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-two" aria-hidden="true" />

      <div className="hero-content-shell">
        <div className="hero-layout">
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hero-glass-panel"
          >
            <span className="hero-panel-glint" aria-hidden="true" />

            <div className="hero-kicker">
              <Sparkles className="h-4 w-4" />
              مبادرة تفعيل الدراسة عن بُعد لعام 2025م
            </div>

            <h2 id="hero-title" className="hero-title">
              تعليم ريادي متكامل
              <br />
              يرسم مستقبلاً <span>مشرقاً</span>
              <br />
              لأبنائنا
            </h2>

            <p className="hero-description">
              تأسست مؤسسة شموس الريادة التعليمية لتوفير نموذج تعليمي متميز يجمع بين أصالة القيم
              والمناهج الحديثة لجميع المراحل الدراسية واللغات. نلتزم برسالتنا الإنسانية المتميزة
              لضمان استمرارية التعليم وتوفير فرص مجانية ممتازة للنازحين والمتأثرين بالحرب في السودان.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                onClick={() => onOpenPlanner('primary')}
                className="hero-primary-action"
              >
                <PenTool className="h-5 w-5" />
                <span>ابدأ بتصميم خطتك التدريبية المخصصة</span>
              </button>

              <button type="button" onClick={onOpenAudio} className="hero-secondary-action">
                <Volume2 className="h-5 w-5" />
                <span>استمع للجلسات الصوتية الحية</span>
              </button>
            </div>
          </motion.div>

          <div className="hero-image-breathing-space" aria-hidden="true" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="hero-stats-grid"
        >
          {heroStats.map(({ title, value, icon: Icon }, index) => (
            <article
              key={title}
              className="hero-floating-card"
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
