import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });
  const edgesExist = data && data.repositories && data.repositories.edges;
  const repositories = edgesExist ? data.repositories : null;

  return { data, error, loading, repositories };
};

export default useRepositories;
