import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { Clock, Heart } from "lucide-react-native";
import { Meditation } from "@/types/Meditation";
import Spacing from "../constants/Spacing";
import Typography from "../constants/Typography";
import { useFavoriteMeditations } from "../hooks/useFavoriteMeditations";
import { useTheme } from "../hooks/useTheme";

interface MeditationCardProps {
  meditation: Meditation;
  featured?: boolean;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (featured) =>
  featured ? width - Spacing.md * 2 : width / 2 - Spacing.md * 1.5;

export default function MeditationCard({
  meditation,
  featured = false,
}: MeditationCardProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteMeditations();

  const favorite = isFavorite(meditation.id);

  const handlePress = () => {
    router.push(`/meditation/${meditation.id}`);
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(meditation.id);
    } else {
      addFavorite(meditation.id);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          width: CARD_WIDTH(featured),
          minHeight: featured ? 280 : 220,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: meditation.imageUrl }}
        style={[styles.image, { height: featured ? 160 : 120 }]}
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          color={theme.accent}
          size={20}
        />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {meditation.title}
        </Text>
        <Text
          style={[styles.description, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {meditation.description}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.categoryContainer}>
            <View
              style={[styles.categoryBadge, { backgroundColor: theme.accent }]}
            >
              <Text style={[styles.categoryText, { color: "#fff" }]}>
                {meditation.category.replace(/-/g, " ")}
              </Text>
            </View>
          </View>
          <View style={styles.lengthContainer}>
            <Ionicons name="time" size={12} color={theme.textTertiary} />
            <Text style={[styles.lengthText, { color: theme.textTertiary }]}>
              {meditation.length}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: Spacing.md,
    borderWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: Typography.fontSizes.sm,
    marginBottom: Spacing.sm,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryContainer: {
    flexDirection: "row",
  },
  categoryBadge: {
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  categoryText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
    textTransform: "capitalize",
  },
  lengthContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  lengthText: {
    fontSize: Typography.fontSizes.xs,
    marginLeft: 4,
  },
});

export { MeditationCard };
