import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import { buttonStyle, buttonDisabledStyle } from "../theme";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { useHistory } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  button: buttonStyle,
  buttonDisabled: buttonDisabledStyle,
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit, errors }) => {
  const buttonOn = Object.keys(errors).length === 0;
  return (
    <View>
      <FormikTextInput
        name="username"
        placeholder="Username"
        testID="usernameField"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        testID="passwordField"
      />
      <TouchableWithoutFeedback
        onPress={onSubmit}
        disabled={!buttonOn}
        testID="submitButton"
      >
        <Text style={[styles.button, !buttonOn && styles.buttonDisabled]}>
          Sign In
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignInViewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors }) => (
        <SignInForm onSubmit={handleSubmit} errors={errors} />
      )}
    </Formik>
  );
};

const SignInView = () => {
  const history = useHistory();
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log("sign in data", data);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return <SignInViewContainer onSubmit={onSubmit} />;
};

export default SignInView;
