import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { resetPassword } from "../firebase/auth";
import Colors from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import Typography from "@/constants/Typography";
import { fontFamilies } from "@/constants/Fonts";

type AuthModalProps = {
  visible: boolean;
  mode: "signIn" | "signUp";
  onModeChange: (mode: "signIn" | "signUp") => void;
  onClose: () => void;
  onAuth: (email: string, password: string, mode: "signIn" | "signUp") => void;
  error: string | null;
};

export const AuthModal = ({
  visible,
  mode,
  onModeChange,
  onClose,
  onAuth,
  error,
}: AuthModalProps) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleSubmit = () => {
    onAuth(email, password, mode);
    setEmail("");
    setPassword("");
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Email Required", "Please enter your email address first.");
      return;
    }

    setIsResettingPassword(true);
    try {
      await resetPassword(email);
      Alert.alert(
        "Password Reset Sent",
        "Check your email for password reset instructions.",
        [{ text: "OK" }]
      );
    } catch (err: any) {
      const errorMessage = getFriendlyResetError(err.code);
      Alert.alert("Reset Failed", errorMessage);
    } finally {
      setIsResettingPassword(false);
    }
  };

  const getFriendlyResetError = (code: string) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email address.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many reset attempts. Please try again later.";
      default:
        return "Failed to send reset email. Please try again.";
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={viewStyles.overlay}>
        <View
          style={[
            viewStyles.container,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              elevation: 1,
              shadowColor: theme.secondary,
              shadowOpacity: 0.02,
            },
          ]}
        >
          <Text style={[textStyles.title, { color: theme.text }]}>
            {mode === "signIn" ? "Sign In" : "Sign Up"}
          </Text>
          
          {error && (
            <Text
              style={[textStyles.errorText, { color: theme.accent }]}
            >
              {error}
            </Text>
          )}
          
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={[
              styles.input,
              { 
                borderColor: theme.border, 
                color: theme.text,
                backgroundColor: theme.background,
              },
            ]}
            placeholderTextColor={theme.textTertiary}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={[
              styles.input,
              { 
                borderColor: theme.border, 
                color: theme.text,
                backgroundColor: theme.background,
              },
            ]}
            placeholderTextColor={theme.textTertiary}
            secureTextEntry
          />
          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accent }]}
            onPress={handleSubmit}
          >
            <Text style={[textStyles.buttonText, { color: theme.neutral0 }]}>
              {mode === "signIn" ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {mode === "signIn" && (
            <TouchableOpacity
              onPress={handleForgotPassword}
              disabled={isResettingPassword}
              style={styles.forgotPasswordButton}
            >
              <Text
                style={[
                  textStyles.forgotPasswordText,
                  { 
                    color: isResettingPassword ? theme.textTertiary : theme.accent,
                  },
                ]}
              >
                {isResettingPassword ? "Sending..." : "Forgot Password?"}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text
              style={[textStyles.closeText, { color: theme.textSecondary }]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() =>
              onModeChange(mode === "signIn" ? "signUp" : "signIn")
            }
          >
            <Text
              style={[textStyles.modeSwitchText, { color: theme.textTertiary }]}
            >
              {mode === "signIn"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 24,
    width: "85%",
    maxWidth: 400,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(47, 44, 42, 0.7)",
  },
});

const textStyles = StyleSheet.create({
  title: {
    fontSize: Typography.fontSizes.xl,
    fontFamily: fontFamilies.bold,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  buttonText: {
    fontFamily: fontFamilies.medium,
    fontSize: Typography.fontSizes.md,
    textAlign: "center",
  },
  closeText: { 
    textAlign: "center", 
    fontFamily: fontFamilies.regular,
    fontSize: Typography.fontSizes.md,
  },
  modeSwitchText: {
    textAlign: "center",
    fontFamily: fontFamilies.regular,
    fontSize: Typography.fontSizes.sm,
  },
  errorText: {
    textAlign: "center",
    marginBottom: Spacing.md,
    fontFamily: fontFamilies.regular,
    fontSize: Typography.fontSizes.sm,
  },
  forgotPasswordText: {
    fontFamily: fontFamilies.medium,
    fontSize: Typography.fontSizes.sm,
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  input: { 
    borderWidth: 1, 
    marginBottom: Spacing.md, 
    padding: Spacing.sm, 
    borderRadius: 8,
    fontFamily: fontFamilies.regular,
    fontSize: Typography.fontSizes.md,
  },
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },
  forgotPasswordButton: {
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },
  cancelButton: {
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },
});