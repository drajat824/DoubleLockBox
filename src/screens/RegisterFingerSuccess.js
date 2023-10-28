import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { Text, Switch, Button } from "react-native-paper";
import { Container, TextDefault } from "../component";

import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

import { useDispatch } from "react-redux";
import { setUserUseFinger } from "../store/actions/User";
import { setRegister } from "../store/actions/Register";

const RegisterFingerSuccess = ({ navigation }) => {
  const dispatch = useDispatch();
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    rnBiometrics
      .createKeys()

      .then(() => {
        dispatch(setUserUseFinger(true));
      });
  }, []);

  return (
    <Container style={{ flexDirection: "column" }}>
      <View style={{ flex: 0.8 }}>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Aktivasi Biometrik
        </Text>
        <TextDefault style={{ paddingTop: 10 }}>
          Anda telah berhasil mengaktifkan pengaturan sidik jari
          <TextDefault style={{ color: "green", fontWeight: "bold" }}>
            {" "}
            kunci biometrik telah berhasil diaktivasi.
          </TextDefault>
        </TextDefault>
      </View>
      <View style={{ flex: 1 }}>
        <Image source={require("../../assets/biometric-activation-success.png")} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Button
          onPress={() => {
            dispatch(setUserUseFinger(true));
            dispatch(setRegister(true));
          }}
          mode="contained"
          style={{ width: 150 }}
        >
          <TextDefault style={{ color: "white" }}>Lanjut</TextDefault>
        </Button>
      </View>
    </Container>
  );
};

export default RegisterFingerSuccess;
