import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity, Image, Switch } from "react-native";
import { ScrollContainer, TextDefault } from "../component";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button, Text } from "react-native-paper";
import { clientMQTT } from "../service/Mqtt";
import { useSelector } from "react-redux";

const DeviceDetail = ({ navigation, route }) => {
  const height = Dimensions.get("window").height;
  const { device } = route.params;
  const { idMobile } = useSelector((state) => state?.Mobile) || false;

  const [dataDevice, setDataDevice] = useState({
    finger: true,
    gembok: true,
    vibrate: true,
    notification: true,
    camera: true,
  });

  const CloseGembok = () => {
    if (clientMQTT.isConnected()) {
      const data = JsonToString({ command: "/tutup-gembok", id_mobile: idMobile });
      clientMQTT.publish("request-mobile", data);
    }
  };

  const OnRegisterFinger = () => {
    navigation.navigate("DeviceFingerprintScreen", { device });
  };

  const OnRegisterCamera = () => {
    navigation.navigate("DeviceCameraScreen", { device });
  };

  const OffBuzzer = () => {
    if (clientMQTT.isConnected()) {
      const data = JsonToString({ command: "/matikan-buzzer", id_mobile: idMobile });
      clientMQTT.publish("request-mobile", data);
    }
  };

  const ChangeFinger = (e) => {
    if (clientMQTT.isConnected()) {
      if (dataDevice.finger == true) {
        const data = JsonToString({ command: "/matikan-finger", id_mobile: idMobile });
        clientMQTT.publish("request-mobile", data);
      } else {
        const data = JsonToString({ command: "/hidupkan-finger", id_mobile: idMobile });
        clientMQTT.publish("request-mobile", data);
      }
    }
  };

  const ChangeCamera = (e) => {
    if (clientMQTT.isConnected()) {
      if (dataDevice.camera == true) {
        const data = JsonToString({ command: "/matikan-kamera", id_mobile: idMobile });
        clientMQTT.publish("request-mobile", data);
      } else {
        const data = JsonToString({ command: "/hidupkan-kamera", id_mobile: idMobile });
        clientMQTT.publish("request-mobile", data);
      }
    }
  };

  const ChangeVibrate = (e) => {
    if (clientMQTT.isConnected()) {
      if (dataDevice.vibrate == true) {
        const data = JsonToString({ command: "/matikan-getar", id_mobile: idMobile });
        clientMQTT.publish("request-mobile", data);
      } else {
        const data = JsonToString({ command: "/hidupkan-getar", id_mobile: idMobile });
        clientMQTT.publish("request-mobile", data);
      }
    }
  };

  const ChangeNotification = (e) => {
    if (clientMQTT.isConnected()) {
      if (dataDevice.notification == true) {
        const data = JsonToString({ command: "/matikan-notifikasi", id_mobile: idMobile });
        clientMQTT.publish("request-mobile", data);
      } else {
        const data = JsonToString({ command: "/hidupkan-notifikasi", id_mobile: idMobile });
        clientMQTT.publish("request-mobile", data);
      }
    }
  };

  const JsonToString = (str) => {
    return JSON.stringify(str);
  };

  useEffect(() => {
    if (clientMQTT.isConnected()) {
      const data = JsonToString({ command: "/status", id_mobile: idMobile });
      clientMQTT.publish("request-mobile", data);
    }
  }, []);

  if (clientMQTT.isConnected()) {
    clientMQTT.onMessageArrived = (message) => {
      var jsonString = message.payloadString;
      var jsonObject = JSON.parse(jsonString);

      console.log(jsonObject);

      if (jsonObject?.type == "device-status") {
        setDataDevice({
          finger: jsonObject?.finger,
          gembok: jsonObject?.gembok,
          vibrate: jsonObject?.vibrate,
          notification: jsonObject?.notification,
          camera: jsonObject?.camera,
        });
      }
    };
  }

  return (
    <ScrollContainer contentContainerStyle={{ paddingTop: 20 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("DashboardScreen")}>
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          Perangkat
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen", { device })}>
          <Icon name="bell" size={30} />
        </TouchableOpacity>
      </View>

      <View style={{ height: height, paddingTop: 30 }}>
        <View style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.cardImage} source={require("../../assets/perangkat.png")} />
            <View style={styles.cardContent}>
              <Text variant="headlineSmall" style={styles.cardTitle}>
                ID Perangkat
              </Text>
              <View style={{ position: "absolute", bottom: 5, left: 10 }}>
                <Text variant="labelLarge" style={styles.cardText}>
                  {device?.id_device}
                </Text>
                <Text variant="labelLarge" style={styles.cardStatus}>
                  {dataDevice?.gembok ? "Tertutup" : "Terbuka"}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              onPress={OffBuzzer}
              mode="contained"
              style={{ marginTop: 15, borderRadius: 5, marginRight: 5, backgroundColor: "#FFB90B" }}
            >
              MATIKAN BUNYI
            </Button>

            <Button
              onPress={CloseGembok}
              mode="contained"
              style={{ marginTop: 15, borderRadius: 5, flex: 1, backgroundColor: "#D30808" }}
            >
              TUTUP KUNCI
            </Button>
          </View>

          <TouchableOpacity
            style={{ paddingTop: 10, flexDirection: "row" }}
            onPress={() => navigation.navigate("DeviceMapsScreen", { device })}
          >
            <Icon name="map-marker" color="#FF5252" size={20} style={{ paddingRight: 5, paddingTop: 0 }} />
            <TextDefault style={{ textDecorationLine: "underline", color: "#FF5252" }}>Lihat Lokasi Perangkat</TextDefault>
          </TouchableOpacity>
        </View>

        <View style={[styles.switchContainer, { paddingBottom: 15 }]}>
          {renderSwitch("Face ID", require("../../assets/smile.png"), dataDevice?.camera, ChangeCamera, OnRegisterCamera)}
          {renderSwitch("Fingerprint", require("../../assets/finger-2.png"), dataDevice?.finger, ChangeFinger, OnRegisterFinger)}
        </View>
        <View style={styles.switchContainer}>
          {renderSwitch("Vibration", require("../../assets/vibrate.png"), dataDevice?.vibrate, ChangeVibrate)}
          {renderSwitch("Notifikasi", require("../../assets/bell.png"), dataDevice?.notification, ChangeNotification)}
        </View>

        <View style={styles.unlockContainer}>
          <TouchableOpacity style={styles.unlockButton}>
            <Image style={styles.unlockImage} source={require("../../assets/unlock.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollContainer>
  );
};

const IconKey = ({ OnRegister }) => (
  <TouchableOpacity style={{ position: "absolute", left: 15, bottom: 10 }} onPress={OnRegister}>
    <Icon name="key" color="#E79E08" size={30} />
  </TouchableOpacity>
);

const renderSwitch = (label, imageSource, value, onValueChange, OnRegister) => (
  <View style={styles.switchCard}>
    {imageSource && <Image style={{ width: 60, resizeMode: "contain" }} source={imageSource} />}
    <Text style={styles.cardTitle} variant="titleLarge">
      {label}
    </Text>
    {OnRegister && <IconKey OnRegister={OnRegister} />}
    <Switch
      style={{ position: "absolute", right: 10, bottom: 10 }}
      value={value}
      onValueChange={onValueChange}
      thumbColor="#414EBD"
      color="#414EBD"
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    paddingBottom: 10,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
    marginBottom: 15,
  },
  cardImage: {
    alignSelf: "center",
  },
  cardContent: {
    paddingLeft: 10,
    flexDirection: "column",
  },
  cardTitle: {
    fontWeight: "bold",
    paddingTop: 5,
  },
  cardText: {
    bottom: 5,
  },
  cardStatus: {
    bottom: 5,
    color: "grey",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchCard: {
    width: "48%",
    height: 180,
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
  },
  switchView: {
    flexDirection: "row",
  },
  unlockContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  unlockButton: {
    alignItems: "center",
  },
  unlockImage: {
    width: 70,
    resizeMode: "contain",
  },
});

export default DeviceDetail;
