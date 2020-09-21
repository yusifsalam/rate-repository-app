// import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
// import { useApolloClient } from "@apollo/client";

import { ADD_REVIEW } from "../graphql/mutations";
// import AuthStorageContext from "../context/AuthStorageContext";

const useReviewForm = () => {
  // const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(ADD_REVIEW, {
    onError: (e) => {
      console.error(e);
    },
  });
  // const apolloClient = useApolloClient();
  const addReview = async ({ ownerName, repositoryName, rating, text }) => {
    if (!ownerName || !repositoryName || !rating) return null;
    const ratingNum = parseInt(rating);
    const reviewObject = await mutate({
      variables: {
        review: { ownerName, repositoryName, rating: ratingNum, text },
      },
    });
    console.log(reviewObject);
    // const review = reviewObject?.data;
    return reviewObject;
  };

  return [addReview, result];
};

export default useReviewForm;
