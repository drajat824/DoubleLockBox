import React, { useEffect, useState } from "react";
import { View, Dimensions, SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { ScrollContainer, TextDefault, InputPin, TextError } from "../component";

import { useDispatch } from "react-redux";
import { setUserPin } from "../store/actions/User";

const RegisterPin = ({ navigation }) => {
  const dispatch = useDispatch();

  const height = Dimensions.get("window").height;

  const [pinUser, setPinUser] = useState("");
  const [pinUser2, setPinUser2] = useState("");

  const [disableButton, setDisableButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const [pinFull, setPinFull] = useState(false);
  const [pinFull2, setPinFull2] = useState(false);

  useEffect(() => {
    if (!!pinFull && !!pinFull2) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [pinFull, pinFull2]);

  useEffect(() => {
    if (pinUser?.length === 6 && pinUser?.length === 6) {
      setDisableButton(false);
    }
  }, [pinUser2]);

  onCheckPin = () => {
    if (pinUser !== pinUser2) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      dispatch(setUserPin(pinUser));
      navigation.navigate("RegisterFingerScreen");
    }
  };

  return (
    <ScrollContainer contentContainerStyle={{ height: height, paddingTop: 30 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Buat PIN
        </Text>
        <TextDefault>Buat PIN untuk menjaga keamanan dari aplikasi Double Lock Box</TextDefault>
      </View>

      <View style={{ flex: 4 }}>
        <View>
          <TextDefault style={{ fontWeight: "bold", top: 5 }}>PIN</TextDefault>
          <InputPin
            isPinFull={(data) => setPinFull(data)}
            setPin={(data) => {
              setPinUser(data), setErrorMessage(false);
            }}
          />
        </View>

        <View>
          <TextDefault style={{ fontWeight: "bold", top: 5 }}>Ulang PIN</TextDefault>
          <InputPin
            isPinFull={(data) => setPinFull2(data)}
            setPin={(data) => {
              setPinUser2(data), setErrorMessage(false);
            }}
          />
          {errorMessage && <TextError>PIN yang Anda masukkan tidak sama!</TextError>}
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <Button disabled={disableButton} mode="contained" onPress={onCheckPin}>
          <TextDefault style={{ color: "white" }}>Simpan PIN</TextDefault>
        </Button>
      </View>
    </ScrollContainer>
  );
};

export default RegisterPin;
