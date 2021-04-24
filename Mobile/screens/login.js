import React, { useState, useCallback } from "react";
import { LinearGradient } from 'expo-linear-gradient'; 
import axios from "axios";
import {
  View,Image,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import RNRestart from 'react-native-restart';
import Logo from './logo.png';
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const emailChange = (e) => {
    setEmail(e);
    // console.log(e);
  };

  const passwordChange = (e) => {
    setPassword(e);
    // console.log(e);
  };

  const loginSubmit = async () => {
    // e.preventDefault();
    const loginUrl = `http://localhost:8000/api/user/login`;

    const body = new FormData();
    body.append("email", email);
    body.append("password", password);

    await axios.post(loginUrl, body).then(async (res) => {
      console.log(res);
      await AsyncStorage.setItem("token", res.data.access_token);
      await AsyncStorage.setItem("id", res.data.user.id );
      await AsyncStorage.setItem("first_name", res.data.user.first_name);
      await AsyncStorage.setItem("last_name", res.data.user.last_name);
      await AsyncStorage.setItem("email", res.data.user.email);
      await AsyncStorage.setItem("phone", res.data.user.phone_number);
      await AsyncStorage.setItem("disease", res.data.user.disease);
      await AsyncStorage.setItem("allergy", res.data.user.allergy);
      await AsyncStorage.setItem("medical", res.data.user.medical);
      window.location.reload();
    // RNRestart.Restart(true);

    });
  };
  return (
    <SafeAreaView    style={styles.container}>
  <Image style={styles.image}  source={Logo}/>

      <TextInput
  style={[
          styles.input,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => emailChange(e)}
        placeholder="email"
        keyboardType="email-address"
      />

      <TextInput
  style={[
          styles.input,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => passwordChange(e)}
        placeholder="password"
        textContentType="password"
      />

      <TouchableOpacity
                style={styles.buttons}

        onPress={() => loginSubmit()}

      ><Text  style={styles.buttontext}>Login</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0,
    borderBottomWidth:1,
    borderBottomColor:'#222',
    paddingLeft: 10,
    // borderRadius: 50,
    outLine: "none",

  },
  container:{
    flex:1,

    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
  },
  buttons: {
    width: 150,
    color: "red",
    backgroundColor: "#0077FF",
    margin: 5,
    marginLeft: 10,
    height: 40,
    borderRadius: 50,
  },
  buttontext: {
    margin: "auto",
  },
  image:{
    width:300,
    height:300,
  }
});

export default Login;
