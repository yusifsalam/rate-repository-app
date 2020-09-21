import React from "react";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";

const RepositorySingleView = () => {
  const id = useParams().id;
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { repoId: id },
    fetchPolicy: "cache-and-network",
  });

  const repo = data?.repository;

  return <RepositoryItem item={repo} showGithub={true} />;
};

export default RepositorySingleView;
