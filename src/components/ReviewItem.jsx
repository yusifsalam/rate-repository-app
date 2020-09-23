import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import Text from "./Text";
import { buttonStyle } from "../theme";
import { useHistory } from "react-router-native";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  topContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  rating: {
    backgroundColor: "white",
    borderRadius: 25,
    borderColor: "blue",
    borderWidth: 2,
    color: "blue",
    width: 50,
    height: 50,
    overflow: "hidden",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
  },
  topRightContainer: {
    marginLeft: 10,
  },
  reviewContainer: {
    flexDirection: "column",
    paddingLeft: 70,
    paddingBottom: 10,
  },
  reviewText: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1,
    marginBottom: 10,
  },
  button: buttonStyle,
  redButton: {
    backgroundColor: "red",
    borderColor: "red",
  },
});

const ReviewItem = ({ review, ownReview }) => {
  const history = useHistory();
  const apolloClient = useApolloClient();
  const [mutate] = useMutation(DELETE_REVIEW, {
    onError: (e) => {
      console.error(e);
    },
  });
  const deleteReview = async ({ reviewId }) => {
    if (!reviewId) return null;
    const response = await mutate({
      variables: { id: reviewId },
    });
    return response;
  };
  const handleView = () => {
    history.push(`/repos/${review.node.repository.id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "You are about to delete this review",
      [
        {
          text: "Cancel",
          onPress: () => console.log("pressed cancel!"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            const reviewId = review.node.id;
            await deleteReview({ reviewId: reviewId });
            apolloClient.resetStore();
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.rating}>{review.node.rating}</Text>
        <View style={styles.topRightContainer}>
          <Text fontWeight="bold">
            {ownReview
              ? review.node.repository.fullName
              : review.node.user.username}
          </Text>
          <Text>
            {new Date(review.node.createdAt).toLocaleDateString("fi-fi")}
          </Text>
        </View>
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.reviewText}>{review.node.text}</Text>
      </View>
      {ownReview ? (
        <View style={styles.buttonContainer}>
          <Text style={styles.button} onPress={handleView}>
            View repository
          </Text>
          <Text
            style={[styles.button, styles.redButton]}
            onPress={handleDelete}
          >
            Delete review
          </Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ReviewItem;
