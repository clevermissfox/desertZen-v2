import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
// import { Play, Pause, SkipBack, SkipForward, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useTheme } from "../hooks/useTheme";
import Spacing from "../constants/Spacing";
import Typography from "../constants/Typography";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

interface AudioPlayerControlsProps {
  audioUri: string;
  title: string;
}

export function AudioPlayerControls({
  audioUri,
  title,
}: AudioPlayerControlsProps) {
  const { theme } = useTheme();
  const {
    isPlaying,
    isLoading,
    duration,
    position,
    error,
    play,
    pause,
    skipForward,
    skipBackward,
    onSlidingStart,
    onSlidingComplete,
  } = useAudioPlayer(audioUri);

  const [timeDisplayed, setTimeDisplayed] = useState("0:00");
  const [durationDisplayed, setDurationDisplayed] = useState("0:00");

  useEffect(() => {
    if (duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      setDurationDisplayed(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }
  }, [duration]);

  useEffect(() => {
    const minutes = Math.floor(position / 60000);
    const seconds = Math.floor((position % 60000) / 1000);
    setTimeDisplayed(`${minutes}:${seconds.toString().padStart(2, "0")}`);
  }, [position]);

  const handlePlayPause = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleSkipBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    skipBackward();
  };

  const handleSkipForward = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    skipForward();
  };

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="alert-circle" color={theme.error} size={24} />
        <Text style={[styles.errorText, { color: theme.error }]}>
          Failed to load audio
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, { color: theme.textSecondary }]}>
          {timeDisplayed}
        </Text>
        <Text style={[styles.timeText, { color: theme.textSecondary }]}>
          {durationDisplayed}
        </Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={duration ? position / duration : 0}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.border}
        thumbTintColor={theme.primary}
        disabled={isLoading}
      />

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkipBack}
          disabled={isLoading}
        >
          <Ionicons
            name="play-skip-back"
            color={isLoading ? theme.textTertiary : theme.textSecondary}
            size={28}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.playButton,
            { backgroundColor: theme.primary },
            isLoading && { opacity: 0.7 },
          ]}
          onPress={handlePlayPause}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.card} size="small" />
          ) : isPlaying ? (
            <Ionicons name="pause" color={theme.card} size={28} />
          ) : (
            <Ionicons name="play" color={theme.card} size={28} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkipForward}
          disabled={isLoading}
        >
          <Ionicons
            name="play-skip-forward"
            color={isLoading ? theme.textTertiary : theme.textSecondary}
            size={28}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: 12,
    marginTop: Spacing.lg,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  errorText: {
    fontSize: Typography.fontSizes.md,
    fontFamily: "Inter-Medium",
  },
  title: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.xs,
  },
  timeText: {
    fontSize: Typography.fontSizes.sm,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.md,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
  },
  skipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { AudioPlayerControls };
