import React, { useState } from 'react';
import { 
  BookOpen, Calculator, Compass, Cpu, FlaskConical, Binary, Dna, 
  Languages, Volume2, PenTool, Users, ArrowLeft, Award, Sparkles 
} from 'lucide-react';
import { ACADEMIC_STAGES, SUBJECTS } from '../data';
import { AcademicStageId } from '../types';
import { motion } from 'motion/react';

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

interface StageExplorerProps {
  onSelectStageForPlanner: (stageId: AcademicStageId) => void;
}

export default function StageExplorer({ onSelectStageForPlanner }: StageExplorerProps) {
  const [activeStageId, setActiveStageId] = useState<AcademicStageId>('primary');

  const activeStage = ACADEMIC_STAGES.find(s => s.id === activeStageId) || ACADEMIC_STAGES[0];
  
  const getStageSubjects = () => {
    if (activeStageId === 'primary') {
      return SUBJECTS.filter(s => s.id.startsWith('s_pri_'));
    } else if (activeStageId === 'intermediate') {
      return SUBJECTS.filter(s => s.id.startsWith('s_int_'));
    } else if (activeStageId === 'secondary') {
      return SUBJECTS.filter(s => s.id.startsWith('s_sec_'));
    } else {
      return SUBJECTS.filter(s => s.id.startsWith('s_lang_'));
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-cream shadow-xl overflow-hidden">
      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-brand-cream bg-brand-sand/40">
        {ACADEMIC_STAGES.map((stage) => (
          <button
            key={stage.id}
            onClick={() => setActiveStageId(stage.id as AcademicStageId)}
            className={`p-5 text-center font-bold text-sm transition-all border-b-2 cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
              activeStageId === stage.id
                ? 'border-brand-olive bg-white text-brand-olive shadow-sm'
                : 'border-transparent text-brand-charcoal/70 hover:bg-brand-sand/50 hover:text-brand-charcoal'
            }`}
          >
            <span className="font-display text-base block">{stage.title}</span>
            <span className="text-[10px] font-medium text-brand-olive-light block">{stage.years}</span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Description & Statistics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-brand-gold/15 text-brand-gold-dark px-3 py-1 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                رؤية شاملة ونموذجية
              </div>
              <h3 className="text-2xl font-bold text-brand-charcoal font-display">
                {activeStage.title} بمؤسستنا
              </h3>
              <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                {activeStage.description}
              </p>
            </div>

            {/* Quick stats grid representing Page 4 (Distribution & Setup) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-sand/30 p-5 rounded-2xl border border-brand-cream">
              <div>
                <span className="text-[10px] text-brand-olive-light uppercase font-bold block">توزيع الفصول الدراسية:</span>
                <span className="text-base font-extrabold text-brand-charcoal font-display">
                  {activeStageId === 'primary' ? '6 فصول دراسية' : activeStageId === 'language_center' ? 'مجموعات مخصصة' : '3 فصول دراسية'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-brand-olive-light uppercase font-bold block">السعة والاستيعاب:</span>
                <span className="text-base font-extrabold text-brand-charcoal font-display">
                  {activeStageId === 'language_center' ? 'مرنة بالكامل' : '25 طالباً كحد أقصى'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-brand-olive-light uppercase font-bold block">إجمالي الطلاب المستهدفين:</span>
                <span className="text-base font-extrabold text-brand-charcoal font-display">
                  {activeStageId === 'primary' ? '150 طالب وطالبة' : activeStageId === 'language_center' ? 'غير محدود' : '75 طالب وطالبة'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-brand-olive-light uppercase font-bold block">الكادر التعليمي الأساسي:</span>
                <span className="text-base font-extrabold text-brand-charcoal font-display">
                  {activeStageId === 'language_center' ? 'معلمون ولغات مخصصة' : 'معلم لكل 20 طالباً'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                onClick={() => onSelectStageForPlanner(activeStageId)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-olive text-white font-bold rounded-xl hover:bg-brand-olive/95 transition-all shadow-md hover:shadow-lg cursor-pointer text-sm"
              >
                <Users className="w-4 h-4" />
                تصميم احتياجي التدريبي لهذه المرحلة
                <ArrowLeft className="w-4 h-4 mr-1 animate-pulse" />
              </button>
            </div>
          </div>

          {/* Right Column: Selected Subjects List */}
          <div className="lg:col-span-7 space-y-4 bg-brand-sand/15 p-5 rounded-3xl border border-brand-cream/60">
            <h4 className="font-bold text-brand-charcoal text-sm flex items-center gap-1.5 border-b border-brand-cream pb-3">
              <Award className="w-4 h-4 text-brand-gold" />
              أبرز المقررات والمناهج التفاعلية المتاحة:
            </h4>

            <div className="space-y-4">
              {getStageSubjects().map((subject) => {
                const IconComponent = IconMap[subject.iconName] || BookOpen;
                return (
                  <div 
                    key={subject.id} 
                    className="bg-white p-4 rounded-xl border border-brand-cream/80 flex gap-4 transition-all hover:shadow-sm"
                  >
                    <div className="p-3 bg-brand-sand rounded-xl text-brand-olive h-fit">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-brand-charcoal text-sm">{subject.name}</span>
                        <span className="text-[9px] uppercase tracking-wider text-brand-olive-light font-bold font-display">
                          {subject.englishName}
                        </span>
                      </div>
                      <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                        {subject.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {subject.topics.map((topic, i) => (
                          <span 
                            key={i} 
                            className="text-[9px] bg-brand-sand/50 text-brand-olive px-2.5 py-0.5 rounded-full font-medium"
                          >
                            ✓ {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
