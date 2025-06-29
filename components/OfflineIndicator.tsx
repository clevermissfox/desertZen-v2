import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import { fontFamilies } from '@/constants/Fonts';

interface OfflineIndicatorProps {
  isOffline: boolean;
  message?: string | null;
}

export function OfflineIndicator({ isOffline, message }: OfflineIndicatorProps) {
  const { theme } = useTheme();
  
  if (!isOffline && !message) return null;

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.warning + '20',
      borderColor: theme.warning,
    }]}>
      <Ionicons name="wifi-outline" size={16} color={theme.warning} />
      <Text style={[styles.text, { color: theme.text }]}>
        {message || 'You\'re offline. Some features may be limited.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
  },
  text: {
    fontSize: Typography.fontSizes.sm,
    fontFamily: fontFamilies.regular,
    marginLeft: Spacing.sm,
    flex: 1,
  },
});