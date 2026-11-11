export type Operator = '+' | '-' | '*' | '/';
export type Key = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.' | Operator | '=' | 'C' | 'back';

export type CalculatorState = {
  display: string;
  stored: number | null;
  operator: Operator | null;
  fresh: boolean;
};

export const initialState: CalculatorState = { display: '0', stored: null, operator: null, fresh: true };

export const operatorSymbol: Record<Operator, string> = { '+': '+', '-': '−', '*': '×', '/': '÷' };

function apply(left: number, operator: Operator, right: number): number {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      return right === 0 ? NaN : left / right;
  }
}

export function format(value: number): string {
  if (!Number.isFinite(value)) return 'Error';
  return String(Number(value.toPrecision(12)));
}

function isOperator(key: Key): key is Operator {
  return key === '+' || key === '-' || key === '*' || key === '/';
}

export function press(state: CalculatorState, key: Key): { state: CalculatorState; entry?: string } {
  if (key === 'C') return { state: initialState };
  if (key === 'back') {
    if (state.fresh) return { state };
    const display = state.display.length > 1 ? state.display.slice(0, -1) : '0';
    return { state: { ...state, display } };
  }
  if (key !== '=' && !isOperator(key)) {
    if (state.fresh) return { state: { ...state, display: key === '.' ? '0.' : key, fresh: false } };
    if (key === '.' && state.display.includes('.')) return { state };
    if (state.display.length >= 12) return { state };
    const display = state.display === '0' && key !== '.' ? key : state.display + key;
    return { state: { ...state, display } };
  }
  const current = Number(state.display);
  if (key === '=') {
    if (state.operator === null || state.stored === null) return { state };
    const result = format(apply(state.stored, state.operator, current));
    const entry = `${format(state.stored)} ${operatorSymbol[state.operator]} ${state.display} = ${result}`;
    return { state: { display: result, stored: null, operator: null, fresh: true }, entry };
  }
  const stored =
    state.operator !== null && state.stored !== null && !state.fresh
      ? apply(state.stored, state.operator, current)
      : current;
  return { state: { display: format(stored), stored, operator: key, fresh: true } };
}
