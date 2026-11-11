import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackspaceIcon } from '../components/BackspaceIcon';
import { Key } from '../components/Key';
import { initialState, operatorSymbol, press, type Key as KeyName, type Operator } from '../calculator';
import { tapFeedback } from '../platform';
import { useHistory, useSetting } from '../storage';
import { colors } from '../theme';

const rows: KeyName[][] = [
  ['C', 'back', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export function CalculatorScreen() {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useHistory();
  const [haptics] = useSetting('haptics');
  const [keepHistory] = useSetting('keepHistory');

  function onKey(key: KeyName) {
    if (haptics) tapFeedback();
    const next = press(state, key);
    setState(next.state);
    if (next.entry && keepHistory) setHistory([next.entry, ...history]);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right']}>
      <View style={styles.display}>
        <Text style={styles.pending}>
          {state.operator && state.stored !== null ? `${state.stored} ${operatorSymbol[state.operator]}` : ' '}
        </Text>
        <Animated.Text key={state.display} entering={FadeIn.duration(120)} style={styles.value} numberOfLines={1}>
          {state.display}
        </Animated.Text>
      </View>
      {rows.map((row) => (
        <View key={row.join('')} style={styles.row}>
          {row.map((key) => {
            const isOperator = ['/', '*', '-', '+', '='].includes(key);
            const label = isOperator && key !== '=' ? operatorSymbol[key as Operator] : key;
            return (
              <Key
                key={key}
                label={label}
                accessibilityLabel={key === 'back' ? 'Delete' : undefined}
                wide={key === '0' || key === 'C'}
                color={isOperator ? colors.operator : undefined}
                onPress={() => onKey(key)}
              >
                {key === 'back' ? <BackspaceIcon /> : undefined}
              </Key>
            );
          })}
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 12, justifyContent: 'flex-end' },
  display: { paddingHorizontal: 12, paddingBottom: 16, alignItems: 'flex-end' },
  pending: { color: colors.muted, fontSize: 20 },
  value: { color: colors.text, fontSize: 64, fontWeight: '300' },
  row: { flexDirection: 'row' },
});
