import { gql } from "apollo-boost";

export const AUTHORIZE = gql`
  mutation authorize($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

export const ADD_USER = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
      id
    }
  }
`;
