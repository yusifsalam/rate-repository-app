import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInViewContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit functions with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(
        <SignInViewContainer onSubmit={onSubmit} history={[]} />
      );
      fireEvent.changeText(getByTestId("usernameField"), "kalle");
      fireEvent.changeText(getByTestId("passwordField"), "password");
      fireEvent.press(getByTestId("submitButton"));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
