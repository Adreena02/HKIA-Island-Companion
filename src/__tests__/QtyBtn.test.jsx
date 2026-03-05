import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QtyBtn } from "../components/inventory/QtyBtn";

describe("QtyBtn — rendering", () => {
  it("renders its children", () => {
    render(<QtyBtn onClick={vi.fn()}>＋</QtyBtn>);
    expect(screen.getByText("＋")).toBeInTheDocument();
  });

  it("renders a button element", () => {
    render(<QtyBtn onClick={vi.fn()}>−</QtyBtn>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders the minus label correctly", () => {
    render(<QtyBtn onClick={vi.fn()}>−</QtyBtn>);
    expect(screen.getByText("−")).toBeInTheDocument();
  });
});

describe("QtyBtn — interactions", () => {
  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<QtyBtn onClick={onClick}>＋</QtyBtn>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("calls onClick multiple times on multiple clicks", () => {
    const onClick = vi.fn();
    render(<QtyBtn onClick={onClick}>＋</QtyBtn>);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(3);
  });
});

describe("QtyBtn — hover styles", () => {
  it("changes background on mouse enter", () => {
    render(<QtyBtn onClick={vi.fn()}>＋</QtyBtn>);
    const btn = screen.getByRole("button");
    fireEvent.mouseEnter(btn);
    expect(btn).toHaveStyle({ background: "#ff8fa3" });
  });

  it("restores background on mouse leave", () => {
    render(<QtyBtn onClick={vi.fn()}>＋</QtyBtn>);
    const btn = screen.getByRole("button");
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(btn).toHaveStyle({ background: "#f2eee8" });
  });
});
