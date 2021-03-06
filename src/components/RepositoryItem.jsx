import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 5,
    flexDirection: "column",
  },
  descriptionContainer: {
    flexDirection: "row",
    margin: 15,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 2.5,
  },
  textDescription: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  textItem: {
    marginBottom: 10,
  },

  languageBox: {
    backgroundColor: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    color: "white",
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    overflow: "hidden",
    padding: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  statsItem: {
    flexDirection: "column",
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  statsItemText: {
    marginBottom: 5,
  },
  buttonContainer: {
    justifyContent: "center",
    // flex: 1,
    margin: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: "white",
    fontSize: theme.fontSizes.subheading,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    overflow: "hidden",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
  },
});

const prettyPrintNumber = (n) => {
  return n > 999 ? (n / 1000).toFixed(1) + "k" : n;
};

const RepositoryItem = ({ item, showGithub }) => {
  if (!item) return null;

  const handleButton = () => {
    Linking.openURL(item.url);
  };
  return (
    <View style={styles.container} testID="repoItem">
      <View style={styles.descriptionContainer}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.textDescription}>
          <Text
            fontWeight="bold"
            fontSize="heading"
            style={styles.textItem}
            testID="repoItemFullName"
          >
            {item.fullName}
          </Text>
          <Text
            color="textSecondary"
            style={styles.textItem}
            testID="repoItemDescription"
          >
            {item.description}{" "}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.languageBox} testID="repoItemLanguage">
              {item.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text
            style={styles.statsItemText}
            fontWeight="bold"
            testID="repoItemStarCount"
          >
            {prettyPrintNumber(item.stargazersCount)}
          </Text>
          <Text style={styles.statsItemText}> Stars</Text>
        </View>
        <View style={styles.statsItem}>
          <Text
            style={styles.statsItemText}
            fontWeight="bold"
            testID="repoItemForkCount"
          >
            {prettyPrintNumber(item.forksCount)}
          </Text>
          <Text style={styles.statsItemText}>Forks</Text>
        </View>
        <View style={styles.statsItem}>
          <Text
            style={styles.statsItemText}
            fontWeight="bold"
            testID="repoItemReviewCount"
          >
            {prettyPrintNumber(item.reviewCount)}
          </Text>
          <Text style={styles.statsItemText}>Reviews</Text>
        </View>
        <View style={styles.statsItem}>
          <Text
            style={styles.statsItemText}
            fontWeight="bold"
            testID="repoItemRatingAverage"
          >
            {prettyPrintNumber(item.ratingAverage)}
          </Text>
          <Text style={styles.statsItemText}>Rating</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {showGithub && (
          <View>
            <Text style={styles.button} onPress={handleButton}>
              Open in GitHub
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RepositoryItem;
