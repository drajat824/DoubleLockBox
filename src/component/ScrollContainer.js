import React, { memo } from "react";
import Styles from "./Styles";
import { ScrollView } from "react-native";

const ScrollContainer = ({ style, children, ...props }) => (
  <ScrollView
    style={[
      Styles.background,
      { height: "100%", weight: "100%", paddingHorizontal: 30 },
      style,3
    ]}
    {...props}
  >
    {children}
  </ScrollView>
);

export default memo(ScrollContainer);
