import { StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = { title: string; subtitle: string; value: boolean; onValueChange: (value: boolean) => void };

export function SettingsRow({ title, subtitle, value, onValueChange }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Switch accessibilityLabel={title} value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  text: { flex: 1, gap: 4 },
  title: { color: colors.text, fontSize: 17, fontWeight: '600' },
  subtitle: { color: colors.muted, fontSize: 14 },
});
