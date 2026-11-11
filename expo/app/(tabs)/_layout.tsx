import type { ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import { TabIcon, type TabIconName } from '../../src/platform';
import { colors } from '../../src/theme';

function icon(name: TabIconName) {
  return ({ color, size }: { color: ColorValue; size: number }) => <TabIcon name={name} color={color} size={size} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.separator },
        tabBarActiveTintColor: colors.operator,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Calculator', tabBarIcon: icon('calculator-outline') }} />
      <Tabs.Screen name="history" options={{ title: 'History', tabBarIcon: icon('time-outline') }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: icon('settings-outline') }} />
    </Tabs>
  );
}
