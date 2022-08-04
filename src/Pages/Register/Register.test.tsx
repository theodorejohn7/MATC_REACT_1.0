import Register from "./Register";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Testing Register Component", () => {
  test("render Register Form Title text", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const RegisterText = screen.getByText("Register Form", { exact: false });
    expect(RegisterText).toBeInTheDocument();
  });

  it("renders Name,UserName,Password,Confirm Password,email, confirm email,address,pincode,state Text box", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const nameTextbox = screen.getByTestId("test_name", { exact: false });
    expect(nameTextbox).toBeInTheDocument();

    const usernameTextbox = screen.getByTestId("test_userName", {
      exact: false,
    });
    expect(usernameTextbox).toBeInTheDocument();

    const passwordTextbox = screen.getByTestId("test_password", {
      exact: false,
    });
    expect(passwordTextbox).toBeInTheDocument();

    const confirmPasswordTextbox = screen.getByTestId("test_confirmPassword", {
      exact: false,
    });
    expect(confirmPasswordTextbox).toBeInTheDocument();

    const eMailTextbox = screen.getByTestId("test_eMail", { exact: false });
    expect(eMailTextbox).toBeInTheDocument();

    const confirmEMailTextbox = screen.getByTestId("test_confirmEMail", {
      exact: false,
    });
    expect(confirmEMailTextbox).toBeInTheDocument();

    const addressTextbox = screen.getByTestId("test_address", { exact: false });
    expect(addressTextbox).toBeInTheDocument();

    const pincodeTextbox = screen.getByTestId("test_pincode", { exact: false });
    expect(pincodeTextbox).toBeInTheDocument();

    const stateTextbox = screen.getByTestId("test_state", { exact: false });
    expect(stateTextbox).toBeInTheDocument();

    const secQnTextbox = screen.getByTestId("test_securityQn", {
      exact: false,
    });
    expect(secQnTextbox).toBeInTheDocument();

    const secAnsTextbox = screen.getByTestId("test_securityAns", {
      exact: false,
    });
    expect(secAnsTextbox).toBeInTheDocument();

    const countryTextbox = screen.getByTestId("test_country", { exact: false });
    expect(countryTextbox).toBeInTheDocument();
  });

  test("render Submit button", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const submitButton = screen.getByText("Submit", { exact: false });
    expect(submitButton).toBeInTheDocument();
  });

  it("displays message on submitting fields without data", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const submitButton = screen.getByText("SUBMIT", { exact: false });

    userEvent.click(submitButton);

    await waitFor(() => {
      const errorTest = screen.getAllByText("Required Field", { exact: false });
      expect(errorTest).toHaveLength(11);
    });
  });

  test("displays message when UserName field has less than 8 characters", async () => {
    render(
      <Router>
        import React from "react";
        <Register />
      </Router>
    );

    const field = screen.getByTestId("test_userName");
    fireEvent.change(field, { target: { value: "Test " } });

    const submitButton = screen.getByText("SUBMIT", { exact: false });
    userEvent.click(submitButton);

    await waitFor(() => {
      const errorTest = screen.getByText(
        "Expected to have minimum 8 characters",
        {
          exact: false,
        }
      );
      expect(errorTest).toBeInTheDocument();
    });
  });

  test("displays message when password field doesn't contain minimum of 8 characters, one Uppercase, one Special character, checks whether password matches with confirm password", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const password_field = screen.getByTestId("test_password");
    const confirm_password_field = screen.getByTestId("test_confirmPassword");

    fireEvent.change(password_field, { target: { value: "Test " } });

    const submitButton = screen.getByText("SUBMIT", { exact: false });
    userEvent.click(submitButton);

    await waitFor(() => {
      const errorTest = screen.getByText(
        "password must be at least 8 characters",
        {
          exact: true,
        }
      );
      expect(errorTest).toBeInTheDocument();
    });

    fireEvent.change(password_field, { target: { value: "test1234 " } });

    userEvent.click(submitButton);

    await waitFor(() => {
      const errorTest = screen.getByText(
        "password must contain at least 1 uppercase letter",
        {
          exact: false,
        }
      );
      expect(errorTest).toBeInTheDocument();
    });

    fireEvent.change(password_field, { target: { value: "Test1234" } });

    userEvent.click(submitButton);

    await waitFor(() => {
      const errorTest = screen.getByText(
        "password must contain at least 1 symbol",
        {
          exact: false,
        }
      );
      expect(errorTest).toBeInTheDocument();
    });

    userEvent.type(password_field, "Test@1234");

    userEvent.type(confirm_password_field, "Test@123");

    userEvent.click(submitButton);

    await waitFor(() => {
      const errorTest = screen.getByText("Passwords do not match", {
        exact: false,
      });
      expect(errorTest).toBeInTheDocument();
    });
  });

  test("displays message when email is not inline with email format, checks whether email matches with confirm email", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const eMail_field = screen.getByTestId("test_eMail");
    const confirm_eMail_field = screen.getByTestId("test_confirmEMail");

    fireEvent.change(eMail_field, { target: { value: "Test " } });

    const submitButton = screen.getByText("SUBMIT", { exact: false });
    userEvent.click(submitButton);

    await waitFor(() => {
      const errorTest = screen.getByText("Must be a valid email", {
        exact: false,
      });
      expect(errorTest).toBeInTheDocument();
    });

    userEvent.type(eMail_field, "test@test.com");

    userEvent.type(confirm_eMail_field, "test@test.co");

    userEvent.click(submitButton);

    await waitFor(() => {
      const errorTest = screen.getByText("e-Mail ID's do not match", {
        exact: false,
      });
      expect(errorTest).toBeInTheDocument();
    });
  });

  test("displays message when pincode doesnot have six digits", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const pincode_field = screen.getByTestId("test_pincode");

    fireEvent.change(pincode_field, { target: { value: 123 } });

    const submitButton = screen.getByText("SUBMIT", { exact: false });
    userEvent.click(submitButton);

    await waitFor(() => {
      const errorTest = screen.getByText("Must be exactly 6 digits", {
        exact: false,
      });
      expect(errorTest).toBeInTheDocument();
    });
  });
});
