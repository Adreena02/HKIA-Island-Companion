import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TagInput } from "../components/ui/TagInput";

const defaultProps = (overrides = {}) => ({
  tags: [],
  allTags: ["Pizza", "Fruit", "Music", "Fancy"],
  onChange: vi.fn(),
  ...overrides,
});

// ─── Rendering ────────────────────────────────────────────────────────────────

describe("TagInput — rendering", () => {
  it("renders existing tags as pills", () => {
    render(<TagInput {...defaultProps({ tags: ["Pizza", "Fruit"] })} />);
    expect(screen.getByTitle("Pizza")).toBeInTheDocument();
    expect(screen.getByTitle("Fruit")).toBeInTheDocument();
  });

  it("shows placeholder when no tags", () => {
    render(<TagInput {...defaultProps()} />);
    expect(screen.getByPlaceholderText(/Type a tag/)).toBeInTheDocument();
  });

  it("shows 'Add another' placeholder when tags exist", () => {
    render(<TagInput {...defaultProps({ tags: ["Pizza"] })} />);
    expect(screen.getByPlaceholderText(/Add another/)).toBeInTheDocument();
  });

  it("hides input when 4 tags are present", () => {
    render(<TagInput {...defaultProps({ tags: ["Pizza", "Fruit", "Music", "Fancy"] })} />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("renders remove buttons for each tag", () => {
    render(<TagInput {...defaultProps({ tags: ["Pizza", "Fruit"] })} />);
    expect(screen.getAllByText("✕")).toHaveLength(2);
  });
});

// ─── Adding tags ──────────────────────────────────────────────────────────────

describe("TagInput — adding tags", () => {
  it("calls onChange with new tag when Enter is pressed", () => {
    const onChange = vi.fn();
    render(<TagInput {...defaultProps({ onChange })} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Rocky" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(["Rocky"]);
  });

  it("calls onChange with new tag when comma is pressed", () => {
    const onChange = vi.fn();
    render(<TagInput {...defaultProps({ onChange })} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Rocky" } });
    fireEvent.keyDown(input, { key: "," });
    expect(onChange).toHaveBeenCalledWith(["Rocky"]);
  });

  it("does not add duplicate tags", () => {
    const onChange = vi.fn();
    render(<TagInput {...defaultProps({ tags: ["Pizza"], onChange })} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Pizza" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not add empty tags", () => {
    const onChange = vi.fn();
    render(<TagInput {...defaultProps({ onChange })} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "  " } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not add a 5th tag", () => {
    const onChange = vi.fn();
    render(<TagInput {...defaultProps({ tags: ["Pizza", "Fruit", "Music", "Fancy"], onChange })} />);
    // input is hidden at 4 tags, so onChange should never be called
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─── Removing tags ────────────────────────────────────────────────────────────

describe("TagInput — removing tags", () => {
  it("calls onChange without the tag when ✕ is clicked", () => {
    const onChange = vi.fn();
    render(<TagInput {...defaultProps({ tags: ["Pizza", "Fruit"], onChange })} />);
    fireEvent.click(screen.getAllByText("✕")[0]);
    expect(onChange).toHaveBeenCalledWith(["Fruit"]);
  });

  it("calls onChange removing last tag on Backspace when input is empty", () => {
    const onChange = vi.fn();
    render(<TagInput {...defaultProps({ tags: ["Pizza", "Fruit"], onChange })} />);
    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(onChange).toHaveBeenCalledWith(["Pizza"]);
  });

  it("does not call onChange on Backspace when input has text", () => {
    const onChange = vi.fn();
    render(<TagInput {...defaultProps({ tags: ["Pizza"], onChange })} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Ro" } });
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─── Autocomplete ─────────────────────────────────────────────────────────────

describe("TagInput — autocomplete", () => {
  it("shows suggestions matching input", async () => {
    render(<TagInput {...defaultProps()} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Piz" } });
    fireEvent.focus(input);
    expect(await screen.findByText("Pizza")).toBeInTheDocument();
  });

  it("does not show already-added tags as suggestions", async () => {
    render(<TagInput {...defaultProps({ tags: ["Pizza"] })} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Piz" } });
    fireEvent.focus(input);
    expect(screen.queryByText("Pizza")).not.toBeInTheDocument();
  });
});
