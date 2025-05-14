import { Meditation } from "../types/Meditation";

export const meditations: Meditation[] = [
  {
    id: "1",
    title: "Finding Calm",
    description: "A meditation to help you find your inner peace and breath.",
    category: "breathing",
    length: "5m",
    audioUrl:
      "https://docs.google.com/uc?export=view&id=1dMtRXUd4l9V1KgmZ765UhOvd1aHZ2MJU",
    imageUrl:
      "https://images.pexels.com/photos/414136/pexels-photo-414136.jpeg",
    featured: false,
    createdAt: "2024-05-01",
  },
  {
    id: "2",
    title: "Drifting into Rest",
    description: "A meditation to bring help you find your dreams.",
    category: "sleep",
    length: "15m",
    audioUrl:
      "https://docs.google.com/uc?export=view&id=1bfsaMNn_wsc88675pTswJF9O-QDWxOzv",
    imageUrl:
      "https://images.pexels.com/photos/1579385/pexels-photo-1579385.jpeg",
    featured: false,
    createdAt: "2024-05-02",
  },
  {
    id: "3",
    title: "Coming Home to Your Body",
    description: "A meditation to help you return to your body.",
    category: "body-scan",
    length: "30m",
    audioUrl:
      "https://docs.google.com/uc?export=view&id=1u_TTGRQFv4S63s8RwB7W8mE-F9l680qu",
    imageUrl:
      "https://images.pexels.com/photos/718324/pexels-photo-718324.jpeg",
    featured: false,
    createdAt: "2024-05-03",
  },
  {
    id: "4",
    title: "Inner Awareness",
    description: "A meditation to help soothe anxious thoughts.",
    category: "anxiety-relief",
    length: "15m",
    audioUrl:
      "https://docs.google.com/uc?export=view&id=1Ju9ITX1tcDicmeEecaTQwJK4GgISHgk0",
    imageUrl:
      "https://images.pexels.com/photos/2882603/pexels-photo-2882603.jpeg",
    featured: false,
    createdAt: "2024-05-04",
  },
  {
    id: "5",
    title: "Head to Toe",
    description: "A body scan meditation to bring you back to yourself.",
    category: "body-scan",
    length: "30m",
    audioUrl:
      "https://docs.google.com/uc?export=view&id=1cfLSFNqKwPQcPDU_mqNMuphLJ1hdAEC2",
    imageUrl:
      "https://images.pexels.com/photos/7459424/pexels-photo-7459424.jpeg",
    featured: true,
    createdAt: "2024-05-05",
  },
  {
    id: "6",
    title: "Meditation for Grief and Loss",
    description: "A meditation for those who have lost.",
    category: "anxiety-relief",
    length: "5m",
    audioUrl:
      "https://docs.google.com/uc?export=view&id=1TMRX80B2YqGa0nxxabaG5ol52bu-7CCs",
    imageUrl:
      "https://images.pexels.com/photos/27366119/pexels-photo-27366119/free-photo-of-view-of-a-field-with-cacti-and-the-mountains-in-the-background.jpeg",
    featured: false,
    createdAt: "2024-05-06",
  },
  {
    id: "7",
    title: "A Walk on the Beach",
    description: "A meditation for Women.",
    category: "women",
    length: "10m",
    audioUrl:
      "https://docs.google.com/uc?export=view&id=1Jt-sR32bgEU1DtVjJx8a24_LVPbm3ljY",
    imageUrl:
      "https://images.pexels.com/photos/2265090/pexels-photo-2265090.jpeg",
    featured: false,
    createdAt: "2024-05-07",
  },
  {
    id: "8",
    title: "Embracing Inner Strength and Peace",
    description: "A meditation to find your inner strength.",
    category: "women",
    length: "10m",
    audioUrl:
      "https://docs.google.com/uc?export=view&id=1OAEHLoZrpTJKR7oHz2CqEkDCAXnPIzUg",
    imageUrl:
      "https://images.pexels.com/photos/2749600/pexels-photo-2749600.jpeg",
    featured: true,
    createdAt: "2024-05-08",
  },
  {
    id: "9",
    title: "You are Doing Enough",
    description: "A meditation for Busy Parents.",
    category: "body-scan",
    length: "30m",
    audioUrl:
      "https://docs.google.com/uc?export=view&id=1HzZC-MqsAr8NX_7Z5LLEdqjMBFHlMe_7",
    imageUrl:
      "https://images.pexels.com/photos/764998/pexels-photo-764998.jpeg",
    featured: false,
    createdAt: "2024-05-09",
  },
  {
    id: "10",
    title: "Releasing Shame and Remembering Your Worth",
    description: "A meditation for Women.",
    category: "guided-imagery",
    length: "45m",
    audioUrl:
      "https://docs.google.com/uc?export=view&id=1dSz08Kamd3D74c5DFCFcjyPUaphV-22p",
    imageUrl:
      "https://images.pexels.com/photos/8979735/pexels-photo-8979735.jpeg",
    featured: false,
    createdAt: "2024-05-10",
  },
];

export const getFeaturedMeditations = (): Meditation[] => {
  return meditations.filter((meditation) => meditation.featured);
};

export const getMeditationsByCategory = (category: string): Meditation[] => {
  return meditations.filter((meditation) => meditation.category === category);
};

export const getMeditationById = (id: string): Meditation | undefined => {
  return meditations.find((meditation) => meditation.id === id);
};

export const searchMeditations = (query: string): Meditation[] => {
  const lowercaseQuery = query.toLowerCase();
  return meditations.filter(
    (meditation) =>
      meditation.title.toLowerCase().includes(lowercaseQuery) ||
      meditation.description.toLowerCase().includes(lowercaseQuery)
  );
};
