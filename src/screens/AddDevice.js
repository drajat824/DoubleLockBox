import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { ScrollContainer, TextDefault, InputPin, TextError } from "../component";
import { addDevice } from "../store/actions/Devices"; // Mengimpor aksi addDevice dari file actions/devices
import { useDispatch, useSelector } from "react-redux";
import { clientMQTT } from "../service/Mqtt";

const AddDevice = ({ navigation }) => {
  const dispatch = useDispatch();
  const height = Dimensions.get("window").height;

  const { idMobile } = useSelector((state) => state?.Mobile) || false;

  const [id, setId] = useState(""); // State untuk ID Perangkat
  const [pin, setPin] = useState(""); // State untuk Kunci Keamanan

  const [errorMessage, setErrorMessage] = useState("");
  const [successAddDevice, setSuccessAddDevice] = useState(false);

  const JsonToString = (str) => {
    return JSON.stringify(str);
  };

  const handleSaveDevice = () => {
    setErrorMessage("");
    const data = JsonToString({ command: "authentication", id_perangkat: id, pin_perangkat: pin, id_mobile: idMobile });
    if (clientMQTT.isConnected()) {
      clientMQTT.publish("request-mobile", data);
    }
  };

  if (clientMQTT.isConnected()) {
    clientMQTT.onMessageArrived = (message) => {
      var jsonString = message.payloadString;
      var jsonObject = JSON.parse(jsonString);

      if (jsonObject?.type == "auth") {
        if (jsonObject?.status == true) {
          const newDevice = { id_device: id, pin_device: pin };
          dispatch(addDevice(newDevice));
          setSuccessAddDevice(true);
        } else {
          setErrorMessage("Perangkat tidak ditemukan, periksa ID dan Pin");
        }
      }
    };
  }

  useEffect(() => {
    if (!!successAddDevice) {
      navigation.navigate("DashboardScreen");
    }
  }, [successAddDevice]);

  return (
    <ScrollContainer contentContainerStyle={{ height: height, paddingTop: 30 }}>
      <View style={{ flex: 1, paddingBottom: 30 }}>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Tambah Perangkat
        </Text>
        <TextDefault>
          Tambah serta kelola perangkatmu dengan memasukkan ID Perangkat dan Kunci Keamanan
          Perangkat
        </TextDefault>
      </View>

      <View style={{ flex: 4 }}>
        <View>
          <TextDefault style={{ fontWeight: "bold", top: 5 }}>ID Perangkat</TextDefault>
          <TextInput
            onChangeText={(e) => setId(e)}
            theme={{ roundness: 20 }}
            label="Masukan ID Perangkat"
            mode="outlined"
            style={styles.input}
          />
        </View>

        <View>
          <TextDefault style={{ fontWeight: "bold", top: 5 }}>Kunci keamanan</TextDefault>
          <TextInput
            onChangeText={(e) => setPin(e)}
            theme={{ roundness: 20 }}
            label="Masukan Kunci Keamanan"
            mode="outlined"
            style={styles.input}
          />
        </View>

        {errorMessage && <TextError style={{ paddingLeft: 5 }}>{errorMessage}</TextError>}
      </View>

      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <Button mode="contained" onPress={handleSaveDevice}>
          <TextDefault style={{ color: "white" }}>Simpan</TextDefault>
        </Button>
      </View>
    </ScrollContainer>
  );
};

export default AddDevice;

const styles = StyleSheet.create({
  input: {
    textAlign: "left",
    marginHorizontal: 3,
    marginVertical: 15,
    paddingHorizontal: 3,
    left: -3,
  },
});
