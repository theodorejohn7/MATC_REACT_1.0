import Register from "./Register";
import { render, screen, waitFor } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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

  const usernameTextbox = screen.getByTestId("test_userName", { exact: false });
  expect(usernameTextbox).toBeInTheDocument();

  const passwordTextbox = screen.getByTestId("test_password", { exact: false });
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

  const secQnTextbox = screen.getByTestId("test_secQuestion", { exact: false });
  expect(secQnTextbox).toBeInTheDocument();

  const secAnsTextbox = screen.getByTestId("test_secAnswer", { exact: false });
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

it("performs validation in the fields", async () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const nameTextbox = screen.getByTestId("test_name", { exact: false });

  const usernameTextbox = screen.getByTestId("test_userName", { exact: false });

  const passwordTextbox = screen.getByTestId("test_password", { exact: false });

  const confirmPasswordTextbox = screen.getByTestId("test_confirmPassword", {
    exact: false,
  });

  const eMailTextbox = screen.getByTestId("test_eMail", { exact: false });

  const confirmEMailTextbox = screen.getByTestId("test_confirmEMail", {
    exact: false,
  });

  const addressTextbox = screen.getByTestId("test_address", { exact: false });

  const pincodeTextbox = screen.getByTestId("test_pincode", { exact: false });

  const stateTextbox = screen.getByTestId("test_state", { exact: false });

  const secQnTextbox = screen.getByTestId("test_secQuestion", { exact: false });

  const secAnsTextbox = screen.getByTestId("test_secAnswer", { exact: false });

  const countryTextbox = screen.getByTestId("test_country", { exact: false });

  const submitButton = screen.getByText("SUBMIT", { exact: false });

  userEvent.click(submitButton);

  await waitFor(() => {
    const errorTest = screen.getAllByText("Required Field", { exact: false });
    expect(errorTest).toHaveLength(11);
  });

  userEvent.click(submitButton);


  userEvent.type(nameTextbox, "admin");
  userEvent.click(submitButton);



  await waitFor(() => {
    const errorTest = screen.getAllByText("Required Field", { exact: false });
    expect(errorTest).toHaveLength(11);
  });

  userEvent.type(nameTextbox, "admin");
  userEvent.type(usernameTextbox, "admin");
  userEvent.type(passwordTextbox, "admin");
  userEvent.type(confirmPasswordTextbox, "admin");
  userEvent.type(eMailTextbox, "admin");
  userEvent.type(confirmEMailTextbox, "admin");
  userEvent.type(addressTextbox, "admin");
  userEvent.type(pincodeTextbox, "admin");
  userEvent.type(stateTextbox, "admin");
  userEvent.type(secQnTextbox, "admin");
  userEvent.type(secAnsTextbox, "admin");
  userEvent.type(countryTextbox, "admin");
});

// it("displays error message while providing an empty input fields", async () => {
//   render(<Register />);
//   const username = screen.getByTestId("test_username");
//   const submitButton = screen.getByTestId("test_submit");

//   userEvent.type(username, "admin");
//   userEvent.click(submitButton);

//   await waitFor(() => {
//     const errorTest = screen.getByText("Username Required", { exact: false });
//     expect(errorTest).toBeInTheDocument();
//   });
// });
