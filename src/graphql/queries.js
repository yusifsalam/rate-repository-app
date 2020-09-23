import { gql } from "apollo-boost";
import { REPO_DETAILS, REVIEW_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepoDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
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
  query reviews($repoId: ID!, $first: Int, $after: String) {
    repository(id: $repoId) {
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
      ...RepoDetails
    }
  }
  ${REPO_DETAILS}
  ${REVIEW_DETAILS}
`;

export const AUTHORIZED_USER = gql`
  query($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;
