import { Meditation } from '../types/Meditation';

export const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Morning Sunrise',
    description: 'Begin your day with this gentle meditation to set positive intentions and energize your mind.',
    category: 'morning',
    length: '10m',
    audioUrl: 'https://icodethis.com/audio/forest.mp3',
    imageUrl: 'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg',
    featured: true,
    createdAt: '2024-05-01',
  },
  {
    id: '2',
    title: 'Calm Waters',
    description: 'Reduce anxiety with this soothing meditation focused on deep breathing and relaxation.',
    category: 'anxiety-stress',
    length: '15m',
    audioUrl: 'https://icodethis.com/audio/garage.mp3',
    imageUrl: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg',
    featured: true,
    createdAt: '2024-05-02',
  },
  {
    id: '3',
    title: 'Peaceful Night',
    description: 'Prepare for sleep with this gentle meditation that helps quiet the mind.',
    category: 'sleep',
    length: '30m',
    audioUrl: 'https://icodethis.com/audio/forest.mp3',
    imageUrl: 'https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg',
    featured: false,
    createdAt: '2024-05-03',
  },
  {
    id: '4',
    title: 'Body Awareness',
    description: 'A progressive body scan to help you connect with physical sensations and release tension.',
    category: 'body-scan',
    length: '15m',
    audioUrl: 'https://icodethis.com/audio/forest.mp3',
    imageUrl: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg',
    featured: false,
    createdAt: '2024-05-04',
  },
  {
    id: '5',
    title: 'Mountain Journey',
    description: 'A guided imagery meditation that takes you on a peaceful journey through a mountain landscape.',
    category: 'guided-imagery',
    length: '30m',
    audioUrl: 'https://icodethis.com/audio/forest.mp3',
    imageUrl: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg',
    featured: true,
    createdAt: '2024-05-05',
  },
  {
    id: '6',
    title: 'Quick Calm',
    description: 'A brief meditation for moments when you need to quickly center yourself.',
    category: 'anxiety-stress',
    length: '5m',
    audioUrl: 'https://icodethis.com/audio/forest.mp3',
    imageUrl: 'https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg',
    featured: false,
    createdAt: '2024-05-06',
  },
  {
    id: '7',
    title: 'Deep Sleep',
    description: 'A longer meditation designed to help you fall into a deep, restful sleep.',
    category: 'sleep',
    length: '45m',
    audioUrl: 'https://icodethis.com/audio/forest.mp3',
    imageUrl: 'https://images.pexels.com/photos/3560168/pexels-photo-3560168.jpeg',
    featured: false,
    createdAt: '2024-05-07',
  },
  {
    id: '8',
    title: 'Dawn Awakening',
    description: 'Start your day with mindfulness and gratitude in this short morning practice.',
    category: 'morning',
    length: '5m',
    audioUrl: 'https://icodethis.com/audio/forest.mp3',
    imageUrl: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
    featured: false,
    createdAt: '2024-05-08',
  },
  {
    id: '9',
    title: 'Complete Body Scan',
    description: 'A comprehensive scan to release tension from head to toe.',
    category: 'body-scan',
    length: '30m',
    audioUrl: 'https://icodethis.com/audio/forest.mp3',
    imageUrl: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg',
    featured: false,
    createdAt: '2024-05-09',
  },
  {
    id: '10',
    title: 'Ocean Waves',
    description: 'A guided journey to a peaceful beach where you can relax to the sound of gentle waves.',
    category: 'guided-imagery',
    length: '45m',
    audioUrl: 'https://icodethis.com/audio/forest.mp3',
    imageUrl: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
    featured: false,
    createdAt: '2024-05-10',
  },
];

export const getFeaturedMeditations = (): Meditation[] => {
  return meditations.filter(meditation => meditation.featured);
};

export const getMeditationsByCategory = (category: string): Meditation[] => {
  return meditations.filter(meditation => meditation.category === category);
};

export const getMeditationById = (id: string): Meditation | undefined => {
  return meditations.find(meditation => meditation.id === id);
};

export const searchMeditations = (query: string): Meditation[] => {
  const lowercaseQuery = query.toLowerCase();
  return meditations.filter(
    meditation =>
      meditation.title.toLowerCase().includes(lowercaseQuery) ||
      meditation.description.toLowerCase().includes(lowercaseQuery)
  );
};