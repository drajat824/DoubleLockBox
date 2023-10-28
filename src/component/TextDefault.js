import React, { memo } from "react";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const TextDefault = ({ style, children, ...props }) => (
  <Text variant="bodyLarge" style={[style, styles.color]} >{children}</Text>
);

const styles = StyleSheet.create({
  color: 'black'
})

export default memo(TextDefault);
