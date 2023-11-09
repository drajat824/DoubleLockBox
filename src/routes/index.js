import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  RegisterFinger,
  RegisterFace,
  RegisterPin,
  Login,
  Dashboard,
  ChangePin,
  DeviceDetail,
  Notification,
  AddDevice,
  RegisterFingerSuccess,
  RegisterFingerFailed,
  DeviceFingerprint,
} from "../screens";
import { useSelector, useDispatch } from "react-redux";
import { setNotifications, setNotificationReceive } from "../store/actions/Notification";
import { OneSignal } from "react-native-onesignal";
import { ConnectMQTT, DisconnectMQTT, clientMQTT } from "../service/Mqtt";
import { getUniqueId } from "react-native-device-info";
import { setMobileID } from "../store/actions/Mobile";
import { useState } from "react";
import { Modal, Button, Text } from "react-native-paper";
import { View, ActivityIndicator } from "react-native";
import { TextDefault } from "../component";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Routes = () => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    getUniqueId().then((uniqueId) => {
      dispatch(setMobileID(uniqueId));
    });
  }, []);

  // const isLogin = useSelector((state) => state?.Auth?.token);
  const { isLogin } = useSelector((state) => state?.Auth) || false;
  const { isRegister } = useSelector((state) => state?.Register) || false;
  const { notificationEnabled } = useSelector((state) => state?.Notification) || false;
  const { idMobile } = useSelector((state) => state?.Mobile) || false;

  const [connectionLost, setConnectionLost] = useState(false);

  useEffect(() => {
    OneSignal.initialize("49b0050a-99f4-4842-ba5b-db1b516fb6cb");
  }, []);

  if (!!notificationEnabled) {

    // OneSignal.Notifications.addEventListener("click", (event) => {
    //   const notificationData = event.notification;
    //   console.log("CLICK. Data Notifikasi:", notificationData?.body);
    //   const navigation = useNavigation();
    //   navigation.navigate("NotificationScreen");
    // });
    OneSignal.Notifications.addEventListener("foregroundWillDisplay", (event) => {
      event.preventDefault();
      const notificationData = event.notification;
      dispatch(setNotifications(notificationData?.body))
      event.getNotification().display();
    });
    // OneSignal.Notifications.addEventListener("received", (event) => {
    //   console.log('Received Notification: ', notification);
    // });
  }

  // useEffect(() => {
  if (!!notificationEnabled) {
    OneSignal.Notifications.hasPermission();
    OneSignal.User.pushSubscription.optIn();
  } else {
    OneSignal.User.pushSubscription.optOut();
  }
  // }, [notificationEnabled]);

  clientMQTT.onConnectionLost = async function (responseObject) {
    if (responseObject.errorCode !== 0) {
      await setConnectionLost(true);
      console.log("Koneksi hilang: " + responseObject.errorMessage);
      ConnectMQTT(idMobile).then((success) => {
        if (success) {
          setTimeout(() => {
            setConnectionLost(false);
          }, 500);
        }
      });
    }
  };

  if (!isRegister) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerBackVisible: false,
            headerMode: "none",
          }}
        >
          <Stack.Screen
            name="RegisterPinScreen"
            component={RegisterPin}
            options={{
              headerTitle: "",
              headerTransparent: true,
            }}
          />

          <Stack.Screen
            name="RegisterFingerScreen"
            component={RegisterFinger}
            options={{
              headerTitle: "",
              headerTransparent: true,
            }}
          />

          <Stack.Screen
            name="RegisterFingerSuccessScreen"
            component={RegisterFingerSuccess}
            options={{
              headerTitle: "",
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="RegisterFingerFailedScreen"
            component={RegisterFingerFailed}
            options={{
              headerTitle: "",
              headerTransparent: true,
            }}
          />

          <Stack.Screen
            name="RegisterFaceScreen"
            component={RegisterFace}
            options={{ headerTitle: "", headerTransparent: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (!isLogin) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerBackVisible: false,
            headerMode: "none",
          }}
        >
          <Stack.Screen name="LoginScreen" component={Login} options={{ headerTitle: "", headerTransparent: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (!!connectionLost) {
    return (
      <SafeAreaProvider>
        <MyModal visible={true} />
      </SafeAreaProvider>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerMode: "none",
        }}
      >
        <Stack.Screen name="DashboardScreen" component={Dashboard} options={{ headerTitle: "", headerTransparent: true }} />
        <Stack.Screen name="ChangePinScreen" component={ChangePin} options={{ headerTitle: "", headerTransparent: true }} />
        <Stack.Screen name="DeviceDetailScreen" component={DeviceDetail} options={{ headerTitle: "", headerTransparent: true }} />
        <Stack.Screen name="NotificationScreen" component={Notification} options={{ headerTitle: "", headerTransparent: true }} />
        <Stack.Screen name="AddDeviceScreen" component={AddDevice} options={{ headerTitle: "", headerTransparent: true }} />
        <Stack.Screen
          name="DeviceFingerprintScreen"
          component={DeviceFingerprint}
          options={{ headerTitle: "", headerTransparent: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MyModal = ({ visible }) => {
  return (
    <Modal
      dismissable={true}
      visible={visible}
      contentContainerStyle={{ backgroundColor: "#FEC901", padding: 20, marginHorizontal: 20, borderRadius: 10 }}
    >
      <View>
        <ActivityIndicator size={100} color="white" />
        <Text style={{ paddingTop: 15, fontWeight: "500", color: "black" }} variant="bodyLarge">
          Sedang mencoba terhubung ke server...
        </Text>
      </View>
    </Modal>
  );
};

export default Routes;
