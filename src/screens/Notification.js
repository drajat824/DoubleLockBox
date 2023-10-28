import React, { useState } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity, Image, Switch } from "react-native";
import { Button, Text } from "react-native-paper";
import { ScrollContainer, TextDefault, InputPin } from "../component";
import Icon from "react-native-vector-icons/FontAwesome5";

const Notification = ({ navigation }) => {
  const [data, setData] = useState([
    { date: "22 Agustus 2013", time: "10:50", message: "Ada tindakan mencurigakan pada Perangkat Kamu!" },
    { date: "22 Agustus 2013", time: "10:50", message: "Ada tindakan mencurigakan pada Perangkat Kamu!" },
    { date: "22 Agustus 2013", time: "10:50", message: "Ada tindakan mencurigakan pada Perangkat Kamu!" },
    { date: "22 Agustus 2013", time: "10:50", message: "Ada tindakan mencurigakan pada Perangkat Kamu!" },
    { date: "22 Agustus 2013", time: "10:50", message: "Ada tindakan mencurigakan pada Perangkat Kamu!" },
    { date: "22 Agustus 2013", time: "10:50", message: "Ada tindakan mencurigakan pada Perangkat Kamu!" },
    { date: "22 Agustus 2013", time: "10:50", message: "Ada tindakan mencurigakan pada Perangkat Kamu!" },
    { date: "22 Agustus 2013", time: "10:50", message: "Ada tindakan mencurigakan pada Perangkat Kamu!" },
  ]);

  return (
    <ScrollContainer contentContainerStyle={{ paddingTop: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("DeviceDetailScreen")}>
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineSmall">
          Notifikasi
        </Text>
        <View />
      </View>

      <View style={{ paddingTop: 30 }}>
        {data?.map((e, i) => (
          <View key={i} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Image source={require("../../assets/bell.png")} />
            </View>

            <View style={{ paddingLeft: 10, flex: 3 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }} variant="labelLarge">
                22 Agustus 2023, 10:50
              </Text>
              <TextDefault>Ada tindakan mencurigakan pada Perangkat Kamu!</TextDefault>
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
