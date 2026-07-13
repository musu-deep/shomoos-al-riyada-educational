import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, Sparkles, Volume2, VolumeX, Star, Users, MessageCircle, 
  Play, Pause, Mic, CheckCircle 
} from 'lucide-react';
import { TEACHERS } from '../data';
import { Teacher } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function TeacherList() {
  const [playingTeacherId, setPlayingTeacherId] = useState<string | null>(null);
  const [subtitles, setSubtitles] = useState<string>('');
  
  // Audio oscillator reference for simulated voices
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Simulated voice intros dictionary
  const voiceIntros: { [key: string]: { audioType: OscillatorType, freq: number, text: string } } = {
    t1: {
      audioType: 'sine',
      freq: 180,
      text: 'مرحباً بكم يا أبنائي، أنا الأستاذ عبد الرحمن السوداني. يسعدني مرافقتكم في رحلتكم لتعلم لغتنا العربية الجميلة والقرآن الكريم ببث مباشر ميسر.'
    },
    t2: {
      audioType: 'triangle',
      freq: 320,
      text: 'Nǐ hǎo! Hello, I am Wang Li. I am excited to guide you in mastering Chinese Mandarin tones and preparing for HSK examinations at Shomoos platform.'
    },
    t3: {
      audioType: 'sine',
      freq: 280,
      text: 'Hello everyone! I am Dr. Sarah James. In my classes, we will break down English grammar and focus heavily on live conversational practice. Let us speak with confidence!'
    },
    t4: {
      audioType: 'square',
      freq: 150,
      text: 'السلام عليكم، أنا الأستاذ محمد الفاتح الكباشي. سنعمل معاً على تبسيط نظريات الفيزياء وحساب التفاضل من خلال نماذج تفاعلية مبسطة.'
    },
    t5: {
      audioType: 'triangle',
      freq: 300,
      text: 'مرحباً، أنا الأستاذة لينا تشنغ. أتطلع لتدريبكم على مهارات الترجمة التجارية وتطبيق اللغة الصينية في قطاع المال والأعمال بطلاقة تامة.'
    }
  };

  const startVoiceSimulation = (teacherId: string) => {
    try {
      // Stop any existing simulation first
      stopVoiceSimulation();

      const intro = voiceIntros[teacherId];
      if (!intro) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();

      osc.type = intro.audioType;
      osc.frequency.setValueAtTime(intro.freq, audioContextRef.current.currentTime);
      
      // Slight pitch variation to simulate voice speech cadence!
      let time = audioContextRef.current.currentTime;
      osc.frequency.setValueAtTime(intro.freq, time);
      osc.frequency.linearRampToValueAtTime(intro.freq + 20, time + 0.5);
      osc.frequency.linearRampToValueAtTime(intro.freq - 15, time + 1.2);
      osc.frequency.linearRampToValueAtTime(intro.freq + 10, time + 2.0);
      osc.frequency.linearRampToValueAtTime(intro.freq, time + 3.0);

      gain.gain.setValueAtTime(0.04, audioContextRef.current.currentTime);
      // Fade out at end of 4.5 seconds
      gain.gain.setValueAtTime(0.04, time + 4.0);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 4.5);

      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);

      osc.start();
      oscillatorRef.current = osc;
      setPlayingTeacherId(teacherId);
      setSubtitles(intro.text);

      // Auto stop after 4.5 seconds
      setTimeout(() => {
        setPlayingTeacherId(currentId => currentId === teacherId ? null : currentId);
      }, 4500);

    } catch (e) {
      console.log('Voice simulation blocked by browser sandbox policies');
    }
  };

  const stopVoiceSimulation = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    setPlayingTeacherId(null);
    setSubtitles('');
  };

  useEffect(() => {
    return () => stopVoiceSimulation();
  }, []);

  const toggleVoiceIntro = (teacherId: string) => {
    if (playingTeacherId === teacherId) {
      stopVoiceSimulation();
    } else {
      startVoiceSimulation(teacherId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-brand-cream pb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-display text-brand-charcoal flex items-center gap-2">
            <Award className="w-6 h-6 text-brand-gold" />
            نخبة المعلمين المتخصصين
          </h3>
          <p className="text-xs text-brand-charcoal/70">
            أعضاء هيئة التدريس المعتمدين والمطورين خصيصاً لتوفير دعم فردي وأكاديمي لكافة مستويات الطلاب واللغات.
          </p>
        </div>
        <span className="text-xs bg-brand-cream text-brand-olive font-bold px-3 py-1.5 rounded-xl">
          18 معلماً معتمداً للعام 2025
        </span>
      </div>

      {/* Subtitle Teleprompter for simulation */}
      <AnimatePresence>
        {playingTeacherId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="bg-brand-olive text-white p-5 rounded-2xl border border-brand-gold/30 shadow-md flex items-center gap-4 text-xs font-semibold leading-relaxed"
          >
            <div className="bg-brand-gold p-2 rounded-xl text-brand-charcoal animate-bounce">
              <Volume2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase tracking-wider text-brand-gold block mb-1">
                استماع لرسالة المعلم الصوتية الترحيبية:
              </span>
              <p>"{subtitles}"</p>
            </div>
            <button
              onClick={stopVoiceSimulation}
              className="text-[10px] bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded transition-colors"
            >
              إيقاف
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEACHERS.map((teacher) => {
          const isPlayingThis = playingTeacherId === teacher.id;
          return (
            <motion.div
              key={teacher.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-brand-cream overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                {/* Header profile */}
                <div className="flex gap-4">
                  <div className="relative">
                    <img 
                      src={teacher.avatar} 
                      alt={teacher.name} 
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border-2 border-brand-cream"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-brand-olive text-white p-1 rounded-lg">
                      <Mic className="w-3 h-3 text-brand-gold" />
                    </div>
                  </div>

                  <div className="text-right">
                    <h4 className="font-bold text-brand-charcoal text-sm">{teacher.name}</h4>
                    <p className="text-[10px] text-brand-olive-light font-medium">{teacher.role}</p>
                    
                    {/* Stars and rating */}
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                      <span className="text-xs font-bold text-brand-charcoal font-display">{teacher.rating}</span>
                      <span className="text-[10px] text-brand-charcoal/50">({teacher.totalStudents} طالب)</span>
                    </div>
                  </div>
                </div>

                {/* Biography */}
                <p className="text-xs text-brand-charcoal/80 leading-relaxed min-h-[50px] line-clamp-3">
                  {teacher.bio}
                </p>

                {/* Badges of stages and languages */}
                <div className="space-y-1.5 border-t border-brand-cream pt-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] text-brand-charcoal/50 font-bold block shrink-0 mt-0.5 ml-1">اللغات:</span>
                    {teacher.languages.map((lang, idx) => (
                      <span key={idx} className="bg-brand-cream text-brand-olive text-[9px] font-bold px-2 py-0.5 rounded">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] text-brand-charcoal/50 font-bold block shrink-0 mt-0.5 ml-1">المراحل:</span>
                    {teacher.stages.map((stg, idx) => (
                      <span key={idx} className="bg-brand-sand text-brand-charcoal/80 text-[9px] font-bold px-2 py-0.5 rounded capitalize">
                        {stg === 'primary' ? 'ابتدائي' : stg === 'intermediate' ? 'متوسط' : stg === 'secondary' ? 'ثانوي' : 'مركز لغات'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="bg-brand-sand/30 px-5 py-3 border-t border-brand-cream flex justify-between items-center text-xs">
                <span className="text-brand-charcoal/60 text-[10px] font-medium block">
                  المواعيد المتاحة اليوم: {teacher.availableHours[0]}
                </span>

                <button
                  onClick={() => toggleVoiceIntro(teacher.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isPlayingThis 
                      ? 'bg-brand-gold text-brand-charcoal animate-pulse shadow-sm' 
                      : 'bg-brand-olive text-white hover:bg-brand-olive/90'
                  }`}
                >
                  {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isPlayingThis ? 'إيقاف التعريف' : 'الرسالة الصوتية'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
