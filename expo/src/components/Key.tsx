import type { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '../theme';

type Props = {
  label: string;
  accessibilityLabel?: string;
  color?: string;
  wide?: boolean;
  onPress: () => void;
  children?: ReactNode;
};

export function Key({ label, accessibilityLabel, color = colors.key, wide = false, onPress, children }: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={[styles.slot, wide && styles.wide, animatedStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        onPressIn={() => {
          scale.value = withSpring(0.92);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={onPress}
        style={[styles.key, { backgroundColor: color }]}
      >
        {children ?? <Text style={styles.label}>{label}</Text>}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slot: { flex: 1, aspectRatio: 1, padding: 6 },
  wide: { flex: 2, aspectRatio: 2 },
  key: { flex: 1, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  label: { color: colors.text, fontSize: 30, fontWeight: '500' },
});
