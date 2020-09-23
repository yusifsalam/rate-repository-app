import React, { useState } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useHistory } from "react-router-native";
import RNPickerSelect from "react-native-picker-select";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

const pickerValues = [
  {
    label: "Latest Repositories",
    value: "latest",
  },
  {
    label: "Highest Rated Repositories",
    value: "highest_rated",
  },
  {
    label: "Lowest Rated Repositories",
    value: "lowest_rated",
  },
];

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  handlePress,
  handleSort,
  sortValue,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <RepositoryItem item={item} showGithub={false} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <RNPickerSelect
          onValueChange={handleSort}
          items={pickerValues}
          style={pickerSelectStyles}
          value={sortValue}
          pickerProps={{ style: { height: "99%", overflow: "hidden" } }}
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: "transparent",
                  borderTopWidth: 10,
                  borderTopColor: "gray",
                  borderRightWidth: 10,
                  borderRightColor: "transparent",
                  borderLeftWidth: 10,
                  borderLeftColor: "transparent",
                  width: 0,
                  height: 0,
                  marginTop: 15,
                  marginRight: 30,
                }}
              />
            );
          }}
        />
      )}
    />
  );
};

const sortMap = {
  latest: {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  highest_rated: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  lowest_rated: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};
const RepositoryList = () => {
  const [repoSort, setRepoSort] = useState("latest");
  const sortObject = sortMap[repoSort];
  const { repositories } = useRepositories(sortObject);
  const history = useHistory();
  const handlePress = (itemURI) => {
    history.push(`/repos/${itemURI}`);
  };

  const handleSortChange = (value) => {
    if (value) setRepoSort(value);
  };

  return (
    <View>
      <RepositoryListContainer
        repositories={repositories}
        handlePress={handlePress}
        handleSort={handleSortChange}
        sortValue={repoSort}
      />
    </View>
  );
};

export default RepositoryList;
