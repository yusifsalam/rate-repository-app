import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { buttonStyle, buttonDisabledStyle } from "../theme";
import useReviewForm from "../hooks/useReviewForm";
import { useHistory } from "react-router-native";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
  text: yup.string(),
});

const styles = StyleSheet.create({
  button: buttonStyle,
  buttonDisabled: buttonDisabledStyle,
});

const ReviewForm = ({ onSubmit, errors }) => {
  const buttonOn = Object.keys(errors).length === 0;
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <TouchableWithoutFeedback
        onPress={onSubmit}
        disabled={!buttonOn}
        testID="submitButton"
      >
        <Text style={[styles.button, !buttonOn && styles.buttonDisabled]}>
          Create review
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const ReviewFormViewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors }) => (
        <ReviewForm onSubmit={handleSubmit} errors={errors} />
      )}
    </Formik>
  );
};

const ReviewFormView = () => {
  const history = useHistory();
  const [addReview] = useReviewForm();
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await addReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      console.log("review data", data);
      history.push(`/repos/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewFormViewContainer onSubmit={onSubmit} />;
};

export default ReviewFormView;
