import React, { useState } from "react";
import axios from "axios";

import { 
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
// import Textarea from "react-native-textarea";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [disease, setDisease] = useState("None");
  const [allergy, setAllergy] = useState("None");
  const [medical, setMedical] = useState("None");

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

  const registerSubmit = async () => {
    const registerUrl = `http://localhost:8000/api/user/register`;

    const body = new FormData();
    body.append("email", email);
    body.append("password", password);
    body.append("first_name", firstName);
    body.append("last_name", lastName);
    body.append("phone_number", phone);
    body.append("disease", disease);
    body.append("allergy", allergy);
    body.append("medical", medical);
    try {
      await axios.post(registerUrl, body).then(async(res) => {
        await console.log(res.data);
        await alert('You are successfuly registered, now you can login with your account!');
        await window.location.reload(); 
      });
    } catch (error) {
      // console.log(error.response.data);
    }
  };
  return (
    <ScrollView style={styles.main}>
<View style={styles.container}>
      <Text style={[styles.label,{marginTop:5}]}>First Name</Text>
      <TextInput
        style={[
          styles.input,
          {
            outline: "none",
          },
        ]}
        onChangeText={(e) => firstNameChange(e)}
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
      />
      <Text style={styles.label2}>Do you have any medical condition ?</Text>
      <RadioForm
        style={styles.radio}
        radio_props={radio_props}
        initial={0}
        onPress={(e) => diseaseChange(e)}
        formHorizontal={true}
        labelHorizontal={true}
        buttonSize={15}
        borderWidth={5}
      />


      {disease !== "None" ? (
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
          placeholderTextColor="black"
        />
      ) : null}

<Text style={styles.label2}>Do you have any kind of allergy ?</Text>

      <RadioForm
        style={styles.radio}
        radio_props={radio_props}
        initial={0}
        onPress={(e) => allergyChange(e)}
        formHorizontal={true}
        labelHorizontal={true}
        buttonSize={15}
      />

      {allergy !== "None" ? (
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
          placeholderTextColor="black"
        />
      ) : null}

<Text style={styles.label2}>Do you take any kind of medicine ?</Text>

      <RadioForm
        style={styles.radio}
        radio_props={radio_props}
        initial={0}
        onPress={(e) => medicalChange(e)}
        formHorizontal={true}
        labelHorizontal={true}
        buttonSize={15}
      />

      {medical !== "None" ? (
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
          placeholderTextColor="black"
        />
      ) : null}


      <TouchableOpacity
        onPress={() => registerSubmit()}
        style={styles.buttons}

      >

<Text style={styles.buttontext}>Register</Text>

      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
  },
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
  buttons: {
    width: 150,
    color: "red",
    backgroundColor: "#0077FF",
    margin: 'auto',
    marginTop: 10,
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

export default Register;
