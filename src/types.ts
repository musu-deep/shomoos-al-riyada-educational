export type AcademicStageId = 'primary' | 'intermediate' | 'secondary' | 'language_center';

export interface Subject {
  id: string;
  name: string;
  englishName: string;
  description: string;
  iconName: string;
  topics: string[];
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  stages: AcademicStageId[];
  languages: string[];
  bio: string;
  avatar: string;
  voiceSampleUrl?: string;
  rating: number;
  totalStudents: number;
  availableHours: string[];
}

export interface LiveSession {
  id: string;
  title: string;
  teacherId: string;
  stageId: AcademicStageId;
  subjectName: string;
  startTime: string;
  durationMinutes: number;
  isActive: boolean;
  activeListeners: number;
  audioUrl?: string; // Simulation audio
  lessonContent?: string[]; // Slide bullets or interactive cards
}

export interface CustomTrainingPlan {
  id: string;
  studentName: string;
  studentPhone: string;
  stageId: AcademicStageId;
  selectedSubjects: string[];
  preferredLanguages: string[];
  weeklyHours: number;
  learningGoals: string[];
  sessionTimePreference: 'morning' | 'afternoon' | 'evening';
  needSpecialSupport: boolean;
  supportDetails?: string;
  createdAt: string;
  estimatedCost: number;
}
