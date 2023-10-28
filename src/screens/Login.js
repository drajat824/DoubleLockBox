import React, { useEffect, useState, useRef } from "react";
import { View, Image, TouchableOpacity, Dimensions, AppState } from "react-native";
import { Button, Text } from "react-native-paper";
import { ScrollContainer, TextDefault, InputPin, TextError } from "../component";
import ReactNativeBiometrics from "react-native-biometrics";

import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "./../store/actions/Auth";

const Login = ({ navigation }) => {
  const height = Dimensions.get("window").height;
  const { useFinger, useFace } = useSelector((state) => state?.User);

  const rnBiometrics = new ReactNativeBiometrics();

  const { pin } = useSelector((state) => state?.User);
  const dispatch = useDispatch();

  const [pinUser, setPinUser] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessageFinger, setErrorMessageFinger] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const [pinFull, setPinFull] = useState(false);

  const [fingerEnrolled, setFingerEnrolled] = useState(false);

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
    /**
     * Cek apakah fingerprint didelete atau tidak
     */
    rnBiometrics.isSensorAvailable().then((resultObject) => {
      const { available } = resultObject;
      if (!available) {
        setFingerEnrolled(true);
      }
    });
  }, [appStateVisible]);

  useEffect(() => {
    /**
     * Disable button ketika pin tidak full
     */
    if (pinFull) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [pinFull]);

  /**
   * Check PIN
   */
  onLogin = () => {
    if (pin === pinUser) {
      dispatch(setLogin(true));
    } else {
      setErrorMessage(true);
    }
  };

  onLoginFinger = () => {
    setErrorMessageFinger(false);
    setErrorMessage(false);

    rnBiometrics
      .simplePrompt({ promptMessage: "Verifikasi Sidik Jari" })
      .then((resultObject) => {
        const { success } = resultObject;

        if (success) {
          dispatch(setLogin(true));
        }
      })
      .catch(() => {
        setErrorMessageFinger(true);
      });
  };

  return (
    <ScrollContainer contentContainerStyle={{ height: height, paddingTop: 30 }}>
      <View>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Selamat Datang!
        </Text>
        <TextDefault>
          Masukkan Pin keamanan untuk masuk ke aplikasi. Kamu juga dapat masuk dengan FaceID ataupun
          Biometrik.
        </TextDefault>
      </View>

      <View style={{ flex: 3 }}>
        <View>
          <TextDefault style={{ fontWeight: "bold", top: 5 }}>PIN</TextDefault>
          <InputPin
            isPinFull={(data) => setPinFull(data)}
            setPin={(data) => {
              setPinUser(data);
              setErrorMessage(false);
              setErrorMessageFinger(false);
            }}
            isFirstChange={(data) => {
              if (!!data) {
                setErrorMessage(false);
                setErrorMessageFinger(false);
              }
            }}
          />
          {errorMessage && <TextError>PIN yang Anda masukkan tidak sama!</TextError>}
          {errorMessageFinger && (
            <TextError>Sidik jari tidak sesuai, coba beberapa saat lagi.</TextError>
          )}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 4 }}>
          <Button
            disabled={disableButton}
            mode="contained"
            onPress={onLogin}
            style={{ width: "100%", paddingVertical: 5 }}
          >
            <TextDefault style={{ color: "white", fontSize: 20 }}>Masuk</TextDefault>
          </Button>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {useFace && (
            <TouchableOpacity style={{ paddingLeft: 15 }}>
              <Image
                style={{ width: 40, resizeMode: "contain" }}
                source={require("../../assets/smile-2.png")}
              />
            </TouchableOpacity>
          )}
          {useFinger && !fingerEnrolled ? (
            <TouchableOpacity onPress={onLoginFinger} style={{ paddingLeft: !useFace ? 15 : 0 }}>
              <Image
                style={{ width: 40, resizeMode: "contain" }}
                source={require("../../assets/finger.png")}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </ScrollContainer>
  );
};

export default Login;
