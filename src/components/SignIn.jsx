import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "../theme";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    color: "white",
    fontSize: theme.fontSizes.subheading,
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
  buttonDisabled: {
    backgroundColor: theme.colors.textSecondary,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit, errors }) => {
  const buttonOn = Object.keys(errors).length === 0 ? true : null;
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit} disabled={buttonOn === null}>
        <Text style={[styles.button, buttonOn ?? styles.buttonDisabled]}>
          Sign In
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignInView = () => {
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log("shit is borked yo");
      console.log(e);
    }
  };
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

export default SignInView;
