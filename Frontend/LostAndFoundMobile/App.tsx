import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthScreenStack, HomeScreenStack } from './src/Navigation';
import { getAccessToken } from './src/SecureStorage';

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);
  React.useEffect(() => {
    async () => {
      const token = await getAccessToken();

      if (token) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    };
  }, []);

  return (
    <NavigationContainer>
      {isSignedIn ? <AuthScreenStack /> : <HomeScreenStack />}
    </NavigationContainer>
  );
};

export default App;
