import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import RNRestart from 'react-native-restart';

const profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [disease, setDisease] = useState("");
  const [allergy, setAllergy] = useState("");
  const [medical, setMedical] = useState("");

  const [id, setID] = useState(null);
  const [token, setToken] = useState(null);

  const [email2, setEmail2] = useState("");
  const [firstName2, setFirstName2] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [phone2, setPhone2] = useState("");
  const [disease2, setDisease2] = useState("");
  const [allergy2, setAllergy2] = useState("");
  const [medical2, setMedical2] = useState("");
  2;

  var radio_props = [
    { label: "No      ", value: "None" },
    { label: "Yes", value: 1 },
  ];

  const emailChange = (e) => {
    setEmail(e);
    console.log(e);
  };
  const passwordChange = (e) => {
    setPassword(e);
    console.log(e);
  };
  const firstNameChange = (e) => {
    setFirstName(e);
    console.log(e);
  };
  const lastNameChange = (e) => {
    setLastName(e);
    console.log(e);
  };
  const phoneChange = (e) => {
    setPhone(e);
    console.log(e);
  };
  const diseaseChange = (e) => {
    setDisease(e);
    console.log(e);
  };
  const allergyChange = (e) => {
    setAllergy(e);
    console.log(e);
  };
  const medicalChange = (e) => {
    setMedical(e);
    console.log(e);
  };

  const getData = async () => {
    const first_name2 = await AsyncStorage.getItem("first_name");
    const last_name2 = await AsyncStorage.getItem("last_name");
    const email2 = await AsyncStorage.getItem("email");
    const phone2 = await AsyncStorage.getItem("phone");
    const disease2 = await AsyncStorage.getItem("disease");
    const allergy2 = await AsyncStorage.getItem("allergy");
    const medical2 = await AsyncStorage.getItem("medical");
    const id2 = await AsyncStorage.getItem("id");
    const token2 = await AsyncStorage.getItem("token");

    await setID(id2);
    await setFirstName2(first_name2);
    await setLastName2(last_name2);
    await setEmail2(email2);
    await setPhone2(phone2);
    await setDisease2(disease2);
    await setAllergy2(allergy2);
    await setMedical2(medical2);
    await setToken(token2);
  };

  getData();

  const registerSubmit = async () => {
    const registerUrl = `http://localhost:8000/api/user/users/${id}?_method=PUT`;

    const body = new FormData();
    if (email) {
      body.append("email", email);
    }
    if (password) {
      body.append("password", password);
    }
    if (firstName) {
      body.append("first_name", firstName);
    }
    if (lastName) {
      body.append("last_name", lastName);
    }
    if (phone) {
      body.append("phone_number", phone);
    }
    if (disease) {
      body.append("disease", disease);
    }
    if (allergy) {
      body.append("allergy", allergy);
    }
    if (medical) {
      body.append("medical", medical);
    }

    try {
      await axios
        .post(registerUrl, body, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          window.location.reload(); 
        });
    } catch (error) {}
  };

  const tokenHandler = () => {
    AsyncStorage.clear();
    window.location.reload();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={{ marginTop: 5 }}></Text>

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={[
          styles.input,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => firstNameChange(e)}
        defaultValue={firstName2}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={[
          styles.input,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => lastNameChange(e)}
        defaultValue={lastName2}
      />

      <Text style={styles.label}>PhoneNumber</Text>
      <TextInput
        style={[
          styles.input,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => phoneChange(e)}
        defaultValue={phone2}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[
          styles.input,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => emailChange(e)}
        defaultValue={email2}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[
          styles.input,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => passwordChange(e)}
        placeholder="password"
      />

      <Text style={styles.label2}>Do you have any medical condition ?</Text>

      <TextInput
        multiline={true}
        numberOfLines={10}
  style={[
          styles.area,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => diseaseChange(e)}
        placeholder="Please separate by commas"
        defaultValue={disease2}
      />

      <Text style={styles.label2}>Do you have any kind of allergy ?</Text>

      <TextInput
        multiline={true}
        numberOfLines={10}
  style={[
          styles.area,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => allergyChange(e)}
        placeholder="Please separate by commas"
        defaultValue={allergy2}
      />

      <Text style={styles.label2}>Do you take any kind of medicine ?</Text>

      <TextInput
        multiline={true}
        numberOfLines={10}
  style={[
          styles.area,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => medicalChange(e)}
        placeholder="Please separate by commas"
        defaultValue={medical2}
      />
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => registerSubmit()}
          title="Update Profile"
          color="#841584"
        >
          <Text style={styles.buttontext}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttons}
          title="Logout"
          onPress={() => tokenHandler()}
        >
          <Text style={styles.buttontext}>Logout</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

export default profile;

const styles = StyleSheet.create({
  input: {
    height: 30,
    margin: 12,
    width:'70%',
    borderWidth: 0,
    borderBottomWidth:1,
    borderBottomColor:'#222',
    paddingLeft: 10,
    // borderRadius: 50,
    outLine: "none",
  },
  area: {
    width:'70%',

    height: 70,
    justifyContent: "flex-end",
    paddingTop: 8,
    borderWidth: 0,
    borderBottomWidth:1,
    borderBottomColor:'#222',
    margin: 12,
    paddingLeft: 10,
  },
  radio: {
    marginLeft: 20,
  },
  label: {
    marginLeft: 15,
  },
  label2: {
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 5,
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    // width:15
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
  container:{
    flex:1, 
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
  },
});
