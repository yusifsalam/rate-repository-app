import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from "../graphql/queries";
import Text from "./Text";
import useSignOut from "../hooks/useSignOut";

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
  const { data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
  });
  const userLoggedIn = data && data.authorizedUser;
  const [signOut] = useSignOut();
  const handleSubmit = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={TouchableWithoutFeedback}>
          <Text style={styles.appBap}> Repositories</Text>
        </Link>
        {userLoggedIn ? (
          <View style={{ flexDirection: "row" }}>
            <Link to="/add-review" component={TouchableWithoutFeedback}>
              <Text style={styles.appBap}>Create a review</Text>
            </Link>
            <TouchableWithoutFeedback onPress={handleSubmit}>
              <Text style={styles.appBap}>Sign out </Text>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <Link to="/sign-in" component={TouchableWithoutFeedback}>
            <Text style={styles.appBap}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
