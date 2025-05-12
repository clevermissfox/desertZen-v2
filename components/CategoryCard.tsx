import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Moon, Sun, Wind, Activity, Map } from "lucide-react-native";
import { Category } from "@/types/Meditation";
import Spacing from "../constants/Spacing";
import Typography from "../constants/Typography";
import { getMeditationsByCategory } from "../data/meditations";
import { useTheme } from "../hooks/useTheme";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  const { theme } = useTheme();

  // Get actual meditations for this category
  const categoryMeditations = getMeditationsByCategory(category.id);

  // Get unique lengths from actual meditations
  const availableLengths = Array.from(
    new Set(categoryMeditations.map((m) => m.length))
  );

  const getIcon = () => {
    switch (category.iconName) {
      case "sun":
        return <Ionicons name="sunny" color={theme.primary} size={24} />;
      case "moon":
        return <Ionicons name="moon" color={theme.primary} size={24} />;
      case "wind":
        return <Ionicons name="cloudy" color={theme.primary} size={24} />;
      case "activity":
        return <Ionicons name="pulse" color={theme.primary} size={24} />;
      case "map":
        return <Ionicons name="map" color={theme.primary} size={24} />;
      case "logo-electron":
        return (
          <Ionicons name="logo-electron" color={theme.primary} size={24} />
        );
      case "female-outline":
        return (
          <Ionicons name="female-outline" color={theme.primary} size={24} />
        );
      default:
        return <Ionicons name="sunny" color={theme.primary} size={24} />;
    }
  };

  const handlePress = () => {
    router.push(`/category/${category.id}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>{getIcon()}</View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {category.name}
        </Text>
        <Text
          style={[styles.description, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {category.description}
        </Text>
        <View style={styles.lengthsContainer}>
          {availableLengths.map((length, index) => (
            <View
              key={index}
              style={[styles.lengthBadge, { backgroundColor: theme.secondary }]}
            >
              <Text style={[styles.lengthText, { color: "#fff" }]}>
                {length}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
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
  lengthsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  lengthBadge: {
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  lengthText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
  },
});

export { CategoryCard };
