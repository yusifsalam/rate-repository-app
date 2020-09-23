import React from "react";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { GET_REPOSITORY_WITH_REVIEWS } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import { ItemSeparator } from "./RepositoryList";
import useReviews from "../hooks/useReviews";

const RepositorySingleView = ({ repo }) => {
  return <RepositoryItem item={repo} showGithub={true} />;
};

const SingleRepository = () => {
  const id = useParams().id;
  const { repository, reviews, fetchMore } = useReviews({
    repoId: id,
    first: 5,
  });
  const handleEndReach = () => {
    console.log("end reached");
    fetchMore();
  };
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositorySingleView repo={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReachedThreshold={0.5}
      onEndReached={handleEndReach}
    />
  );
};

export default SingleRepository;
