import React, { useEffect, useState } from "react";
import { View, Dimensions, SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { ScrollContainer, TextDefault, InputPin, TextError } from "../component";

import { useDispatch, useSelector } from "react-redux";
import { setUserPin } from "../store/actions/User";

const ChangePin = ({ navigation }) => {
  const dispatch = useDispatch();
  const { pin } = useSelector((state) => state?.User);

  const height = Dimensions.get("window").height;

  const [pinOld, setPinOld] = useState("");
  const [pinUser, setPinUser] = useState("");
  const [pinUser2, setPinUser2] = useState("");

  const [disableButton, setDisableButton] = useState(true);

  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessagePinOld, setErrorMessagePinOld] = useState(false);

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
    if (pin !== pinOld) {
      setErrorMessagePinOld(true);
    } else {
      if (pinUser !== pinUser2) {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);
        dispatch(setUserPin(pinUser));
        navigation.navigate("DashboardScreen");
      }
    }
  };

  return (
    <ScrollContainer contentContainerStyle={{ height: height, paddingTop: 30 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Ubah PIN
        </Text>
        <TextDefault>Ubah PIN untuk menjaga keamanan aplikasi</TextDefault>
      </View>

      <View style={{ flex: 4, paddingBottom: 30 }}>
        <View>
          <TextDefault style={{ fontWeight: "bold", top: 5 }}>PIN Lama</TextDefault>
          <InputPin
            isPinFull={(data) => setPinFull(data)}
            setPin={(data) => {
              setPinOld(data), setErrorMessage(false), setErrorMessagePinOld(false);
            }}
          />
          {errorMessagePinOld && <TextError>PIN tidak sama dengan PIN lama Anda!</TextError>}
        </View>

        <View>
          <TextDefault style={{ fontWeight: "bold", top: 5 }}>PIN Baru</TextDefault>
          <InputPin
            isPinFull={(data) => setPinFull(data)}
            setPin={(data) => {
              setPinUser(data), setErrorMessage(false), setErrorMessagePinOld(false);
            }}
          />
        </View>

        <View>
          <TextDefault style={{ fontWeight: "bold", top: 5 }}>Ulang PIN Baru</TextDefault>
          <InputPin
            isPinFull={(data) => setPinFull2(data)}
            setPin={(data) => {
              setPinUser2(data), setErrorMessage(false), setErrorMessagePinOld(false);
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

export default ChangePin;
