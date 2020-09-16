import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  appBap: {
    backgroundColor: "#24292e",
    color: "white",
    fontWeight: "bold",
    opacity: 10,
    height: 70,
    paddingTop: 35,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <Text style={styles.appBap}> Repositories</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AppBar;
