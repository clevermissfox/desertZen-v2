import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  addToFavorites,
  removeFromFavorites,
  subscribeToUserFavorites,
  syncLocalFavoritesToFirebase,
  getUserFavorites,
} from "@/firebase/favorites";

interface LocalFavoritesState {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

// Local storage store (fallback for guests and offline)
const useLocalFavoritesStore = create<LocalFavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id: string) => {
        const currentFavorites = get().favorites;
        if (!currentFavorites.includes(id)) {
          set({ favorites: [...currentFavorites, id] });
        }
      },
      removeFavorite: (id: string) => {
        const currentFavorites = get().favorites;
        set({ favorites: currentFavorites.filter((favId) => favId !== id) });
      },
      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

interface FavoritesHookReturn {
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  isOffline: boolean;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

export function useFavoriteMeditations(): FavoritesHookReturn {
  const { user } = useAuth();
  const localStore = useLocalFavoritesStore();
  
  const [firebaseFavorites, setFirebaseFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize Firebase favorites when user logs in
  useEffect(() => {
    if (!user) {
      setFirebaseFavorites([]);
      setHasInitialized(false);
      setIsOffline(false);
      return;
    }

    let unsubscribe: (() => void) | null = null;

    const initializeFirebaseFavorites = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setIsOffline(false);

        // Get local favorites for potential sync
        const localFavorites = localStore.favorites;

        // Sync local favorites to Firebase if user just logged in
        if (localFavorites.length > 0 && !hasInitialized) {
          try {
            await syncLocalFavoritesToFirebase(user.uid, localFavorites);
            // Clear local storage after successful sync
            localStore.clearFavorites();
          } catch (syncError: any) {
            console.log("Sync failed, keeping local favorites:", syncError.message);
            if (syncError.message?.includes("offline")) {
              setIsOffline(true);
            }
          }
        }

        // Subscribe to Firebase favorites
        unsubscribe = subscribeToUserFavorites(user.uid, (favorites) => {
          setFirebaseFavorites(favorites);
          setIsLoading(false);
          setHasInitialized(true);
          setIsOffline(false);
        });

      } catch (err: any) {
        console.error("Error initializing Firebase favorites:", err);
        setError(err.message || "Failed to load favorites");
        setIsLoading(false);
        
        if (err.message?.includes("offline")) {
          setIsOffline(true);
          // Use local favorites when offline
          setFirebaseFavorites(localStore.favorites);
        }
      }
    };

    initializeFirebaseFavorites();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, localStore, hasInitialized]);

  const addFavorite = async (id: string): Promise<void> => {
    try {
      setError(null);
      
      if (user) {
        // Try Firebase first
        try {
          await addToFavorites(user.uid, id);
        } catch (firebaseError: any) {
          // If offline, add to local storage as backup
          if (firebaseError.message?.includes("offline")) {
            setIsOffline(true);
            localStore.addFavorite(id);
            setFirebaseFavorites(prev => [...prev, id]);
          } else {
            throw firebaseError;
          }
        }
      } else {
        // Add to local storage for guests
        localStore.addFavorite(id);
      }
    } catch (err: any) {
      console.error("Error adding favorite:", err);
      setError(err.message || "Failed to add favorite");
      throw err;
    }
  };

  const removeFavorite = async (id: string): Promise<void> => {
    try {
      setError(null);
      
      if (user) {
        // Try Firebase first
        try {
          await removeFromFavorites(user.uid, id);
        } catch (firebaseError: any) {
          // If offline, remove from local storage as backup
          if (firebaseError.message?.includes("offline")) {
            setIsOffline(true);
            localStore.removeFavorite(id);
            setFirebaseFavorites(prev => prev.filter(favId => favId !== id));
          } else {
            throw firebaseError;
          }
        }
      } else {
        // Remove from local storage for guests
        localStore.removeFavorite(id);
      }
    } catch (err: any) {
      console.error("Error removing favorite:", err);
      setError(err.message || "Failed to remove favorite");
      throw err;
    }
  };

  const isFavorite = (id: string): boolean => {
    if (user) {
      return firebaseFavorites.includes(id);
    } else {
      return localStore.isFavorite(id);
    }
  };

  const favorites = user ? firebaseFavorites : localStore.favorites;

  return {
    favorites,
    isLoading,
    error,
    isOffline,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}

// Keep the old export for backward compatibility
export { useFavoriteMeditations };