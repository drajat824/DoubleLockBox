import React, { useEffect, useState } from "react";
import { ScrollView, View, RefreshControl, TouchableOpacity, Linking } from "react-native";
import { Container, TextDefault } from "./../component";
import Mapbox, { MapView, MarkerView, Camera, PointAnnotation } from "@rnmapbox/maps";
import Icon from "react-native-vector-icons/FontAwesome";

Mapbox.setWellKnownTileServer("Mapbox");
Mapbox.setAccessToken("pk.eyJ1IjoiZHJhamF0ODI0IiwiYSI6ImNsb3N3ajRhcTA0aTcybHMxbmNnbXpyc2gifQ.uD_hEikIfoQK1GwWR-mKjw");

const DeviceMaps = ({navigation, route}) => {
  const { device } = route.params;
  const url = `https://www.google.com/maps/search/?api=1&query=${-8.1682361},${113.7159681}`;

  return (
    <View style={{ flex: 1 }}>
      <MapView id="tes" style={{ flex: 1 }}>
        <Camera zoomLevel={18} centerCoordinate={[113.7159681, -8.1682361]} />
        <PointAnnotation id="tes" coordinate={[113.7159681, -8.1682361]} />
      </MapView>
      <View
        style={{
          alignSelf: "center",
          backgroundColor: "white",
          position: "absolute",
          width: "90%",
          top: 10,
          padding: 15,
          borderRadius: 15,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("DeviceDetailScreen", { device })}
        >
          <Icon name="chevron-left" color="black" size={30} />
          <TextDefault style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center", paddingLeft: 20 }}>
            Lokasi Perangkat
          </TextDefault>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          width: "90%",
          bottom: 10,
          alignSelf: "center",
          padding: 15,
          borderRadius: 15,
          flexDirection: "row",
        }}
      >
        <View>
          <Icon name="map-marker" color="red" size={60} />
        </View>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <TextDefault style={{ fontWeight: "bold", fontSize: 23, paddingLeft: 20, paddingTop: 5 }}>
            Lokasi Perangkat Anda
          </TextDefault>
          <TouchableOpacity onPress={() => Linking.openURL(url)} style={{ position: "absolute", bottom: 0, right: 0 }}>
            <TextDefault style={{ textDecorationLine: "underline", color: "#414EBD" }}>Buka Lewat Google Maps</TextDefault>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeviceMaps;
