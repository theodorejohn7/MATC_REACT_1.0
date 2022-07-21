import Login from "./Login";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Testing Login Component", () => {
  test("render Login Form Title text", () => {
    render(<Login />);
    const LoginText = screen.getByText("Login Form", { exact: false });
    expect(LoginText).toBeInTheDocument();
  });

  test("render Name Text box", () => {
    render(<Login />);
    const nameTextbox = screen.getByLabelText("Name", { exact: false });
    expect(nameTextbox).toBeInTheDocument();
  });

  test("render Password Text box", () => {
    render(<Login />);
    const passwordTextbox = screen.getByLabelText("Password", { exact: false });
    expect(passwordTextbox).toBeInTheDocument();
  });

  test("render Submit button", () => {
    render(<Login />);
    const submitButton = screen.getByText("Submit", { exact: false });
    expect(submitButton).toBeInTheDocument();
  });

  it("performs validation in the field", async () => {
    render(<Login />);
    const username = screen.getByTestId("test_username");
    const submitButton = screen.getByTestId("test_submit");

    userEvent.type(username, "admin");
    userEvent.click(submitButton);

    await waitFor(() => {
      const errorTest = screen.getByText("Username Required", { exact: false });
      expect(errorTest).toBeInTheDocument();
    });
  });
});
