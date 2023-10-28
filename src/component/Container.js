import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Styles from "./Styles";

const Container = ({ style, children, ...props }) => (
  <View
    style={[
      Styles.background,
      { height: "100%", weight: "100%", padding: 30 },
      style,
    ]}
    {...props}
  >
    {children}
  </View>
);

export default memo(Container);
