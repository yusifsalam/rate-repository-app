import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";

import Text from "./Text";

const initialValues = {
  email: "",
  password: "",
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    color: "white",
    fontSize: theme.fontSizes.subheading,
    // height: 50,
    display: "flex",
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    overflow: "hidden",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.button}>Sign In</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignInView = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignInView;
