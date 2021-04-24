import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
// import TabNavigator2 from "./navigation/TabNavigator2";
import TabNavigator2 from "./navigation/Tab2Navigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [token, setToken] = useState('');
  const [render, setRender] = useState(false);

  const render2 = (value) => {
    setRender(value);
  };
  useEffect(() => {
    const getToken = async () => {
      setToken(await AsyncStorage.getItem("token"));
    }; 
    getToken();
  }, [render, render2]);

  // const token= AsyncStorage.getItem("token")

  return (
    
    <NavigationContainer style={styles.container}>
      {token ? <TabNavigator render2={render2} render={render} /> : <TabNavigator2  render2={render2} render={render} />}
    </NavigationContainer>

   
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
