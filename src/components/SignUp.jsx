import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import { buttonStyle, buttonDisabledStyle } from "../theme";
import Text from "./Text";
import { useHistory } from "react-router-native";
import useSignUp from "../hooks/useSignUp";

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const styles = StyleSheet.create({
  button: buttonStyle,
  buttonDisabled: buttonDisabledStyle,
});

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required("Username is required"),
  password: yup.string().min(5).max(30).required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit, errors }) => {
  const buttonOn = Object.keys(errors).length === 0;
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <TouchableWithoutFeedback
        onPress={onSubmit}
        disabled={!buttonOn}
        testID="submitButton"
      >
        <Text style={[styles.button, !buttonOn && styles.buttonDisabled]}>
          Sign up
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignUpViewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors }) => (
        <SignUpForm onSubmit={handleSubmit} errors={errors} />
      )}
    </Formik>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signUp({ username, password });
      console.log("registration data", data);
      history.push("/sign-in");
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpViewContainer onSubmit={onSubmit} />;
};

export default SignUp;
