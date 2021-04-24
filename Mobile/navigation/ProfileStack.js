import React from "react";
import { createStackNavigator } from "@react-navigation/stack"; 
import Profile from "../screens/profile";
export default function HomeStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  );
}



