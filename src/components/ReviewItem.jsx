import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";

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
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.rating}>{review.node.rating}</Text>
        <View style={styles.topRightContainer}>
          <Text fontWeight="bold">{review.node.user.username}</Text>
          <Text>
            {new Date(review.node.createdAt).toLocaleDateString("fi-fi")}
          </Text>
        </View>
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.reviewText}>{review.node.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
