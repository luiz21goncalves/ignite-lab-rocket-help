import { Text } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import { THEME } from './src/styles/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <Text>Hello</Text>
    </NativeBaseProvider>
  );
}

