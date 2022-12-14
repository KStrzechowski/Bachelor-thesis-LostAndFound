import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { AuthContext } from './Config';
import { AuthScreenStack, HomeScreenStack } from './src/Navigation';
import { getAccessToken } from './src/SecureStorage';
import { clearStorage } from './src/SecureStorage/Authorization';

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: { type: any }) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignedIn: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignedIn: false,
          };
      }
    },
    {
      isLoading: true,
      isSignedIn: false,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await getAccessToken();
      } catch (e) {}
      if (token) {
        dispatch({ type: 'SIGN_IN' });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        const token = await getAccessToken();
        if (token) {
          dispatch({ type: 'SIGN_IN' });
        }
      },
      signOut: async () => {
        await clearStorage();
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    [],
  );

  if (state.isLoading) {
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isSignedIn ? <HomeScreenStack /> : <AuthScreenStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
