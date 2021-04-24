import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ServicesStack from "./ServicesStack";
import ProfileStack from "./ProfileStack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="HomeStack">
      <Tab.Screen
        name="Home"
        component={ServicesStack}
        options={{
          tabBarLabel: "Emergencies",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="phone" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
