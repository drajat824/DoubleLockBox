import React, { useState } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity, Image, Switch } from "react-native";
import { Button, Text } from "react-native-paper";
import { ScrollContainer, TextDefault, InputPin } from "../component";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setNotifications } from "../store/actions/Notification";

const Notification = ({ navigation, route }) => {
  const { device } = route.params;
  const dispatch = useDispatch();

  const {notifications} = useSelector((state) => state.Notification);

  return (
    <ScrollContainer contentContainerStyle={{ paddingTop: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("DeviceDetailScreen", { device })}>
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineSmall">
          Notifikasi
        </Text>
        <View />
      </View>

      <View style={{ paddingTop: 30 }}>
        {notifications?.map((e, i) => (
          <View key={i} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Image source={require("../../assets/bell.png")} />
            </View>

            <View style={{ paddingLeft: 10, flex: 3 }}>
              {/* <Text style={{ fontWeight: "bold", fontSize: 18 }} variant="labelLarge">
                22 Agustus 2023, 10:50
              </Text> */}
              <TextDefault>{e}</TextDefault>
            </View>
          </View>
        ))}
      </View>
    </ScrollContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 15,
    padding: 15,
    flexDirection: "row",
    marginBottom: 15,
  },
});
