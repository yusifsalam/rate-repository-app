import { useMutation } from "@apollo/react-hooks";

import { AUTHORIZE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE, {
    onError: (e) => {
      console.error(e);
    },
  });

  const signIn = async ({ username, password }) => {
    return mutate({ variables: { credentials: { username, password } } });
  };

  return [signIn, result];
};

export default useSignIn;
