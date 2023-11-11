import React, { useEffect, useState } from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import { WebView } from "react-native-webview";

const DeviceCamera = () => {
  const [state, setState] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setState(state + 1);
  };

  useEffect(() => {
    setRefreshing(false);
  }, [refreshing]);

  return (
    <ScrollView
      style={{ position: "relative" }}
      contentContainerStyle={{ flex: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <WebView
        key={state}
        startInLoadingState={true}
        source={{ uri: "http://192.168.43.11/" }}
        style={{ flex: 1, position: "relative" }}
      />
    </ScrollView>
  );
};

export default DeviceCamera;
