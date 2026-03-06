import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TagPill } from "../components/ui/TagPill";

describe("TagPill", () => {
  it("shows the emoji for a known tag", () => {
    render(<TagPill tag="Pizza" />);
    expect(screen.getByTitle("Pizza").textContent).toContain("🍕");
  });

  it("falls back to the tag name for something not in the map", () => {
    render(<TagPill tag="CustomThing" />);
    expect(screen.getByTitle("CustomThing").textContent).toContain("CustomThing");
  });

  it("sets the title to the tag name so the tooltip works", () => {
    render(<TagPill tag="Music" />);
    expect(screen.getByTitle("Music")).toBeInTheDocument();
  });

  it("shows a remove button when onRemove is passed", () => {
    render(<TagPill tag="Fruit" onRemove={vi.fn()} />);
    expect(screen.getByText("✕")).toBeInTheDocument();
  });

  it("no remove button without onRemove", () => {
    render(<TagPill tag="Fruit" />);
    expect(screen.queryByText("✕")).not.toBeInTheDocument();
  });

  it("calls onRemove when ✕ is clicked", () => {
    const onRemove = vi.fn();
    render(<TagPill tag="Fruit" onRemove={onRemove} />);
    fireEvent.click(screen.getByText("✕"));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("calls onClick when the pill itself is clicked", () => {
    const onClick = vi.fn();
    render(<TagPill tag="Music" onClick={onClick} />);
    fireEvent.click(screen.getByTitle("Music"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("uses pointer cursor when clickable", () => {
    render(<TagPill tag="Music" onClick={vi.fn()} />);
    expect(screen.getByTitle("Music")).toHaveStyle({ cursor: "pointer" });
  });

  it("uses default cursor when not clickable", () => {
    render(<TagPill tag="Music" />);
    expect(screen.getByTitle("Music")).toHaveStyle({ cursor: "default" });
  });

  it.each([
    ["Pizza", "🍕"],
    ["Tropical", "🌺"],
    ["Chocolate", "🍫"],
    ["Fire", "🔥"],
    ["Music", "🎵"],
    ["Flower", "🌸"],
    ["Mochi", "🍡"],
    ["Glass", "🔮"],
  ])('renders %s as %s', (tag, emoji) => {
    render(<TagPill tag={tag} />);
    expect(screen.getByTitle(tag).textContent).toContain(emoji);
  });
});