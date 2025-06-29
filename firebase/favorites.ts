import { db } from "./config";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { User } from "firebase/auth";

const FAVORITES_COLLECTION = "userFavorites";

export interface UserFavorites {
  userId: string;
  favorites: string[];
  updatedAt: Date;
}

// Get user's favorites document reference
const getUserFavoritesRef = (userId: string) => {
  return doc(db, FAVORITES_COLLECTION, userId);
};

// Initialize user favorites document if it doesn't exist
export const initializeUserFavorites = async (userId: string): Promise<void> => {
  try {
    const userFavoritesRef = getUserFavoritesRef(userId);
    const docSnap = await getDoc(userFavoritesRef);
    
    if (!docSnap.exists()) {
      await setDoc(userFavoritesRef, {
        userId,
        favorites: [],
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Error initializing user favorites:", error);
    throw error;
  }
};

// Get user's favorites
export const getUserFavorites = async (userId: string): Promise<string[]> => {
  try {
    const userFavoritesRef = getUserFavoritesRef(userId);
    const docSnap = await getDoc(userFavoritesRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as UserFavorites;
      return data.favorites || [];
    }
    
    // Initialize if doesn't exist
    await initializeUserFavorites(userId);
    return [];
  } catch (error) {
    console.error("Error getting user favorites:", error);
    return [];
  }
};

// Add meditation to favorites
export const addToFavorites = async (userId: string, meditationId: string): Promise<void> => {
  try {
    const userFavoritesRef = getUserFavoritesRef(userId);
    
    // Ensure document exists
    await initializeUserFavorites(userId);
    
    await updateDoc(userFavoritesRef, {
      favorites: arrayUnion(meditationId),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

// Remove meditation from favorites
export const removeFromFavorites = async (userId: string, meditationId: string): Promise<void> => {
  try {
    const userFavoritesRef = getUserFavoritesRef(userId);
    
    await updateDoc(userFavoritesRef, {
      favorites: arrayRemove(meditationId),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

// Subscribe to user's favorites changes
export const subscribeToUserFavorites = (
  userId: string,
  callback: (favorites: string[]) => void
): Unsubscribe => {
  const userFavoritesRef = getUserFavoritesRef(userId);
  
  return onSnapshot(
    userFavoritesRef,
    (doc) => {
      if (doc.exists()) {
        const data = doc.data() as UserFavorites;
        callback(data.favorites || []);
      } else {
        // Initialize document if it doesn't exist
        initializeUserFavorites(userId).then(() => {
          callback([]);
        });
      }
    },
    (error) => {
      console.error("Error listening to favorites:", error);
      callback([]);
    }
  );
};

// Sync local favorites to Firebase (for migration)
export const syncLocalFavoritesToFirebase = async (
  userId: string,
  localFavorites: string[]
): Promise<void> => {
  try {
    if (localFavorites.length === 0) return;
    
    const userFavoritesRef = getUserFavoritesRef(userId);
    const docSnap = await getDoc(userFavoritesRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as UserFavorites;
      const existingFavorites = data.favorites || [];
      
      // Merge local favorites with existing ones
      const mergedFavorites = Array.from(new Set([...existingFavorites, ...localFavorites]));
      
      await updateDoc(userFavoritesRef, {
        favorites: mergedFavorites,
        updatedAt: new Date(),
      });
    } else {
      // Create new document with local favorites
      await setDoc(userFavoritesRef, {
        userId,
        favorites: localFavorites,
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Error syncing local favorites to Firebase:", error);
    throw error;
  }
};