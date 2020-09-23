import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useHistory } from "react-router-native";

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
    // alignItems: "center",
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
  redButton: {
    backgroundColor: "red",
    borderColor: "red",
  },
});

const ReviewItem = ({ review, ownReview }) => {
  const history = useHistory();
  const handleView = () => {
    console.log(review);
    history.push(`/repos/${review.node.repository.id}`);
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
            {" "}
            View repository
          </Text>
          <Text style={[styles.button, styles.redButton]}>Delete review</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ReviewItem;
