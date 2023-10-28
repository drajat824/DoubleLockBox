import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Button, Text, Switch } from "react-native-paper";
import { ScrollContainer, TextDefault, InputPin } from "../component";

import { useSelector, useDispatch } from "react-redux";
import { setUserUseFinger } from "../store/actions/User";
import { setLogin } from "../store/actions/Auth";

const Dashboard = ({ navigation }) => {
  const height = Dimensions.get("window").height;

  const [activeScreen, setActiveScreen] = useState("Perangkat");
  const [dataDevice, setDataDevice] = useState([{ id_device: 123898129382 }]);

  return (
    <ScrollContainer
      contentContainerStyle={{
        height: dataDevice?.length >= 1 ? null : height,
        paddingVertical: 30,
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Perangkatku
        </Text>
        <TextDefault>
          Kelola perangkat untuk terkoneksi dengan aplikasi untuk kontrol Double Lock Box-mu.
        </TextDefault>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 30,
          }}
        >
          <Button
            mode={activeScreen === "Perangkat" ? "contained" : "outlined"}
            style={activeScreen === "Perangkat" ? styles.active : styles.unactive}
            onPress={() => setActiveScreen("Perangkat")}
          >
            <TextDefault
              style={{
                color: activeScreen === "Perangkat" ? "white" : "#424EBD",
              }}
            >
              Perangkat
            </TextDefault>
          </Button>

          <Button
            mode={activeScreen === "Aplikasi" ? "contained" : "outlined"}
            style={activeScreen === "Aplikasi" ? styles.active : styles.unactive}
            onPress={() => setActiveScreen("Aplikasi")}
          >
            <TextDefault
              style={{
                color: activeScreen === "Aplikasi" ? "white" : "#424EBD",
              }}
            >
              Aplikasi
            </TextDefault>
          </Button>
        </View>
      </View>

      <View style={{ flex: 3 }}>
        {activeScreen === "Aplikasi" ? (
          <Application navigation={navigation} />
        ) : (
          <Device navigation={navigation} dataDevice={dataDevice} />
        )}
      </View>

      {activeScreen === "Perangkat" ? (
        <View style={{ paddingTop: 15, flex: 1, justifyContent: "center" }}>
          <Button mode="contained" onPress={() => navigation.navigate("AddDeviceScreen")}>
            <TextDefault style={{ color: "white" }}>Tambah Perangkat</TextDefault>
          </Button>
        </View>
      ) : (
        <View />
      )}
    </ScrollContainer>
  );
};

export default Dashboard;

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
});

const Device = ({ dataDevice, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("DeviceDetailScreen")}>
    {dataDevice?.length === 0 ? (
      <View>
        <Image
          style={{ alignSelf: "center" }}
          source={require("../../assets/perangkat-home.png")}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", textAlign: "center" }} variant="headlineLarge">
            Tidak Ada Perangkat
          </Text>
          <TextDefault style={{ textAlign: "center" }}>
            Tambah Perangkat untuk memulai kontrol Double Lock Box Kamu
          </TextDefault>
        </View>
      </View>
    ) : (
      <View>
        {dataDevice?.map((e, i) => (
          <View
            key={i}
            style={{
              borderRadius: 10,
              backgroundColor: "white",
              paddingVertical: 15,
              padding: 15,
              flexDirection: "row",
              marginBottom: 15,
            }}
          >
            <Image style={{ alignSelf: "center" }} source={require("../../assets/perangkat.png")} />
            <View style={{ paddingLeft: 10, flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold" }} variant="headlineSmall">
                ID Perangkat
              </Text>
              <Text>{e?.id_device}</Text>
              <Text style={{ position: "absolute", bottom: 5, left: 10 }}>Active</Text>
            </View>
          </View>
        ))}
      </View>
    )}
  </TouchableOpacity>
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

  const onLogout = () => {
    dispatch(setLogin(false));
  };

  return (
    <View>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          paddingVertical: 15,
          padding: 15,
          flexDirection: "row",
          marginBottom: 15,
        }}
      >
        <Image style={{ alignSelf: "center" }} source={require("../../assets/pin.png")} />

        <View style={{ paddingLeft: 10, flex: 1, flexDirection: "column" }}>
          <Text style={{ fontWeight: "bold", flex: 1 }} variant="headlineSmall">
            Kunci PIN
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("ChangePinScreen")}>
            <Text style={{ alignSelf: "flex-end" }}>Ubah PIN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          paddingVertical: 15,
          padding: 15,
          flexDirection: "row",
          marginBottom: 15,
        }}
      >
        <Image style={{ alignSelf: "center" }} source={require("../../assets/pin.png")} />

        <View style={{ paddingLeft: 10, flex: 1, flexDirection: "column" }}>
          <Text style={{ fontWeight: "bold", flex: 1 }} variant="headlineSmall">
            Biometrik
          </Text>
          <Switch
            onChange={onChangeSwitchFinger}
            value={valueSwitchFinger}
            thumbColor="#414EBD"
            color="#414EBD"
          />
        </View>
      </View>

      {/* <View
      style={{
        borderRadius: 10,
        backgroundColor: "white",
        paddingVertical: 15,
        padding: 15,
        flexDirection: "row",
        marginBottom: 15,
      }}
    >
      <Image style={{ alignSelf: "center" }} source={require("../../assets/pin.png")} />

      <View style={{ paddingLeft: 10, flex: 1, flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold", flex: 1 }} variant="headlineSmall">
          Face ID
        </Text>
        <Switch value={true} thumbColor="#414EBD" color="#414EBD" />
      </View>
    </View> */}

      <Button buttonColor='#ed1c35' mode="contained" onPress={onLogout} style={{ width: "100%" }}>
        <TextDefault style={{ color: "white", fontSize: 20, fontWeight: 'bold', paddingVertical: 5 }}>KELUAR</TextDefault>
      </Button>
    </View>
  );
};
