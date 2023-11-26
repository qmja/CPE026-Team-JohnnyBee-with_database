import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './components/LoginPage';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('uaqjHpPi1HUwWir9lGFA5JjVXyQ9kBx0q9yo1aJG', 'MeUD3QR79OFTfLwBOvwBTWcVrOKleju08058MJYm');
Parse.serverURL = 'https://parseapi.back4app.com/';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=" " component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
