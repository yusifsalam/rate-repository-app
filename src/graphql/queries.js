import { gql } from "apollo-boost";
import { REPO_DETAILS, REVIEW_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...RepoDetails
        }
      }
    }
  }
  ${REPO_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query GET_REPOSITORY($repoId: ID!) {
    repository(id: $repoId) {
      ...RepoDetails
    }
  }
  ${REPO_DETAILS}
`;

export const GET_REPOSITORY_WITH_REVIEWS = gql`
  query reviews($repoId: ID!) {
    repository(id: $repoId) {
      reviews {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
      ...RepoDetails
    }
  }
  ${REPO_DETAILS}
  ${REVIEW_DETAILS}
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;
