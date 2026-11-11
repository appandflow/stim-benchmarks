import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme';

export function BackspaceIcon({ size = 30 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7 6-7Z"
        stroke={colors.text}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path d="m12 9 6 6m0-6-6 6" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
