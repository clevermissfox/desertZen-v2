import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Moon, Sun, Wind, Activity, Map } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import Spacing from '../constants/Spacing';
import Typography from '../constants/Typography';
import { Category } from '../types/Meditation';
import { getMeditationsByCategory } from '../data/meditations';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  const { theme } = useTheme();
  
  // Get actual meditations for this category
  const categoryMeditations = getMeditationsByCategory(category.id);
  
  // Get unique lengths from actual meditations
  const availableLengths = Array.from(new Set(categoryMeditations.map(m => m.length)));
  
  const getIcon = () => {
    switch (category.iconName) {
      case 'sun':
        return <Sun color={theme.primary} size={24} />;
      case 'moon':
        return <Moon color={theme.primary} size={24} />;
      case 'wind':
        return <Wind color={theme.primary} size={24} />;
      case 'activity':
        return <Activity color={theme.primary} size={24} />;
      case 'map':
        return <Map color={theme.primary} size={24} />;
      default:
        return <Sun color={theme.primary} size={24} />;
    }
  };

  const handlePress = () => {
    router.push(`/category/${category.id}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <View style={styles.textContainer}>
        <Text 
          style={[
            styles.title,
            { color: theme.text }
          ]}
          numberOfLines={1}
        >
          {category.name}
        </Text>
        <Text 
          style={[
            styles.description,
            { color: theme.textSecondary }
          ]}
          numberOfLines={2}
        >
          {category.description}
        </Text>
        <View style={styles.lengthsContainer}>
          {availableLengths.map((length, index) => (
            <View 
              key={index} 
              style={[
                styles.lengthBadge,
                { backgroundColor: theme.secondary }
              ]}
            >
              <Text 
                style={[
                  styles.lengthText,
                  { color: '#fff' }
                ]}
              >
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
    flexDirection: 'row',
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
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

export { CategoryCard }