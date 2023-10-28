import React, { memo } from "react";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const TextError = ({ style, children, ...props }) => (
  <Text variant="bodyLarge" style={{color: 'red', fontWeight: 'bold'}} >{children}</Text>
);

const styles = StyleSheet.create({
  color: 'red'
})

export default memo(TextError);
