import React from "react";
import { View, Text,StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack"; 
import Services from "../screens/services";
export default function HomeStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name='Services' component={Services} style={styles.container}/>
    </Stack.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },

  display: {
    flex: 1,
    display: "flex",
    flexDirection: "row-reverse",
    alignSelf: "flex-start",
    lineHeight: 80,
    margin: 5,
  },
});
