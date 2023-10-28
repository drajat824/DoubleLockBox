import React from "react";
import { View, Image } from "react-native";
import { Text, Switch, Button } from "react-native-paper";
import { Container, TextDefault } from "../component";

// import SimilarFaces from "./SimilarFaces";

const RegisterFace = ({ navigation }) => {


  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", paddingBottom: 10 }} variant="headlineLarge">
          Aktivasi Face ID
        </Text>
        <TextDefault>Tingkatkan keamanan aplikasi dengan mengaktifkan kunci Face ID</TextDefault>
      </View>
      <View style={{ flex: 4 }}>
        <Image source={require("../../assets/face-activation.png")} />
        <Switch
          value={true}
          thumbColor="#414EBD"
          color="#414EBD"
          style={{
            transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
            position: "absolute",
            position: "absolute",
            bottom: 70,
            left: "45%",
          }}
        />
      </View>
      {/* <SimilarFaces /> */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Button onPress={() => navigation.navigate("LoginScreen")}>
          <TextDefault>LEWATI</TextDefault>
        </Button>
        <Button onPress={() => console.log("Lanjut")} mode="contained" style={{ width: 150 }}>
          <TextDefault style={{ color: "white" }}>Lanjut</TextDefault>
        </Button>
      </View>
    </Container>
  );
};

export default RegisterFace;
