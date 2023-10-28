import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity, Image, Switch } from "react-native";
import { Button, Text } from "react-native-paper";
import { ScrollContainer, TextDefault, InputPin, Container } from "../component";
import Icon from "react-native-vector-icons/FontAwesome5";

const DeviceDetail = ({ navigation }) => {
  const height = Dimensions.get("window").height;

  return (
    <Container contentContainerStyle={{ paddingTop: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("DashboardScreen")} >
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineSmall">
          Perangkat
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")} >
          <Icon name="bell" size={30} />
        </TouchableOpacity>
      </View>

      <View style={{ height: height, paddingTop: 30 }}>
        <View style={styles.card}>
          <Image style={{ alignSelf: "center" }} source={require("../../assets/perangkat.png")} />
          <View style={{ paddingLeft: 10, flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold" }} variant="headlineSmall">
              ID Perangkat
            </Text>
            <TextDefault>718297398127</TextDefault>
            <Text style={{ position: "absolute", bottom: 5, left: 10 }}>Active</Text>
          </View>
        </View>

        <View style={{ flex: 2 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={[styles.card, { width: "48%", height: 160, flexDirection: "column" }]}>
              <View>
                <Image source={require("../../assets/smile.png")} />
                <Text style={{ fontWeight: "bold", paddingBottom: 10, fontSize: 20, paddingTop: 10, paddingLeft: 3 }} variant="labelLarge">
                  Face ID
                </Text>
                <View style={{ justifyContent: "flex-start" }}>
                  <Switch value={true} thumbColor="#414EBD" color="#414EBD" />
                </View>
              </View>
            </View>

            <View style={[styles.card, { width: "48%", height: 160, flexDirection: "column" }]}>
              <View>
                <Image source={require("../../assets/finger-2.png")} />
                <Text style={{ fontWeight: "bold", paddingBottom: 10, fontSize: 20, paddingTop: 10, paddingLeft: 3 }} variant="labelLarge">
                  Fingerprint
                </Text>
                <View style={{ justifyContent: "flex-start" }}>
                  <Switch value={true} thumbColor="#414EBD" color="#414EBD" />
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={[styles.card, { width: "48%", height: 160, flexDirection: "column" }]}>
              <View>
                <Image source={require("../../assets/vibrate.png")} />
                <Text style={{ fontWeight: "bold", paddingBottom: 10, fontSize: 20, paddingTop: 10, paddingLeft: 3 }} variant="labelLarge">
                  Face ID
                </Text>
                <View style={{ justifyContent: "flex-start" }}>
                  <Switch value={true} thumbColor="#414EBD" color="#414EBD" />
                </View>
              </View>
            </View>

            <View style={[styles.card, { width: "48%", height: 160, flexDirection: "column" }]}>
              <View>
                <Image source={require("../../assets/bell.png")} />
                <Text style={{ fontWeight: "bold", paddingBottom: 10, fontSize: 20, paddingTop: 10, paddingLeft: 3 }} variant="labelLarge">
                  Fingerprint
                </Text>
                <View style={{ justifyContent: "flex-start" }}>
                  <Switch value={true} thumbColor="#414EBD" color="#414EBD" />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 1.1, justifyContent: "flex-start" }}>
          <TouchableOpacity style={{alignItems: 'center'}} >
            <Image style={{ width: 70, resizeMode: "contain" }} source={require("../../assets/unlock.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default DeviceDetail;

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
