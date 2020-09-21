import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import AuthStorageContext from "../context/AuthStorageContext";

const useSignUp = () => {
  const [mutate, result] = useMutation(ADD_USER, {
    onError: (e) => {
      console.error(e);
    },
  });
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const signUp = async ({ username, password }) => {
    if (!username || !password) return null;

    const userObject = await mutate({
      variables: { user: { username, password } },
    });
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    return userObject;
  };
  return [signUp, result];
};

export default useSignUp;
