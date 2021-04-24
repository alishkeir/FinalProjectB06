import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginStack from "./LoginStack";
import RegisterStack from "./RegisterStack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
const TabNavigator2 = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="HomeStack">
      <Tab.Screen
        name="Home"
        component={LoginStack}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={RegisterStack}
        options={{
          tabBarLabel: "Register",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="adduser" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator2;
