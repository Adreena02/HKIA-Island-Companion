import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QtyBtn } from "../components/inventory/QtyBtn";

describe("QtyBtn", () => {
  it("renders its label", () => {
    render(<QtyBtn onClick={vi.fn()}>＋</QtyBtn>);
    expect(screen.getByText("＋")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<QtyBtn onClick={onClick}>＋</QtyBtn>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("fires multiple times on repeated clicks", () => {
    const onClick = vi.fn();
    render(<QtyBtn onClick={onClick}>−</QtyBtn>);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("turns pink on hover", () => {
    render(<QtyBtn onClick={vi.fn()}>＋</QtyBtn>);
    const btn = screen.getByRole("button");
    fireEvent.mouseEnter(btn);
    expect(btn).toHaveStyle({ background: "#ff8fa3" });
  });

  it("goes back to cream on mouse leave", () => {
    render(<QtyBtn onClick={vi.fn()}>＋</QtyBtn>);
    const btn = screen.getByRole("button");
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(btn).toHaveStyle({ background: "#f2eee8" });
  });
});