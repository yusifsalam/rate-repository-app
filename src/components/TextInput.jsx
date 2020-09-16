import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textComponent: {
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return (
    <NativeTextInput
      style={[styles.textComponent, textInputStyle]}
      {...props}
    />
  );
};

export default TextInput;
