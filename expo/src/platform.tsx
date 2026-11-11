import type { ColorValue } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import * as Haptics from 'expo-haptics';

export const appVersion = Constants.expoConfig?.version ?? '';

export function tapFeedback() {
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export type TabIconName = 'calculator-outline' | 'time-outline' | 'settings-outline';

export function TabIcon({ name, color, size }: { name: TabIconName; color: ColorValue; size: number }) {
  return <Ionicons name={name} color={color as string} size={size} />;
}
