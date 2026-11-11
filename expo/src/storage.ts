import { createMMKV, useMMKVBoolean, useMMKVString } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'stim-bench' });

const HISTORY = 'history';
const HISTORY_LIMIT = 50;

export function useHistory(): [string[], (entries: string[]) => void] {
  const [raw, setRaw] = useMMKVString(HISTORY, storage);
  const entries: string[] = raw ? JSON.parse(raw) : [];
  return [entries, (next) => setRaw(JSON.stringify(next.slice(0, HISTORY_LIMIT)))];
}

export function useSetting(key: 'haptics' | 'keepHistory'): [boolean, (value: boolean) => void] {
  const [value, setValue] = useMMKVBoolean(key, storage);
  return [value ?? true, setValue];
}
