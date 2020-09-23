import { gql } from "apollo-boost";

export const REPO_DETAILS = gql`
  fragment RepoDetails on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
    url
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    repositoryId
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      fullName
      id
    }
  }
`;
