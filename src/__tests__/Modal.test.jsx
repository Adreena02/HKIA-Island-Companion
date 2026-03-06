import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../components/ui/Modal";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(<Modal open={false} onClose={vi.fn()} title="Test"><p>Content</p></Modal>);
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("shows content when open", () => {
    render(<Modal open={true} onClose={vi.fn()} title="Test"><p>Hello!</p></Modal>);
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Modal open={true} onClose={vi.fn()} title="My Modal"><p>hi</p></Modal>);
    expect(screen.getByText("My Modal")).toBeInTheDocument();
  });

  it("calls onClose when the ✕ button is clicked", () => {
    const onClose = vi.fn();
    render(<Modal open={true} onClose={onClose} title="Test"><p>hi</p></Modal>);
    fireEvent.click(screen.getByLabelText("Close modal"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when clicking the backdrop", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open={true} onClose={onClose} title="Test"><p>hi</p></Modal>
    );
    // The backdrop is the outermost fixed div
    fireEvent.click(container.firstChild);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<Modal open={true} onClose={onClose} title="Test"><p>hi</p></Modal>);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose for other keys", () => {
    const onClose = vi.fn();
    render(<Modal open={true} onClose={onClose} title="Test"><p>hi</p></Modal>);
    fireEvent.keyDown(document, { key: "Enter" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("has role=dialog and aria-modal on the inner panel", () => {
    render(<Modal open={true} onClose={vi.fn()} title="Test"><p>hi</p></Modal>);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });
});