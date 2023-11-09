import React, { memo } from "react";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const TextError = ({ style, children, ...props }) => (
  <Text variant="bodyLarge" style={[style, styles.text]} >{children}</Text>
);

const styles = StyleSheet.create({
  text : {
    color: 'red',
    fontWeight: 'bold'
  }
})

export default memo(TextError);
