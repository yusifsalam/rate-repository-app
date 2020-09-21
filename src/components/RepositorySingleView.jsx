import React from "react";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { GET_REPOSITORY_WITH_REVIEWS } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import { ItemSeparator } from "./RepositoryList";

const RepositorySingleView = ({ repo }) => {
  return <RepositoryItem item={repo} showGithub={true} />;
};

const SingleRepository = () => {
  const id = useParams().id;
  const { data } = useQuery(GET_REPOSITORY_WITH_REVIEWS, {
    variables: { repoId: id },
    fetchPolicy: "cache-and-network",
  });
  const repository = data?.repository;
  const reviews = repository?.reviews?.edges;
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositorySingleView repo={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
