import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Btn } from "../components/ui/Btn";

describe("Btn — rendering", () => {
  it("renders its children", () => {
    render(<Btn>Click me</Btn>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders a button element", () => {
    render(<Btn>Go</Btn>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders emoji children correctly", () => {
    render(<Btn>＋ Add Item</Btn>);
    expect(screen.getByText("＋ Add Item")).toBeInTheDocument();
  });
});

describe("Btn — variants", () => {
  it("applies coral background by default", () => {
    render(<Btn>Default</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ background: "#ff8fa3" });
  });

  it("applies mint background for mint variant", () => {
    render(<Btn variant="mint">Mint</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ background: "#6dcfaa" });
  });

  it("applies lav background for lav variant", () => {
    render(<Btn variant="lav">Lav</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ background: "#d4b8f0" });
  });

  it("applies danger background for danger variant", () => {
    render(<Btn variant="danger">Delete</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ background: "#ffb3b3" });
  });

  it("applies ghost background for ghost variant", () => {
    render(<Btn variant="ghost">Ghost</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ background: "rgba(255,255,255,0.55)" });
  });
});

describe("Btn — size", () => {
  it("uses larger font by default", () => {
    render(<Btn>Normal</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ fontSize: "0.9rem" });
  });

  it("uses smaller font when small prop is set", () => {
    render(<Btn small>Small</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ fontSize: "0.82rem" });
  });
});

describe("Btn — interactions", () => {
  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Btn onClick={onClick}>Click</Btn>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies hover background on mouse enter (coral)", () => {
    render(<Btn variant="coral">Hover me</Btn>);
    const btn = screen.getByRole("button");
    fireEvent.mouseEnter(btn);
    expect(btn).toHaveStyle({ background: "#e8637c" });
  });

  it("restores background on mouse leave", () => {
    render(<Btn variant="coral">Hover me</Btn>);
    const btn = screen.getByRole("button");
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(btn).toHaveStyle({ background: "#ff8fa3" });
  });

  it("applies hover background on mouse enter (mint)", () => {
    render(<Btn variant="mint">Hover</Btn>);
    const btn = screen.getByRole("button");
    fireEvent.mouseEnter(btn);
    expect(btn).toHaveStyle({ background: "#4db88a" });
  });
});

describe("Btn — custom styles", () => {
  it("merges extra style props", () => {
    render(<Btn style={{ marginTop: "10px" }}>Styled</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ marginTop: "10px" });
  });
});
