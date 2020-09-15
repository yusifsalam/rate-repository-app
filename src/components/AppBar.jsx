import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    marginBottom: 10,
    display: "flex",
  },
  appBap: {
    backgroundColor: '#24292e',
    color: 'white',
    fontWeight: 'bold',
    opacity: 10,
    // flexGrow: 0,
    height: 70,
    paddingTop: 35
  }
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <TouchableWithoutFeedback>
      <Text style={styles.appBap}> Repositories</Text>
    </TouchableWithoutFeedback>
  </View>;
};

export default AppBar;