import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, type ColorValue } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabIcon, type TabIconName } from './platform';
import { CalculatorScreen } from './screens/CalculatorScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { colors } from './theme';

const Tabs = createBottomTabNavigator();

const theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.background, card: colors.surface, primary: colors.operator },
};

function icon(name: TabIconName) {
  return ({ color, size }: { color: ColorValue; size: number }) => <TabIcon name={name} color={color} size={size} />;
}

export default function StimBenchRoot() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <NavigationContainer theme={theme}>
          <Tabs.Navigator>
            <Tabs.Screen
              name="Calculator"
              component={CalculatorScreen}
              options={{ tabBarIcon: icon('calculator-outline') }}
            />
            <Tabs.Screen name="History" component={HistoryScreen} options={{ tabBarIcon: icon('time-outline') }} />
            <Tabs.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: icon('settings-outline') }} />
          </Tabs.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
