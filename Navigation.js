
import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Our global authentication state, with default values
export const AuthContext = createContext({
  hasUser: false, 
  setUser: () => {},
});

const LoginScreen = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Login</Text>
      <Button 
        title='Login'
        onPress={() => setUser(true)}/>
    </View>
  );
};

const FeedScreen = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Feed</Text>
      <Button 
        title='Press Here'
        onPress={() => setUser(false)}/>
    </View>
  );
};

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { hasUser } = useContext(AuthContext);

  return (
    <Stack.Navigator>
    {hasUser ? 
      <Stack.Screen name="Feed" component={FeedScreen} /> :
      <Stack.Screen name="Login" component={LoginScreen} />
    }
      
    </Stack.Navigator>
  );
};

const App = () => {
  // This is linked to our global authentication state.
  // We connect this in React to re-render components when changing this value.
  const [hasUser, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{ hasUser, setUser }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
