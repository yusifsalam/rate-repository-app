import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#24292e",
    paddingTop: 40,
  },
  appBap: {
    color: "white",
    fontWeight: "bold",
    opacity: 10,
    margin: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={TouchableWithoutFeedback}>
          <Text style={styles.appBap}> Repositories</Text>
        </Link>
        <Link to="/sign-in" component={TouchableWithoutFeedback}>
          <Text style={styles.appBap}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
