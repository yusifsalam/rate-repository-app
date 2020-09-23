import React from "react";
import { View, FlatList, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from "../graphql/queries";
import ReviewItem from "./ReviewItem";

const MyReviews = () => {
  const { data } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews: true },
  });
  const reviews = data?.authorizedUser?.reviews.edges;
  return (
    <View>
      {!reviews || reviews?.length === 0 ? (
        <Text>You dont have any reviews</Text>
      ) : (
        <FlatList
          data={reviews}
          renderItem={({ item }) => (
            <ReviewItem review={item} ownReview={true} />
          )}
          keyExtractor={(item) => item.node.id}
        />
      )}
    </View>
  );
};

export default MyReviews;
