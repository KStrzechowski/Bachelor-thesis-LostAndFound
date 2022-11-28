import { NavigationContainer } from '@react-navigation/native';
import { AuthScreenStack } from './src/Navigation';

const App = () => {
  return (
    <NavigationContainer>
      <AuthScreenStack />
    </NavigationContainer>
  );
};

export default App;
