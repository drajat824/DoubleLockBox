import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Text, Switch, Button } from "react-native-paper";
import { Container, TextDefault } from "../component";

import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

import { useIsFocused } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { setUserUseFinger } from "../store/actions/User";
import { setRegister } from "../store/actions/Register";

const RegisterFinger = ({ navigation }) => {
  const dispatch = useDispatch();
  const { useFinger } = useSelector((state) => state?.User);

  const rnBiometrics = new ReactNativeBiometrics();

  const [valueSwitch, setValueSwitch] = useState(false);

  onChangeSwitch = () => {
    setValueSwitch(!valueSwitch);
  };

  useEffect(() => {
    dispatch(setUserUseFinger(valueSwitch))
    if (valueSwitch) {
      onNext();
    }
  }, [valueSwitch])

  let isFocused = useIsFocused();

  useEffect(() => {
    setValueSwitch(useFinger);
  }, [isFocused]);

  useEffect(() => {
    rnBiometrics.deleteKeys();
  }, []);

  onNext = () => {
    rnBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === BiometryTypes.Biometrics) {
        navigation.navigate("RegisterFingerSuccessScreen");
      } else {
        navigation.navigate("RegisterFingerFailedScreen");
      }
    });
  };

  return (
    <Container style={{ flexDirection: "column" }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Aktivasi Biometrik
        </Text>
        <TextDefault>Tingkatkan keamanan aplikasi dengan mengaktifkan kunci biometrik</TextDefault>
      </View>
      <View style={{ flex: 4 }}>
        <Image source={require("../../assets/biometric-activation.png")} />
        <Switch
          onChange={onChangeSwitch}
          value={valueSwitch}
          thumbColor="#414EBD"
          color="#414EBD"
          style={{
            transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
            position: "absolute",
            position: "absolute",
            bottom: 70,
            left: "45%",
          }}
        />
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
        <Button onPress={onNext} mode="contained" style={{ width: 150 }}>
          <TextDefault style={{ color: "white" }}>Lanjut</TextDefault>
        </Button>
      </View>
    </Container>
  );
};

export default RegisterFinger;
