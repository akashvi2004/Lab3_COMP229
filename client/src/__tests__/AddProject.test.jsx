import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import AddProject from "../../core/AddProject"; // Update path if different
import auth from "../../lib/auth-helper";

// Mock auth to simulate admin user
jest.mock("../../lib/auth-helper", () => ({
  isAuthenticated: jest.fn(),
}));

describe("AddProject component", () => {
  beforeEach(() => {
    auth.isAuthenticated.mockReturnValue({
      user: { role: "admin" },
      token: "fake-jwt-token"
    });
  });

  it("renders form fields correctly", () => {
    render(<AddProject />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Link/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Technologies/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Project/i })).toBeInTheDocument();
  });

  it("shows unauthorized message for non-admin users", () => {
    auth.isAuthenticated.mockReturnValue({ user: { role: "user" }, token: "user-token" });
    render(<AddProject />);
    expect(screen.getByText(/Unauthorized: Admins only/i)).toBeInTheDocument();
  });

  it("updates form values on input", () => {
    render(<AddProject />);
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: "Test Project" } });
    expect(titleInput.value).toBe("Test Project");
  });
});
