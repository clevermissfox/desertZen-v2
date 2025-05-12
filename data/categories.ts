import { Category } from '../types/Meditation';

export const categories: Category[] = [
  {
    id: 'morning',
    name: 'Morning Meditation',
    description: 'Start your day with clarity and intention.',
    iconName: 'sun',
    availableLengths: ['5m', '10m', '15m'],
  },
  {
    id: 'anxiety-stress',
    name: 'Anxiety & Stress',
    description: 'Find calm and peace in moments of stress.',
    iconName: 'wind',
    availableLengths: ['5m', '15m', '30m', '45m', '60m'],
  },
  {
    id: 'sleep',
    name: 'Sleep',
    description: 'Prepare your mind for restful sleep.',
    iconName: 'moon',
    availableLengths: ['15m', '30m', '45m'],
  },
  {
    id: 'body-scan',
    name: 'Body Scan',
    description: 'Develop awareness of sensations throughout your body.',
    iconName: 'activity',
    availableLengths: ['15m', '30m'],
  },
  {
    id: 'guided-imagery',
    name: 'Guided Imagery',
    description: 'Journey through visualizations for healing and growth.',
    iconName: 'map',
    availableLengths: ['15m', '30m', '45m'],
  },
];