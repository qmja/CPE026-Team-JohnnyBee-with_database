import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('uaqjHpPi1HUwWir9lGFA5JjVXyQ9kBx0q9yo1aJG', 'MeUD3QR79OFTfLwBOvwBTWcVrOKleju08058MJYm');
Parse.serverURL = 'https://parseapi.back4app.com/';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer styles={StyleSheet.container}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Welcome" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#485613',
  },
});