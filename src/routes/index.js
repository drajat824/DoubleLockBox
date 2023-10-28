import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
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
} from "../screens";
import { ConnectMQTT } from "../service/Mqtt";

const Routes = () => {
  const Stack = createStackNavigator();

  // const isLogin = useSelector((state) => state?.Auth?.token);
  const { isLogin } = useSelector((state) => state?.Auth) || false;
  const { isRegister } = useSelector((state) => state?.Register) || false;

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
          <Stack.Screen
            name="LoginScreen"
            component={Login}
            options={{ headerTitle: "", headerTransparent: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (!!isLogin) {
    ConnectMQTT();
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DashboardScreen"
          component={Dashboard}
          options={{ headerTitle: "", headerTransparent: true }}
        />

        <Stack.Screen
          name="ChangePinScreen"
          component={ChangePin}
          options={{ headerTitle: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="DeviceDetailScreen"
          component={DeviceDetail}
          options={{ headerTitle: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={Notification}
          options={{ headerTitle: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="AddDeviceScreen"
          component={AddDevice}
          options={{ headerTitle: "", headerTransparent: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
