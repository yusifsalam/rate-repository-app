import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";

import RepositoryList from "./RepositoryList";
import SingleRepository from "./RepositorySingleView";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ReviewForm from "./ReviewForm";
import MyRewiews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/sign-in" exact>
          <SignIn />
        </Route>
        <Route path="/sign-up" exact>
          <SignUp />
        </Route>
        <Route path="/add-review" exact>
          <ReviewForm />
        </Route>
        <Route path="/my-reviews" exact>
          <MyRewiews />
        </Route>
        <Route path="/repos/:id" component={SingleRepository} />
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
