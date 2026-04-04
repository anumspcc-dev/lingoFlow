export interface UserStats {
  xp: number;
  streak: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  dailyGoal: number;
  completedToday: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'Grammar' | 'Vocabulary' | 'Listening' | 'Speaking';
  xpReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Correction {
  original: string;
  corrected: string;
  explanation: string;
}
