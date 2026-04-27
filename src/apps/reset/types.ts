export type Track = 'fitness' | 'roadmap' | 'brother' | 'ai' | 'japanese' | 'nonneg' | 'reflection';
export type TimeBlock = 'morning' | 'midday' | 'afternoon' | 'evening';

export interface Subtask {
  id: string;
  title: string;
}

export interface Task {
  id: string;
  title: string;
  desc?: string;
  track: Track;
  timeBlock: TimeBlock;
  subtasks?: Subtask[];
}

export interface DayData {
  day: number;
  date: string;
  label: string;
  tasks: Task[];
}

export const TRACK_META: Record<Track, { label: string; icon: string; color: string }> = {
  fitness:    { label: 'Fitness',         icon: '🏃', color: '#f97316' },
  roadmap:    { label: 'Life Roadmap',    icon: '🧠', color: '#a78bfa' },
  brother:    { label: 'Brother',         icon: '👨‍👦', color: '#34d399' },
  ai:         { label: 'AI & Startup',    icon: '🤖', color: '#60a5fa' },
  japanese:   { label: 'Japanese',        icon: '🇯🇵', color: '#f43f5e' },
  nonneg:     { label: 'Non-Negotiables', icon: '📋', color: '#fbbf24' },
  reflection: { label: 'Reflection',      icon: '✍️', color: '#e879f9' },
};

export const TIME_BLOCK_META: Record<TimeBlock, { label: string; icon: string; time: string }> = {
  morning:   { label: 'Morning',          icon: '🌅', time: '5:00–9:00am' },
  midday:    { label: 'Midday Deep Work', icon: '☀️', time: '10:00am–1:00pm' },
  afternoon: { label: 'Afternoon',        icon: '🌤️', time: '2:00–5:00pm' },
  evening:   { label: 'Evening',          icon: '🌙', time: '7:00–10:00pm' },
};
