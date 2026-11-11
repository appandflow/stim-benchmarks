import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useHistory } from '../storage';
import { colors } from '../theme';

export function HistoryScreen() {
  const [history, setHistory] = useHistory();
  return (
    <View style={styles.screen}>
      <FlatList
        data={history}
        keyExtractor={(entry, index) => `${index}-${entry}`}
        renderItem={({ item }) => <Text style={styles.entry}>{item}</Text>}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={styles.empty}>No calculations yet</Text>}
      />
      {history.length > 0 && (
        <Pressable accessibilityRole="button" style={styles.clear} onPress={() => setHistory([])}>
          <Text style={styles.clearLabel}>Clear history</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  entry: { color: colors.text, fontSize: 20, paddingHorizontal: 16, paddingVertical: 14, textAlign: 'right' },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: colors.separator },
  empty: { color: colors.muted, fontSize: 17, textAlign: 'center', marginTop: 48 },
  clear: { margin: 16, padding: 14, borderRadius: 12, backgroundColor: colors.surface, alignItems: 'center' },
  clearLabel: { color: colors.accent, fontSize: 17, fontWeight: '600' },
});
