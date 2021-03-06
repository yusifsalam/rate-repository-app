import React from "react";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/react-hooks";

import { registerRootComponent } from "expo";

import Main from "./components/Main";
import createApolloClient from "./utils/apolloClient";
import AuthStorage from "./utils/authStorage";
import AuthStorageContext from "./context/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default registerRootComponent(App);
