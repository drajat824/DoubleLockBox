import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Button, Text, Switch } from "react-native-paper";
import { ScrollContainer, TextDefault } from "../component";
import { useSelector, useDispatch } from "react-redux";
import { setUserUseFinger } from "../store/actions/User";
import { setLogin } from "../store/actions/Auth";
import { setNotificationReceive } from "../store/actions/Notification";
import { DisconnectMQTT, clientMQTT } from "../service/Mqtt";

const Dashboard = ({ navigation }) => {
  const height = Dimensions.get("window").height;
  const [activeScreen, setActiveScreen] = useState("Perangkat");
  const { devices } = useSelector((state) => state?.Devices) || [{}];

  return (
    <ScrollContainer
      contentContainerStyle={{
        height: devices?.length >= 1 ? null : height,
        paddingVertical: 30,
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Perangkatku
        </Text>
        <TextDefault>Kelola perangkat untuk terkoneksi dengan aplikasi untuk kontrol Double Lock Box-mu.</TextDefault>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 30,
          }}
        >
          {renderTabButton("Perangkat", activeScreen, () => setActiveScreen("Perangkat"))}
          {renderTabButton("Aplikasi", activeScreen, () => setActiveScreen("Aplikasi"))}
        </View>
      </View>

      <View style={{ flex: 3 }}>
        {activeScreen === "Aplikasi" ? (
          <Application navigation={navigation} />
        ) : (
          <Device navigation={navigation} devices={devices} />
        )}
      </View>

      {activeScreen === "Perangkat" && renderAddDeviceButton(navigation)}
    </ScrollContainer>
  );
};

const renderTabButton = (label, activeScreen, onPress) => (
  <Button
    mode={activeScreen === label ? "contained" : "outlined"}
    style={activeScreen === label ? styles.active : styles.unactive}
    onPress={onPress}
  >
    <TextDefault style={{ color: activeScreen === label ? "white" : "#424EBD" }}>{label}</TextDefault>
  </Button>
);

const renderAddDeviceButton = (navigation) => (
  <View style={{ paddingTop: 15, flex: 1, justifyContent: "center" }}>
    <Button mode="contained" onPress={() => navigation.navigate("AddDeviceScreen")}>
      <TextDefault style={{ color: "white" }}>Tambah Perangkat</TextDefault>
    </Button>
  </View>
);

const Device = ({ devices, navigation }) => {
  const handleDeviceClick = (device) => {
    navigation.navigate("DeviceDetailScreen", { device });
  };

  return <DeviceListView devices={devices} onDeviceClick={handleDeviceClick} />;
};

const NoDeviceView = () => (
  <View style={styles.noDeviceContainer}>
    <Image style={styles.centeredImage} source={require("../../assets/perangkat-home.png")} />
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", textAlign: "center" }} variant="headlineLarge">
        Tidak Ada Perangkat
      </Text>
      <TextDefault style={{ textAlign: "center" }}>Tambah Perangkat untuk memulai kontrol Double Lock Box Kamu</TextDefault>
    </View>
  </View>
);

const DeviceListView = ({ devices, onDeviceClick }) => (
  <View>
    {devices?.length > 0 ? (
      devices.map((device, i) => (
        <TouchableOpacity key={i} onPress={() => onDeviceClick(device)}>
          <View style={styles.deviceContainer}>
            <Image style={styles.centeredImage} source={require("../../assets/perangkat.png")} />
            <View style={styles.deviceInfo}>
              <Text style={styles.boldText} variant="headlineSmall">
                ID Perangkat
              </Text>
              <Text>{device?.id_device}</Text>
              <Text style={styles.absoluteText}>Active</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <NoDeviceView />
    )}
  </View>
);

const Application = ({ navigation }) => {
  const dispatch = useDispatch();
  const { useFinger } = useSelector((state) => state?.User);
  const [valueSwitchFinger, setValueSwitchFinger] = useState(useFinger);

  const onChangeSwitchFinger = () => {
    setValueSwitchFinger(!valueSwitchFinger);
  };

  useEffect(() => {
    dispatch(setUserUseFinger(valueSwitchFinger));
  }, [valueSwitchFinger]);

  const onLogout = async () => {
    await DisconnectMQTT();
    dispatch(setLogin(false));
    dispatch(setNotificationReceive(false));
  };

  return (
    <View>
      <PinSettings navigation={navigation} />
      <BiometricSettings valueSwitchFinger={valueSwitchFinger} onChangeSwitchFinger={onChangeSwitchFinger} />
      <LogoutButton onLogout={onLogout} />
    </View>
  );
};

const PinSettings = ({ navigation }) => (
  <View style={styles.settingsView}>
    <Image style={styles.centeredImage} source={require("../../assets/pin.png")} />
    <View style={{ paddingLeft: 10, flex: 1, flexDirection: "column" }}>
      <Text style={styles.boldText} variant="headlineSmall">
        Kunci PIN
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("ChangePinScreen")}>
        <Text style={styles.alignRightText}>Ubah PIN</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const BiometricSettings = ({ valueSwitchFinger, onChangeSwitchFinger }) => (
  <View style={styles.settingsView}>
    <Image style={styles.centeredImage} source={require("../../assets/pin.png")} />
    <View style={{ paddingLeft: 10, flex: 1, flexDirection: "column" }}>
      <Text style={styles.boldText} variant="headlineSmall">
        Biometrik
      </Text>
      <Switch onChange={onChangeSwitchFinger} value={valueSwitchFinger} thumbColor="#414EBD" color="#414EBD" />
    </View>
  </View>
);

const LogoutButton = ({ onLogout }) => (
  <Button buttonColor="#ed1c35" mode="contained" onPress={onLogout} style={{ width: "100%" }}>
    <TextDefault style={styles.logoutButtonText}>KELUAR</TextDefault>
  </Button>
);

const styles = StyleSheet.create({
  active: {
    borderWidth: 2,
    width: "46%",
  },
  unactive: {
    borderColor: "#424EBD",
    borderWidth: 2,
    width: "46%",
  },
  centeredImage: {
    alignSelf: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  absoluteText: {
    position: "absolute",
    bottom: 5,
    left: 10,
  },
  alignRightText: {
    alignSelf: "flex-end",
  },
  settingsView: {
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 15,
    padding: 15,
    flexDirection: "row",
    marginBottom: 15,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  deviceContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 15,
    padding: 15,
    flexDirection: "row",
    marginBottom: 15,
  },
  noDeviceContainer: {
    alignItems: "center",
  },
  deviceInfo: {
    paddingLeft: 10,
    flexDirection: "column",
  },
});

export default Dashboard;
