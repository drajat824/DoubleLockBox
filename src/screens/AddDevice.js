import React from "react";
import { View, Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { ScrollContainer, TextDefault, InputPin } from "../component";

const RegisterPin = ({ navigation }) => {
  const height = Dimensions.get("window").height;

  return (
    <ScrollContainer contentContainerStyle={{ height: height, paddingTop: 30 }}>
      <View style={{ flex: 1, paddingBottom: 30 }}>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Tambah Perangkat
        </Text>
        <TextDefault>Tambah serta kelola perangkatmu dengan memasukkan ID Perangkat dan Kunci Keamanan Perangkat</TextDefault>
      </View>

      <View style={{ flex: 4 }}>
        <View>
          <TextDefault style={{ fontWeight: "bold", top: 5 }}>ID Perangkat</TextDefault>
          <TextInput theme={{ roundness: 20}} label='Masukan ID Perangkat' mode="outlined" style={styles.input} />
        </View>

        <View>
          <TextDefault style={{ fontWeight: "bold", top: 5 }}>Kunci keamanan</TextDefault>
          <TextInput theme={{ roundness: 20}} label='Masukan Kunci Keamanan' mode="outlined" style={styles.input} />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <Button mode="contained" onPress={() => navigation.navigate("DashboardScreen")}>
          <TextDefault style={{ color: "white" }}>Simpan</TextDefault>
        </Button>
      </View>
    </ScrollContainer>
  );
};

export default RegisterPin;

const styles = StyleSheet.create({
    input: {
      textAlign: "left",
      marginHorizontal: 3,
      marginVertical: 15,
      paddingHorizontal: 3,
      left: -3
    },
  });