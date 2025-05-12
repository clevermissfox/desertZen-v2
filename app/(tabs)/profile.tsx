import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { ThemeToggle } from "../../components/ThemeToggle";
import Spacing from "../../constants/Spacing";
import Typography from "../../constants/Typography";
import { Ionicons } from "@expo/vector-icons";
// import {
//   User,
//   Bell,
//   Moon,
//   Volume2,
//   Clock,
//   Download,
//   Settings,
//   ChevronRight,
// } from "lucide-react-native";

export default function ProfileScreen() {
  const { theme, isDark, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoDownloadEnabled, setAutoDownloadEnabled] = useState(false);

  // Placeholder for user login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const SettingItem = ({
    icon,
    title,
    onPress,
    showToggle = false,
    toggleValue = false,
    onToggleChange = () => {},
  }) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: theme.border }]}
      onPress={onPress}
    >
      <View style={styles.settingIconContainer}>{icon}</View>
      <Text style={[styles.settingText, { color: theme.text }]}>{title}</Text>
      <View style={styles.settingRightContainer}>
        {showToggle ? (
          <Switch
            value={toggleValue}
            onValueChange={onToggleChange}
            trackColor={{
              false: isDark ? theme.border : "#D1D5DB",
              true: theme.accent,
            }}
            thumbColor={Platform.select({
              web: toggleValue ? "#ffffff" : isDark ? "#ffffff" : "#F3F4F6",
              default: isDark ? "#ffffff" : toggleValue ? "#ffffff" : "#F3F4F6",
            })}
            ios_backgroundColor={isDark ? theme.border : "#D1D5DB"}
            style={Platform.select({
              web: {
                opacity: 1,
                transform: [{ scale: 0.8 }],
              },
              default: {},
            })}
          />
        ) : (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.textTertiary}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const GuestView = () => (
    <View style={styles.guestContainer}>
      <View
        style={[
          styles.guestIconContainer,
          { backgroundColor: theme.secondaryLight },
        ]}
      >
        <Ionicons name="person" size={40} color={theme.primary} />
      </View>
      <Text style={[styles.guestTitle, { color: theme.text }]}>Guest Mode</Text>
      <Text style={[styles.guestText, { color: theme.textSecondary }]}>
        Create an account to save your favorites and track your progress.
      </Text>
      <TouchableOpacity
        style={[styles.loginButton, { backgroundColor: theme.primary }]}
        onPress={() => setIsLoggedIn(true)} // Just for demo
      >
        <Text style={styles.loginButtonText}>Sign In / Sign Up</Text>
      </TouchableOpacity>
    </View>
  );

  const UserProfileView = () => (
    <View style={styles.userProfileContainer}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
        }}
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: theme.text }]}>John Doe</Text>
        <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
          john.doe@example.com
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.editButton, { borderColor: theme.border }]}
        onPress={() => {}}
      >
        <Text style={[styles.editButtonText, { color: theme.primary }]}>
          Edit Profile
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
        <ThemeToggle />
      </View>

      {isLoggedIn ? <UserProfileView /> : <GuestView />}

      <View style={styles.settingsContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          App Settings
        </Text>

        <View
          style={[
            styles.settingsGroup,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <SettingItem
            icon={
              <Ionicons name="notifications" size={22} color={theme.primary} />
            }
            title="Notifications"
            showToggle={true}
            toggleValue={notificationsEnabled}
            onToggleChange={setNotificationsEnabled}
            onPress={() => {}}
          />

          <SettingItem
            icon={<Ionicons name="moon" size={22} color={theme.primary} />}
            title="Dark Mode"
            showToggle={true}
            toggleValue={isDark}
            onToggleChange={(value) => setTheme(value)}
            onPress={() => {}}
          />

          <SettingItem
            icon={<Ionicons name="download" size={22} color={theme.primary} />}
            title="Auto Download"
            showToggle={true}
            toggleValue={autoDownloadEnabled}
            onToggleChange={setAutoDownloadEnabled}
            onPress={() => {}}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Playback
        </Text>

        <View
          style={[
            styles.settingsGroup,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <SettingItem
            icon={
              <Ionicons name="volume-high" size={22} color={theme.primary} />
            }
            title="Audio Quality"
            onPress={() => {}}
          />

          <SettingItem
            icon={<Ionicons name="time" size={22} color={theme.primary} />}
            title="Sleep Timer"
            onPress={() => {}}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Other</Text>

        <View
          style={[
            styles.settingsGroup,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <SettingItem
            icon={<Ionicons name="settings" size={22} color={theme.primary} />}
            title="About Desert Zen"
            onPress={() => {}}
          />

          {isLoggedIn && (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => setIsLoggedIn(false)} // Just for demo
            >
              <Text style={[styles.logoutText, { color: theme.error }]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={[styles.versionText, { color: theme.textTertiary }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSizes.xxl,
    fontFamily: "Inter-Bold",
  },
  guestContainer: {
    alignItems: "center",
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  guestIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  guestTitle: {
    fontFamily: "Inter-Bold",
    fontSize: Typography.fontSizes.xl,
    marginBottom: Spacing.sm,
  },
  guestText: {
    fontFamily: "Inter-Regular",
    fontSize: Typography.fontSizes.md,
    textAlign: "center",
    marginBottom: Spacing.lg,
    lineHeight: Typography.lineHeights.body * Typography.fontSizes.md,
  },
  loginButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: 24,
  },
  loginButtonText: {
    color: "white",
    fontFamily: "Inter-Medium",
    fontSize: Typography.fontSizes.md,
  },
  userProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
    marginLeft: Spacing.lg,
  },
  userName: {
    fontFamily: "Inter-Bold",
    fontSize: Typography.fontSizes.lg,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontFamily: "Inter-Regular",
    fontSize: Typography.fontSizes.md,
  },
  editButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  editButtonText: {
    fontFamily: "Inter-Medium",
    fontSize: Typography.fontSizes.sm,
  },
  settingsContainer: {
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontFamily: "Inter-Bold",
    fontSize: Typography.fontSizes.md,
    marginBottom: Spacing.sm,
  },
  settingsGroup: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: Spacing.lg,
    borderWidth: 1,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
    fontFamily: "Inter-Regular",
    fontSize: Typography.fontSizes.md,
  },
  settingRightContainer: {
    marginLeft: Spacing.sm,
  },
  logoutButton: {
    padding: Spacing.md,
    alignItems: "center",
  },
  logoutText: {
    fontFamily: "Inter-Medium",
    fontSize: Typography.fontSizes.md,
  },
  versionText: {
    textAlign: "center",
    fontFamily: "Inter-Regular",
    fontSize: Typography.fontSizes.sm,
    marginTop: Spacing.lg,
  },
});
