import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '@/firebase/config';
import { useAuth } from '@/context/AuthContext';

export function useFavoriteMeditations() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const { user } = useAuth();

  const initializeUserFavorites = async (userId: string) => {
    try {
      setError(null);
      setIsOffline(false);
      
      const userFavoritesRef = doc(db, 'userFavorites', userId);
      const docSnap = await getDoc(userFavoritesRef);
      
      if (!docSnap.exists()) {
        // Create new favorites document
        await setDoc(userFavoritesRef, { favorites: [] });
        setFavorites([]);
      } else {
        setFavorites(docSnap.data().favorites || []);
      }
    } catch (err: any) {
      console.error('Error initializing user favorites:', err);
      
      // Handle offline state gracefully
      if (err.code === 'unavailable' || err.message?.includes('offline')) {
        setIsOffline(true);
        setError('You\'re currently offline. Favorites will sync when connection is restored.');
        // Load from AsyncStorage as fallback
        try {
          const localFavorites = await AsyncStorage.getItem(`favorites_${userId}`);
          if (localFavorites) {
            setFavorites(JSON.parse(localFavorites));
          }
        } catch (storageError) {
          console.error('Error loading from AsyncStorage:', storageError);
        }
      } else {
        setError('Failed to load favorites. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      setError(null);
      setIsOffline(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const setupFavorites = async () => {
      try {
        await initializeUserFavorites(user.uid);
        
        // Set up real-time listener only if not offline
        if (!isOffline) {
          const userFavoritesRef = doc(db, 'userFavorites', user.uid);
          unsubscribe = onSnapshot(
            userFavoritesRef,
            async (doc) => {
              if (doc.exists()) {
                const newFavorites = doc.data().favorites || [];
                setFavorites(newFavorites);
                // Cache locally
                try {
                  await AsyncStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites));
                } catch (storageError) {
                  console.error('Error saving to AsyncStorage:', storageError);
                }
              }
              setError(null);
              setIsOffline(false);
            },
            (error) => {
              console.error('Error listening to favorites:', error);
              if (error.code === 'unavailable') {
                setIsOffline(true);
                setError('You\'re currently offline. Changes will sync when connection is restored.');
              }
            }
          );
        }
      } catch (err) {
        console.error('Error setting up favorites:', err);
      }
    };

    setupFavorites();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, isOffline]);

  const addToFavorites = async (meditationId: string) => {
    if (!user) return;

    try {
      // Optimistic update
      const newFavorites = [...favorites, meditationId];
      setFavorites(newFavorites);
      
      // Cache locally
      try {
        await AsyncStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites));
      } catch (storageError) {
        console.error('Error saving to AsyncStorage:', storageError);
      }

      if (!isOffline) {
        const userFavoritesRef = doc(db, 'userFavorites', user.uid);
        await updateDoc(userFavoritesRef, {
          favorites: arrayUnion(meditationId)
        });
      }
    } catch (error: any) {
      console.error('Error adding to favorites:', error);
      // Revert optimistic update
      setFavorites(favorites);
      
      if (error.code === 'unavailable') {
        setIsOffline(true);
        setError('You\'re offline. This change will sync when connection is restored.');
      }
    }
  };

  const removeFromFavorites = async (meditationId: string) => {
    if (!user) return;

    try {
      // Optimistic update
      const newFavorites = favorites.filter(id => id !== meditationId);
      setFavorites(newFavorites);
      
      // Cache locally
      try {
        await AsyncStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites));
      } catch (storageError) {
        console.error('Error saving to AsyncStorage:', storageError);
      }

      if (!isOffline) {
        const userFavoritesRef = doc(db, 'userFavorites', user.uid);
        await updateDoc(userFavoritesRef, {
          favorites: arrayRemove(meditationId)
        });
      }
    } catch (error: any) {
      console.error('Error removing from favorites:', error);
      // Revert optimistic update
      setFavorites(favorites);
      
      if (error.code === 'unavailable') {
        setIsOffline(true);
        setError('You\'re offline. This change will sync when connection is restored.');
      }
    }
  };

  const isFavorite = (meditationId: string) => {
    return favorites.includes(meditationId);
  };

  return {
    favorites,
    loading,
    error,
    isOffline,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    // Add aliases for backward compatibility
    addFavorite: addToFavorites,
    removeFavorite: removeFromFavorites,
  };
}