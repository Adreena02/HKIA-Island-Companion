import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Btn } from "../components/ui/Btn";

describe("Btn", () => {
  it("renders its children", () => {
    render(<Btn>Click me</Btn>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders emoji children correctly", () => {
    render(<Btn>＋ Add Item</Btn>);
    expect(screen.getByText("＋ Add Item")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Btn onClick={onClick}>Click</Btn>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("uses coral background by default", () => {
    render(<Btn>Default</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ background: "#ff8fa3" });
  });

  it("mint variant has the right background", () => {
    render(<Btn variant="mint">Mint</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ background: "#6dcfaa" });
  });

  it("danger variant has the right background", () => {
    render(<Btn variant="danger">Delete</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ background: "#ffb3b3" });
  });

  it("ghost variant has a translucent background", () => {
    render(<Btn variant="ghost">Ghost</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ background: "rgba(255,255,255,0.55)" });
  });

  it("small prop uses a smaller font", () => {
    render(<Btn small>Small</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ fontSize: "0.82rem" });
  });

  it("hovers to a darker shade on mouse enter", () => {
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

  it("merges extra style props", () => {
    render(<Btn style={{ marginTop: "10px" }}>Styled</Btn>);
    expect(screen.getByRole("button")).toHaveStyle({ marginTop: "10px" });
  });
});