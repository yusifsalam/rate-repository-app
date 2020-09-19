import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useApolloClient } from "@apollo/client";

import { AUTHORIZE } from "../graphql/mutations";
import AuthStorageContext from "../context/AuthStorageContext";

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(AUTHORIZE, {
    onError: (e) => {
      console.error(e);
    },
  });
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const tokenObject = await mutate({
      variables: { credentials: { username, password } },
    });
    const tokenValid =
      tokenObject &&
      tokenObject.data &&
      tokenObject.data.authorize &&
      tokenObject.data.authorize.accessToken;
    const token = tokenValid ? tokenObject.data.authorize.accessToken : null;
    await authStorage.setAccessToken(token);
    apolloClient.resetStore();
    return tokenObject;
  };

  return [signIn, result];
};

export default useSignIn;
