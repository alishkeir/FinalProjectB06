import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import cs s
import Logo from "./red.png";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function Services({ navigation }) {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  const serURL = "http://localhost:8000/api/service";
  const emURL = "http://localhost:8000/api/emergency";
  const catURL = "http://localhost:8000/api/category";

  const getEmergency = (name, cat) => {
    confirmAlert({
      title: "Confirm to submit",
      message: `Are you sure to Request ${name}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => Accept(name, cat),
        },
        {
          label: "No",
          onClick: () => console.log("No"),
        },
      ],
    });

    const Accept = async (name, cat) => {
      navigator.geolocation.getCurrentPosition(async function (position) {
        await console.log("Latitude is :", position.coords.latitude);
        await console.log("Longitude is :", position.coords.longitude);
        await setLat(position.coords.latitude);
        await setLong(position.coords.longitude);
      });
      const id = await AsyncStorage.getItem("id");
      const body = new FormData();
      body.append("emergency_name", name);
      body.append("category_id", cat);
      body.append("user_id", id);
      body.append("emergency_lat", lat);
      body.append("emergency_long", long);
      body.append("status", "new");

      await axios
        .post(emURL, body, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          alert("Done");
        })
        .catch((res) => {
          console.log(res);
        });
    };
  };

  const getServices = () => {
    axios
      .get(serURL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setServices(res.data);
      });
  };

  const getCategories = () => {
    axios
      .get(catURL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setCategories(res.data);
      });
  };

  const getLocation = () => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      });
    }, 5000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    getLocation();
    getServices();
    getCategories();
  }, []);

  const showServices = services.map((service) => {
    // console.log(service);
    return (
      <TouchableOpacity
        onPress={() => {
          getEmergency(service.service_name, service.category_id);
        }}
        key={service.id}
      >
        <View key={service.id} style={styles.display}>
          <Image
            source={{
              uri: `http://localhost:8000/storage/Service/${service.image}`,
            }}
            style={{ minWidth: "100%", minHeight: "100%", zIndex: "-10" }}
          />
          <View style={styles.mark}>
            <Text style={{ fontSize: 15, padding: 3 }}>
              {service.category.category_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  // });

  return <ScrollView>{showServices}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },

  display: {
    zIndex: 0,
    flex: 1,
    width: "85%",
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    lineHeight: 80,
    height: 150,
    marginTop: 8,
    margin: "auto",
    borderRadius: 15,
    overflow: "hidden",
    // backgroundColor: "#00DDFF",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 0,
  },

  heading: {
    marginTop: 15,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#00AAFF",
    height: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  headingTitle: {
    margin: "auto",
    fontSize: 20,
  },
  card: {
    backgroundColor: "red",
    marginLeft: 20,
  },
  mark: {
    backgroundColor: "#fff",
    opacity:0.8,
    height: "auto",
    position: "absolute",
    zIndex: 20,
    left: 10,
    bottom: 10,
    borderRadius: 5,
  },
});
