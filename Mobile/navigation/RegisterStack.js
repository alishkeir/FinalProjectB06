import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../screens/register";
export default function LoginStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
