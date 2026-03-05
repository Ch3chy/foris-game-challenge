import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TextField from "./text-field";

describe("TextField", () => {
  describe("Rendering", () => {
    it("renders input element", () => {
      render(<TextField />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders label when provided", () => {
      render(<TextField label="Username" name="username" />);
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    it("does not render label when not provided", () => {
      render(<TextField name="test" />);
      expect(screen.queryByRole("label")).not.toBeInTheDocument();
    });

    it("renders helper text when provided", () => {
      render(<TextField helperText="Enter your username" />);
      expect(screen.getByText("Enter your username")).toBeInTheDocument();
    });

    it("renders error message when provided", () => {
      render(<TextField error="This field is required" />);
      expect(screen.getByRole("alert")).toHaveTextContent("This field is required");
    });

    it("shows error instead of helper text when both provided", () => {
      render(<TextField error="Error message" helperText="Helper text" />);
      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    });
  });

  describe("Password field", () => {
    it("renders password toggle button for password type", () => {
      render(<TextField type="password" />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("does not render password toggle for text type", () => {
      render(<TextField type="text" />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("toggles password visibility when button clicked", async () => {
      const user = userEvent.setup();
      render(<TextField type="password" name="password" />);

      const input = document.querySelector("input") as HTMLInputElement;
      expect(input.type).toBe("password");

      await user.click(screen.getByRole("button"));
      expect(input.type).toBe("text");

      await user.click(screen.getByRole("button"));
      expect(input.type).toBe("password");
    });
  });

  describe("User interactions", () => {
    it("calls onChange when typing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextField onChange={handleChange} />);

      await user.type(screen.getByRole("textbox"), "hello");
      expect(handleChange).toHaveBeenCalled();
    });

    it("calls onBlur when focus leaves", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<TextField onBlur={handleBlur} />);

      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });

    it("accepts user input", async () => {
      const user = userEvent.setup();
      render(<TextField />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test value");
      expect(input).toHaveValue("test value");
    });
  });

  describe("Disabled state", () => {
    it("is disabled when disabled prop is true", () => {
      render(<TextField disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("does not accept input when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextField disabled onChange={handleChange} />);

      await user.type(screen.getByRole("textbox"), "test");
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Props forwarding", () => {
    it("applies custom className", () => {
      render(<TextField className="custom-class" />);
      const container = screen.getByRole("textbox").closest(".custom-class");
      expect(container).toBeInTheDocument();
    });

    it("forwards placeholder prop", () => {
      render(<TextField placeholder="Enter text..." />);
      expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
    });

    it("uses name as id when id not provided", () => {
      render(<TextField name="email" label="Email" />);
      const input = screen.getByLabelText("Email");
      expect(input).toHaveAttribute("id", "email");
    });

    it("uses id when both id and name provided", () => {
      render(<TextField id="custom-id" name="email" label="Email" />);
      const input = screen.getByLabelText("Email");
      expect(input).toHaveAttribute("id", "custom-id");
    });

    it("forwards ref to input element", () => {
      const ref = vi.fn();
      render(<TextField ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("associates label with input via htmlFor", () => {
      render(<TextField label="Username" name="username" />);
      const label = screen.getByText("Username");
      const input = screen.getByLabelText("Username");
      expect(label).toHaveAttribute("for", input.id);
    });

    it("marks error with role alert", () => {
      render(<TextField error="Invalid input" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });
});
