import { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import AuthStorageContext from "../context/AuthStorageContext";

const useSignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return [signOut];
};

export default useSignOut;
