import { useMutation } from "@apollo/react-hooks";
import { ADD_REVIEW } from "../graphql/mutations";

const useReviewForm = () => {
  const [mutate, result] = useMutation(ADD_REVIEW, {
    onError: (e) => {
      console.error(e);
    },
  });
  const addReview = async ({ ownerName, repositoryName, rating, text }) => {
    if (!ownerName || !repositoryName || !rating) return null;
    const ratingNum = parseInt(rating);
    const reviewObject = await mutate({
      variables: {
        review: { ownerName, repositoryName, rating: ratingNum, text },
      },
    });
    console.log(reviewObject);
    return reviewObject;
  };

  return [addReview, result];
};

export default useReviewForm;
