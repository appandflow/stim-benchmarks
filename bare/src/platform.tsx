import Ionicons from '@react-native-vector-icons/ionicons';
import HapticFeedback from 'react-native-haptic-feedback';
import { version } from '../package.json';

export const appVersion = version;

export function tapFeedback() {
  HapticFeedback.trigger('impactLight');
}

export type TabIconName = 'calculator-outline' | 'time-outline' | 'settings-outline';

export function TabIcon({ name, color, size }: { name: TabIconName; color: string; size: number }) {
  return <Ionicons name={name} color={color} size={size} />;
}
