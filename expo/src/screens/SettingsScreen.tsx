import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SettingsRow } from '../components/SettingsRow';
import { appVersion } from '../platform';
import { useSetting } from '../storage';
import { colors } from '../theme';

export function SettingsScreen() {
  const [haptics, setHaptics] = useSetting('haptics');
  const [keepHistory, setKeepHistory] = useSetting('keepHistory');
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.group}>
        <SettingsRow
          title="Key haptics"
          subtitle="Vibrate softly on every key press"
          value={haptics}
          onValueChange={setHaptics}
        />
        <View style={styles.separator} />
        <SettingsRow
          title="Keep history"
          subtitle="Save each result on this device"
          value={keepHistory}
          onValueChange={setKeepHistory}
        />
      </View>
      <Text style={styles.footer}>Stim Bench {appVersion}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  group: { margin: 16, borderRadius: 14, backgroundColor: colors.surface, overflow: 'hidden' },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: colors.separator, marginLeft: 16 },
  footer: { color: colors.muted, textAlign: 'center', fontSize: 13 },
});
