import React, { memo, useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const InputPin = ({ style, children, setPin, isPinFull, isFirstChange, ...props }) => {
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();
  const input6 = useRef();

  const [valueInput1, setValueInput1] = useState();
  const [valueInput2, setValueInput2] = useState();
  const [valueInput3, setValueInput3] = useState();
  const [valueInput4, setValueInput4] = useState();
  const [valueInput5, setValueInput5] = useState();
  const [valueInput6, setValueInput6] = useState();

  useEffect(() => {
    if (isFirstChange !== undefined) {
      isFirstChange(true);
    }

    if (
      !!valueInput1 &&
      !!valueInput2 &&
      !!valueInput3 &&
      !!valueInput4 &&
      !!valueInput5 &&
      !!valueInput6
    ) {
      if (isPinFull !== undefined) {
        isPinFull(true);
      }
    } else {
      if (isPinFull !== undefined) {
        isPinFull(false);
      }
    }
  }, [valueInput1, valueInput2, valueInput3, valueInput4, valueInput5, valueInput6]);

  useEffect(() => {
    if (!!valueInput1) input2.current.focus();
  }, [valueInput1]);

  useEffect(() => {
    if (!!valueInput2) input3.current.focus();
  }, [valueInput2]);

  useEffect(() => {
    if (!!valueInput3) input4.current.focus();
  }, [valueInput3]);

  useEffect(() => {
    if (!!valueInput4) input5.current.focus();
  }, [valueInput4]);

  useEffect(() => {
    if (!!valueInput5) input6.current.focus();
  }, [valueInput5]);

  useEffect(() => {
    if (
      !!valueInput1 &&
      !!valueInput2 &&
      !!valueInput3 &&
      !!valueInput4 &&
      !!valueInput5 &&
      !!valueInput6
    ) {
      setPin(
        `${valueInput1}${valueInput2}${valueInput3}${valueInput4}${valueInput5}${valueInput6}`
      );
    }
  }, [valueInput1, valueInput2, valueInput3, valueInput4, valueInput5, valueInput6]);

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <TextInput
        secureTextEntry={true}
        outlineColor={!!valueInput1 ? "#424EBD" : "white"}
        mode="outlined"
        maxLength={1}
        activeOutlineColor="blue"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(e) => {
          setValueInput1(e);
        }}
      />

      <TextInput
        secureTextEntry={true}
        outlineColor={!!valueInput2 ? "#424EBD" : "white"}
        ref={input2}
        mode="outlined"
        maxLength={1}
        textAlign="center"
        activeOutlineColor="#424EBD"
        keyboardType="numeric"
        style={[styles.input]}
        onChangeText={(e) => {
          setValueInput2(e);
        }}
      />

      <TextInput
        secureTextEntry={true}
        outlineColor={!!valueInput3 ? "#424EBD" : "white"}
        ref={input3}
        mode="outlined"
        maxLength={1}
        textAlign="center"
        activeOutlineColor="#424EBD"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(e) => {
          setValueInput3(e);
        }}
      />

      <TextInput
        secureTextEntry={true}
        outlineColor={!!valueInput4 ? "#424EBD" : "white"}
        ref={input4}
        mode="outlined"
        maxLength={1}
        textAlign="center"
        activeOutlineColor="#424EBD"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(e) => {
          setValueInput4(e);
        }}
      />

      <TextInput
        secureTextEntry={true}
        outlineColor={!!valueInput5 ? "#424EBD" : "white"}
        ref={input5}
        mode="outlined"
        maxLength={1}
        textAlign="center"
        activeOutlineColor="#424EBD"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(e) => {
          setValueInput5(e);
        }}
      />

      <TextInput
        secureTextEntry={true}
        outlineColor={!!valueInput6 ? "#424EBD" : "white"}
        ref={input6}
        mode="outlined"
        maxLength={1}
        textAlign="center"
        activeOutlineColor="#424EBD"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(e) => {
          setValueInput6(e);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: "left",
    height: 65,
    width: 50,
    fontWeight: "bold",
    fontSize: 25,
    marginHorizontal: 3,
    marginVertical: 15,
    paddingHorizontal: 3,
    left: -3,
  },
});

export default memo(InputPin);
