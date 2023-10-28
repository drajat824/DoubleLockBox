import React, { useRef, useState, useEffect } from "react";
import { View, Image, AppState } from "react-native";
import { Text, Switch, Button } from "react-native-paper";
import { Container, TextDefault } from "../component";

import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

import { useDispatch } from "react-redux";
import { setRegister } from "../store/actions/Register";

const RegisterFingerFailed = ({ navigation }) => {
  const dispatch = useDispatch();
  const rnBiometrics = new ReactNativeBiometrics();

  //APPSTATE
  const appState = useRef(AppState?.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState?.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      /**
       * Jika status aplikasi ganti, maka masukkan ke dalam data state
       */
      appState.current = nextAppState;
      setAppStateVisible(appState?.current);
    });

    return () => {
      /**
       * Di cleanup
       */
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === BiometryTypes.Biometrics) {
        navigation.navigate("RegisterFingerSuccessScreen");
      } else {
        navigation.navigate("RegisterFingerFailedScreen");
      }
    });
  }, [appStateVisible]);

  return (
    <Container style={{ flexDirection: "column" }}>
      <View style={{ flex: 0.8 }}>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Aktivasi Biometrik
        </Text>
        <TextDefault style={{ paddingTop: 10 }}>
          <TextDefault style={{ color: "red", fontWeight: "bold" }}>Anda belum melakukan pengaturan sidik jari.</TextDefault> Silakan aktifkan
          terlebih dahulu pengaturan sidik jari di menu pengaturan pada handphone Anda.
        </TextDefault>
      </View>
      <View style={{ flex: 1 }}>
        <Image source={require("../../assets/biometric-activation-falied.png")} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Button onPress={() => dispatch(setRegister(true))}>
          <TextDefault>LEWATI</TextDefault>
        </Button>
      </View>
    </Container>
  );
};

export default RegisterFingerFailed;
