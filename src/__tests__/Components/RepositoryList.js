import React from "react";
import { render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );
      const items = getAllByTestId("repoItem");
      expect(items).toHaveLength(2);

      const repoNames = getAllByTestId("repoItemFullName");
      expect(repoNames[0]).toHaveTextContent("jaredpalmer/formik");
      expect(repoNames[1]).toHaveTextContent("async-library/react-async");

      const repoDescriptions = getAllByTestId("repoItemDescription");
      expect(repoDescriptions[0]).toHaveTextContent(
        "Build forms in React, without the tears"
      );
      expect(repoDescriptions[1]).toHaveTextContent(
        "Flexible promise-based React data loader"
      );

      const repoLangs = getAllByTestId("repoItemLanguage");
      expect(repoLangs[0]).toHaveTextContent("TypeScript");
      expect(repoLangs[1]).toHaveTextContent("JavaScript");

      const forkCounts = getAllByTestId("repoItemForkCount");
      expect(forkCounts[0]).toHaveTextContent("1.6k");
      expect(forkCounts[1]).toHaveTextContent("69");

      const starCounts = getAllByTestId("repoItemStarCount");
      expect(starCounts[0]).toHaveTextContent("21.9k");
      expect(starCounts[1]).toHaveTextContent("1.8k");

      const ratingAverages = getAllByTestId("repoItemRatingAverage");
      expect(ratingAverages[0]).toHaveTextContent("88");
      expect(ratingAverages[1]).toHaveTextContent("72");

      const reviewCounts = getAllByTestId("repoItemReviewCount");
      expect(reviewCounts[0]).toHaveTextContent("3");
      expect(reviewCounts[1]).toHaveTextContent("3");
    });
  });
});
