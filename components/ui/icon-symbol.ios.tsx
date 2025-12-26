import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols'
import { ComponentProps } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>

// Fallback mapping when SymbolView isn't available (e.g. unsupported runtime).
const MAPPING = {
  'house.fill': 'home',
  'book.fill': 'menu-book',
  'heart.fill': 'favorite',
  'person.fill': 'person',
  plus: 'add',
} as IconMapping

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  // If SymbolView isn't available, fall back to Material icons to avoid a hard crash.
  if (typeof SymbolView !== 'function') {
    const mapped = MAPPING[name] ?? 'help-outline'
    return (
      <MaterialIcons
        name={mapped}
        size={size}
        color={color}
        style={style as StyleProp<any>}
      />
    )
  }

  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
