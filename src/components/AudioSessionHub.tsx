import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, VolumeX, Mic, MicOff, Users, MessageSquare, Hand, 
  Play, Pause, ArrowRight, Sparkles, Send, BookOpen, AlertCircle, 
  HelpCircle, Check, Award
} from 'lucide-react';
import { LIVE_SESSIONS, TEACHERS } from '../data';
import { LiveSession, Teacher } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function AudioSessionHub() {
  const [activeSession, setActiveSession] = useState<LiveSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [handRaiseMessage, setHandRaiseMessage] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  
  // Simulated chat messages
  const [messages, setMessages] = useState([
    { sender: 'أ. عبد الرحمن (المعلم)', text: 'أهلاً بكم يا أبنائي في هذه الجلسة الصوتية المباشرة. جاهزون للبدء؟', isTeacher: true },
    { sender: 'أحمد السوداني (طالب)', text: 'نعم يا أستاذ، متحمس جداً لحضور الدرس وتجربة المنصة.', isTeacher: false },
    { sender: 'الأستاذة وانغ لي (المعلمة)', text: 'مرحباً بالجميع! اليوم سنتدرب على نطق النغمات الصينية الأربعة.', isTeacher: true }
  ]);

  // Audio simulation (using standard browser Web Audio API oscillator or synthesis for sound, or standard ambient waves)
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Filter sessions
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'primary' | 'intermediate' | 'secondary' | 'language_center'>('all');

  const filteredSessions = LIVE_SESSIONS.filter(session => {
    if (selectedFilter === 'all') return true;
    return session.stageId === selectedFilter;
  });

  const getTeacherForSession = (teacherId: string): Teacher | undefined => {
    return TEACHERS.find(t => t.id === teacherId);
  };

  // Start sound simulation
  const startAudioSimulation = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // We will generate a very pleasant, soft background meditative chime or tone to simulate live audio stream
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();

      osc.type = 'triangle';
      // Low, soothing frequency (e.g. 220Hz for warmth)
      osc.frequency.setValueAtTime(220, audioContextRef.current.currentTime);
      
      // Low volume so it is pleasant and not loud
      gain.gain.setValueAtTime(0.04, audioContextRef.current.currentTime);

      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (e) {
      console.log('Audio simulation not supported or blocked by browser policy');
    }
  };

  const stopAudioSimulation = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying && activeSession) {
      startAudioSimulation();
    } else {
      stopAudioSimulation();
    }
    return () => stopAudioSimulation();
  }, [isPlaying, activeSession]);

  const handleJoinSession = (session: LiveSession) => {
    setActiveSession(session);
    setIsPlaying(true);
    setIsHandRaised(false);
    setHandRaiseMessage(null);
    
    // Add custom welcome message in chat specific to session
    const teacher = getTeacherForSession(session.teacherId);
    setMessages([
      { 
        sender: `${teacher?.name || 'المعلم'} (المعلم)`, 
        text: `أهلاً بك في البث الصوتي المباشر لـ "${session.subjectName}". سنناقش اليوم النقاط الرئيسية في الدرس.`, 
        isTeacher: true 
      },
      { 
        sender: 'نظام شموس الريادة', 
        text: 'تم الاتصال بالخادم الصوتي بجودة عالية (HD). الميكروفون الخاص بك مكتوم حالياً بشكل تلقائي.', 
        isTeacher: false 
      }
    ]);
  };

  const handleLeaveSession = () => {
    stopAudioSimulation();
    setActiveSession(null);
    setIsPlaying(false);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(!isMuted ? 0 : 0.04, audioContextRef.current.currentTime);
    }
  };

  const handleRaiseHand = () => {
    setIsHandRaised(true);
    setHandRaiseMessage('تم إرسال طلب التحدث إلى المعلم. سيتم إعطاؤك الإذن قريباً للمشاركة بصوتك.');
    
    // Add to chat
    setMessages(prev => [
      ...prev,
      { sender: 'أنت (المتدرب)', text: '🙋‍♂️ قمت برفع يدي لطلب التحدث والمشاركة الصوتية.', isTeacher: false }
    ]);

    // Simulate teacher giving permission after 4 seconds
    setTimeout(() => {
      setHandRaiseMessage('مرحباً! لقد منحك المعلم الميكروفون الآن. اضغط على زر الميكروفون للبدء بالحديث.');
      setMessages(prev => [
        ...prev,
        { sender: 'أ. عبد الرحمن (المعلم)', text: 'تفضل يا بني، الميكروفون متاح لك الآن للمشاركة وسماع صوتك.', isTeacher: true }
      ]);
    }, 4500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'أنت (المتدرب)', text: chatInput, isTeacher: false };
    setMessages(prev => [...prev, userMsg]);
    const query = chatInput;
    setChatInput('');

    // Simulate teacher smart response after 2.5 seconds
    setTimeout(() => {
      let reply = '';
      const lowercaseQuery = query.toLowerCase();
      
      if (lowercaseQuery.includes('سلام') || lowercaseQuery.includes('مرحب')) {
        reply = 'وعليكم السلام ورحمة الله وبركاته، أهلاً بك معنا في مدرسة شموس الريادة التعليمية. كيف يمكنني مساعدتك في درس اليوم؟';
      } else if (lowercaseQuery.includes('صين') || lowercaseQuery.includes('صينية') || lowercaseQuery.includes('hsk')) {
        reply = 'ممتاز! النطق في الصينية يعتمد بشكل أساسي على تكرار النغمات الأربعة (Ma, Má, Mǎ, Mà). سنكررها معاً الآن عبر البث الصوتي.';
      } else if (lowercaseQuery.includes('سودان') || lowercaseQuery.includes('منحة') || lowercaseQuery.includes('مساعدة')) {
        reply = 'نحن هنا لخدمتكم ودعم مسيرتكم الأكاديمية بالكامل. منصة شموس الريادة تضمن حصولكم على كامل الحصص مجاناً وبأعلى جودة صوتية.';
      } else if (lowercaseQuery.includes('انجليزي') || lowercaseQuery.includes('english')) {
        reply = "English is all about confidence! In Shomoos platform, we focus heavily on active listening and daily speaking sessions to boost your fluency.";
      } else {
        reply = 'سؤال ذكي جداً ومهم! قمت بتسجيل هذه الملاحظة وسنشرحها بالتفصيل الصوتي المباشر خلال الدقائق القادمة من البث.';
      }

      const teacher = getTeacherForSession(activeSession?.teacherId || '');
      setMessages(prev => [
        ...prev,
        { sender: `${teacher?.name || 'المعلم'} (المعلم)`, text: reply, isTeacher: true }
      ]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {!activeSession ? (
        // Session List Dashboard
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-brand-charcoal flex items-center gap-2">
                <Volume2 className="w-6 h-6 text-brand-gold animate-pulse" />
                مركز الجلسات الصوتية الحية
              </h3>
              <p className="text-xs text-brand-charcoal/70">
                انضم فوراً إلى البث الصوتي المباشر مع معلمي مدرسة شموس الريادة واستمع للشرح أو شارك بصوتك.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-brand-cream/60 p-1.5 rounded-xl border border-brand-cream">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'primary', label: 'الابتدائية' },
                { id: 'intermediate', label: 'المتوسطة' },
                { id: 'secondary', label: 'الثانوية' },
                { id: 'language_center', label: 'مركز اللغات' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedFilter === tab.id
                      ? 'bg-brand-olive text-white shadow-sm'
                      : 'text-brand-charcoal hover:bg-brand-sand'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSessions.map((session) => {
              const teacher = getTeacherForSession(session.teacherId);
              return (
                <motion.div
                  key={session.id}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-2xl border border-brand-cream overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="p-5 space-y-4">
                    {/* Status badge & title */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-brand-olive bg-brand-olive/10 px-2.5 py-0.5 rounded-full">
                          {session.subjectName}
                        </span>
                        <h4 className="font-bold text-brand-charcoal text-base mt-1 leading-snug">
                          {session.title}
                        </h4>
                      </div>
                      
                      {session.isActive ? (
                        <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-600 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse border border-red-500/20">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          مباشر الآن
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold-dark px-2.5 py-1 rounded-full text-xs font-semibold border border-brand-gold/20">
                          <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                          {session.startTime}
                        </span>
                      )}
                    </div>

                    {/* Teacher profile summary */}
                    {teacher && (
                      <div className="flex items-center gap-3 bg-brand-sand/30 p-3 rounded-xl border border-brand-cream/50">
                        <img 
                          src={teacher.avatar} 
                          alt={teacher.name} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="text-right">
                          <h5 className="font-bold text-brand-charcoal text-xs">{teacher.name}</h5>
                          <p className="text-[10px] text-brand-olive-light">{teacher.role}</p>
                        </div>
                      </div>
                    )}

                    {/* Key lesson content bullets */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-brand-charcoal/60 block">محاور الجلسة الرئيسية:</span>
                      <ul className="text-xs text-brand-charcoal/80 space-y-1 pl-0 pr-3 list-disc">
                        {session.lessonContent?.slice(0, 2).map((bullet, idx) => (
                          <li key={idx} className="marker:text-brand-gold">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Join action bar */}
                  <div className="bg-brand-sand/40 px-5 py-3 border-t border-brand-cream flex justify-between items-center text-xs">
                    <span className="text-brand-charcoal/60 flex items-center gap-1 font-medium">
                      <Users className="w-4 h-4 text-brand-olive-light" />
                      {session.isActive ? `${session.activeListeners} يستمعون حالياً` : 'بدون مستمعين'}
                    </span>

                    {session.isActive ? (
                      <button
                        onClick={() => handleJoinSession(session)}
                        className="flex items-center gap-1 px-4 py-2 bg-brand-olive text-white font-bold rounded-lg hover:bg-brand-olive/95 transition-all cursor-pointer shadow-sm"
                      >
                        <Volume2 className="w-4 h-4 animate-bounce" />
                        دخول واستماع مباشر
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex items-center gap-1 px-4 py-2 bg-brand-cream text-brand-charcoal/50 font-bold rounded-lg cursor-not-allowed"
                      >
                        بانتظار المعلم
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Immersive Active Audio Classroom/Room UI */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-charcoal rounded-3xl overflow-hidden text-white shadow-2xl border border-white/5"
        >
          {/* Header row */}
          <div className="bg-black/45 p-5 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLeaveSession}
                className="p-2 rounded-xl bg-white/5 text-brand-cream hover:bg-white/10 transition-colors cursor-pointer"
                title="الخروج والعودة"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <div>
                <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-2.5 py-0.5 rounded-full font-bold border border-brand-gold/30">
                  {activeSession.subjectName}
                </span>
                <h4 className="text-base md:text-lg font-bold font-display text-white mt-1">
                  {activeSession.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch md:self-auto justify-between">
              <span className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                بث حي مباشر (HD)
              </span>
              <button
                onClick={handleLeaveSession}
                className="px-4 py-1.5 bg-white/10 text-white rounded-lg hover:bg-red-600 hover:text-white transition-colors cursor-pointer text-xs font-bold"
              >
                مغادرة الجلسة
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left/Middle: Voice Wave & Teacher Showcase */}
            <div className="lg:col-span-2 p-6 md:p-8 space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-l border-white/5 bg-gradient-to-b from-brand-charcoal to-black/40">
              
              {/* Teacher profile & simulated voice notes */}
              <div className="flex flex-col md:flex-row items-center gap-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="relative">
                  <img 
                    src={getTeacherForSession(activeSession.teacherId)?.avatar} 
                    alt="Teacher" 
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-brand-olive-light shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-brand-gold text-brand-charcoal p-1.5 rounded-xl shadow-lg">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-center md:text-right space-y-2 flex-1">
                  <div className="inline-flex items-center gap-1.5 bg-brand-olive/30 text-brand-olive-light px-2.5 py-0.5 rounded text-[10px] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    المعلم الرئيسي المتخصص
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">{getTeacherForSession(activeSession.teacherId)?.name}</h4>
                  <p className="text-xs text-brand-cream/80">{getTeacherForSession(activeSession.teacherId)?.role}</p>
                  <p className="text-[11px] text-brand-cream/60 line-clamp-2 leading-relaxed">
                    {getTeacherForSession(activeSession.teacherId)?.bio}
                  </p>
                </div>
              </div>

              {/* Active Audio Wave Visualizer Simulation */}
              <div className="py-8 text-center space-y-4">
                <p className="text-xs text-brand-cream/70">مستوى ذبذبة الصوت واستقبال البث الحي من ميكروفون المعلم:</p>
                
                <div className="flex justify-center items-end gap-1 h-20 px-4">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const isMutedState = !isPlaying || isMuted;
                    // Random height generator based on playing state
                    const animDelay = `${i * 0.05}s`;
                    const animDuration = isMutedState ? '0s' : `${0.4 + Math.random() * 0.6}s`;
                    
                    return (
                      <motion.div
                        key={i}
                        animate={isMutedState ? { height: 4 } : { height: [4, 15 + Math.random() * 55, 4] }}
                        transition={{
                          repeat: Infinity,
                          duration: isPlaying ? 0.6 + Math.random() * 0.5 : 1,
                          delay: i * 0.03,
                          ease: "easeInOut"
                        }}
                        className={`w-1.5 rounded-full transition-colors ${
                          isMutedState 
                            ? 'bg-white/10' 
                            : i % 2 === 0 
                              ? 'bg-brand-gold' 
                              : 'bg-brand-olive-light'
                        }`}
                        style={{ height: '4px' }}
                      />
                    );
                  })}
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isPlaying 
                        ? 'bg-brand-gold text-brand-charcoal shadow-lg hover:bg-brand-gold/90' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'استماع للبث الصوتي' : 'تشغيل البث'}
                  </button>

                  <button
                    onClick={handleToggleMute}
                    className={`p-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                      isMuted 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-white/5 text-brand-cream hover:bg-white/10'
                    }`}
                    title={isMuted ? 'إلغاء كتم البث' : 'كتم البث'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Subtitles / Interactive Slides Bullets */}
              <div className="bg-black/30 p-5 rounded-2xl border border-white/5 space-y-3">
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block">شرائح الدرس والمعلومات المعروضة حالياً:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeSession.lessonContent?.map((bullet, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-xs text-brand-cream/90 bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-brand-gold font-bold bg-brand-gold/10 px-2 py-0.5 rounded h-fit">{idx + 1}</span>
                      <p className="leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trainee Micro Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 pt-4">
                <div className="text-xs text-brand-cream/70 flex items-center gap-2">
                  <MicOff className="w-4 h-4 text-red-400" />
                  الميكروفون الخاص بك مغلق تلقائياً لراحة البث. ارفع يدك للمشاركة وسماع صوتك.
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleRaiseHand}
                    disabled={isHandRaised && !handRaiseMessage?.includes('منحك')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isHandRaised 
                        ? 'bg-brand-olive/30 text-brand-olive-light border border-brand-olive/40' 
                        : 'bg-brand-olive text-white hover:bg-brand-olive/90'
                    }`}
                  >
                    <Hand className="w-4 h-4" />
                    {isHandRaised ? 'تم طلب التحدث' : 'طلب التحدث (رفع اليد)'}
                  </button>
                </div>
              </div>

              {/* Toast message for Hand Raise status */}
              {handRaiseMessage && (
                <div className="bg-brand-gold text-brand-charcoal p-3.5 rounded-xl flex gap-3 text-xs font-semibold items-center border border-brand-gold/50 shadow-lg animate-bounce mt-3">
                  <Sparkles className="w-5 h-5 flex-shrink-0 animate-spin" />
                  <p className="leading-relaxed">{handRaiseMessage}</p>
                </div>
              )}
            </div>

            {/* Right Side: Live Chat Panel */}
            <div className="p-5 flex flex-col justify-between h-[500px] lg:h-auto bg-black/25">
              <div className="space-y-3 pb-3 border-b border-white/5">
                <h5 className="font-bold text-xs text-brand-cream flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-brand-gold" />
                  المحادثة النصية التفاعلية
                </h5>
                <p className="text-[10px] text-brand-cream/60">اطرح سؤالك وسيقوم المعلم بالرد عليك فورياً بالكلام أو الكتابة.</p>
              </div>

              {/* Message History Scroller */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 px-1 custom-scrollbar text-xs">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.isTeacher 
                        ? 'bg-brand-olive/25 border border-brand-olive/30 text-white mr-auto rounded-tl-none' 
                        : 'bg-white/10 text-brand-cream ml-auto rounded-tr-none'
                    }`}
                  >
                    <span className="block text-[9px] font-bold text-brand-gold mb-1">{msg.sender}</span>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Message Sender Form */}
              <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-white/5 pt-3">
                <input
                  type="text"
                  placeholder="اكتب سؤالك هنا..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-brand-gold text-brand-charcoal rounded-xl hover:bg-brand-gold/90 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
