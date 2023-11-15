import React from "react";
import { View, Image } from "react-native";
import { Text, Switch, Button } from "react-native-paper";
import { Container, TextDefault } from "../component";

import { useDispatch } from "react-redux";
import { setRegister } from "../store/actions/Register";

const RegisterFaceCamera = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', flex: 1}} >
      </View>
    </View>
  );
};

export default RegisterFaceCamera;
