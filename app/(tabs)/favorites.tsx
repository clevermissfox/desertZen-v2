import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavoriteMeditations } from '@/hooks/useFavoriteMeditations';
import { useAuth } from '@/context/AuthContext';
import { MeditationCard } from '@/components/MeditationCard';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { meditations } from '@/data/meditations';
import { useTheme } from '@/hooks/useTheme';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import { fontFamilies } from '@/constants/Fonts';

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { favorites, loading, error, isOffline, isFavorite } = useFavoriteMeditations();
  const [refreshing, setRefreshing] = React.useState(false);

  const favoriteMeditations = meditations.filter(meditation => 
    isFavorite(meditation.id)
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // Force a refresh by reloading the component
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>Sign In Required</Text>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Please sign in to view your favorite meditations.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>My Favorites</Text>
      </View>

      <OfflineIndicator isOffline={isOffline} message={error} />

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Loading your favorites...</Text>
          </View>
        ) : favoriteMeditations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No Favorites Yet</Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Start exploring meditations and add them to your favorites to see them here.
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {favoriteMeditations.map((meditation) => (
              <MeditationCard
                key={meditation.id}
                meditation={meditation}
                style={styles.card}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: Typography.fontSizes.xxl,
    fontFamily: fontFamilies.bold,
  },
  content: {
    flex: 1,
  },
  grid: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  card: {
    marginBottom: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  emptyTitle: {
    fontSize: Typography.fontSizes.xl,
    fontFamily: fontFamilies.bold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: Typography.fontSizes.md,
    fontFamily: fontFamilies.regular,
    textAlign: 'center',
    lineHeight: Typography.lineHeights.body * Typography.fontSizes.md,
  },
});