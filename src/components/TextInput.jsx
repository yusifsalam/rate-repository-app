import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textComponent: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  errorStyle: {
    borderColor: "#d73a4a",
  },
});

const TextInput = ({ style, error, touched, ...props }) => {
  const textInputStyle = [style];
  const displayError = error && touched;
  return (
    <NativeTextInput
      style={[
        styles.textComponent,
        displayError ? styles.errorStyle : {},
        textInputStyle,
      ]}
      {...props}
    />
  );
};

export default TextInput;
