import { useQuery } from "@apollo/react-hooks";
import { GET_REPOSITORY_WITH_REVIEWS } from "../graphql/queries";

const useReviews = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORY_WITH_REVIEWS,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY_WITH_REVIEWS,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      },
    });
  };

  const repository = data?.repository;
  const reviews = repository?.reviews?.edges;

  return {
    repository: repository,
    reviews: reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReviews;
