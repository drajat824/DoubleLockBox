import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Text, Button, Modal } from "react-native-paper";
import { Container, TextDefault, TextError } from "../component";

import { TouchableOpacity } from "react-native";

import { clientMQTT } from "../service/Mqtt";

import { useSelector } from "react-redux";

const DeviceFingerprint = ({ navigation, route }) => {
  const { device } = route.params;

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { idMobile } = useSelector((state) => state?.Mobile) || false;

  const onCloseModal = async () => {
    await setSuccess(false);
    navigation.navigate("DeviceDetailScreen", { device });
  };

  const JsonToString = (str) => {
    return JSON.stringify(str);
  };

  const enrollFinger = () => {
    setError(false);
    const data = JsonToString({ command: "/rekam-sidik", id_mobile: idMobile });
    if (clientMQTT.isConnected()) {
      clientMQTT.publish("request-mobile", data);
    }
  };

  if (clientMQTT.isConnected()) {
    clientMQTT.onMessageArrived = (message) => {
      var jsonString = message.payloadString;
      var jsonObject = JSON.parse(jsonString);

      if (jsonObject?.type == "fingerprint-set-loading") {
        setLoading(true);
      }

      if (jsonObject?.type == "fingerprint-set") {
        setLoading(false);

        if (jsonObject?.status == true) {
          setSuccess(true);
        } else {
          setError(true);
        }
      }
    };
  }

  return (
    <Container style={{ flexDirection: "column" }}>
      <View style={{ flex: 0.8 }}>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Rekam Fingerprint
        </Text>
        {error ? (
          <TextError>Gagal! Silahkan coba kembali.</TextError>
        ) : loading ? (
          <TextDefault style={{ paddingTop: 10 }}>
            Letakan jari anda pada pemindai sidik jari perangkat hingga muncul indikator sukses.
          </TextDefault>
        ) : (
          <TextDefault style={{ paddingTop: 10 }}>
            Tekan tombol daftar dibawah ini, lalu letakan jari Anda pada pemindai sidik jari perangkat selama beberapa saat.
          </TextDefault>
        )}
      </View>
      {loading ? (
        <ActivityIndicator size={250} style={{ flex: 1, paddingTop: 50 }} color="#414EBD" />
      ) : (
        <TouchableOpacity style={{ flex: 1 }} onPress={enrollFinger}>
          <Image source={require("../../assets/daftar-finger.png")} />
        </TouchableOpacity>
      )}

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Button onPress={() => navigation.navigate("DeviceDetailScreen", { device })} mode="contained" style={{ width: 150 }}>
          <TextDefault style={{ color: "white" }}>Kembali</TextDefault>
        </Button>
      </View>
      <MyModal visible={success} setVisible={() => onCloseModal()} />
    </Container>
  );
};

const MyModal = ({ visible, setVisible }) => {
  return (
    <Modal
      visible={visible}
      onDismiss={setVisible}
      contentContainerStyle={{ backgroundColor: "#63BC5E", padding: 20, marginHorizontal: 20, borderRadius: 10 }}
    >
      <View>
        <View style={{ paddingBottom: 15 }}>
          <Text variant="bodyLarge">
            Berhasil mendaftarkan sidik jari, silahkan coba dengan meletakan jari anda pada sensor untuk membuka kunci.
          </Text>
        </View>
        <View style={{ borderWidth: 0.5, marginBottom: 5 }} />
        <Button onPress={setVisible}>
          <TextDefault style={{ fontWeight: "bold" }}>Oke</TextDefault>
        </Button>
      </View>
    </Modal>
  );
};

export default DeviceFingerprint;
