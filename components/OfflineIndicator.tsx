import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface OfflineIndicatorProps {
  isOffline: boolean;
  message?: string;
}

export function OfflineIndicator({ isOffline, message }: OfflineIndicatorProps) {
  if (!isOffline) return null;

  return (
    <View style={styles.container}>
      <WifiOff size={16} color={Colors.warning} />
      <Text style={styles.text}>
        {message || 'You\'re offline. Some features may be limited.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warningLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.warning,
  },
  text: {
    ...Typography.caption,
    color: Colors.warningDark,
    marginLeft: 8,
    flex: 1,
  },
});