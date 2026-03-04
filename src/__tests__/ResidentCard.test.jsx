import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ResidentCard } from "../components/residents/ResidentCard";

const makeResident = (overrides = {}) => ({
  id: "r1",
  name: "Hello Kitty",
  color: "hellokitty",
  imageUrl: "",
  birthday: "November 1st",
  maxLevel: "10",
  currentLevel: 3,
  firstGift: "Ribbon Badge",
  lovedGift: { name: "Red Bow Apple Pie", heartValue: 3, friendshipValue: 10 },
  gifts: [
    { name: "Apple Pie", heartValue: 2, friendshipValue: 7 },
  ],
  abilities: [
    { name: "Sous Chef",        levels: [{ level: 1, unlocksAt: 2, description: "25% chance", unlocked: true  }] },
    { name: "Everyone's Friend", levels: [{ level: 1, unlocksAt: 12, description: "10% faster", unlocked: false }] },
  ],
  note: "",
  ...overrides,
});

describe("ResidentCard — rendering", () => {
  it("displays the resident name", () => {
    render(<ResidentCard resident={makeResident()} onLevelChange={vi.fn()} onViewDetails={vi.fn()} />);
    expect(screen.getByText("Hello Kitty")).toBeInTheDocument();
  });

  it("displays the birthday", () => {
    render(<ResidentCard resident={makeResident()} onLevelChange={vi.fn()} onViewDetails={vi.fn()} />);
    expect(screen.getByText("November 1st")).toBeInTheDocument();
  });

  it("displays the return gift", () => {
    render(<ResidentCard resident={makeResident()} onLevelChange={vi.fn()} onViewDetails={vi.fn()} />);
    expect(screen.getByText("Ribbon Badge")).toBeInTheDocument();
  });

  it("displays current/max friendship level", () => {
    render(<ResidentCard resident={makeResident()} onLevelChange={vi.fn()} onViewDetails={vi.fn()} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("/10")).toBeInTheDocument();
  });

  it("shows the paw placeholder when no imageUrl", () => {
    render(<ResidentCard resident={makeResident({ imageUrl: "" })} onLevelChange={vi.fn()} onViewDetails={vi.fn()} />);
    expect(screen.getByText("🐾")).toBeInTheDocument();
  });

  it("renders ability names", () => {
    render(<ResidentCard resident={makeResident()} onLevelChange={vi.fn()} onViewDetails={vi.fn()} />);
    expect(screen.getByText(/Sous Chef/)).toBeInTheDocument();
    expect(screen.getByText(/Everyone's Friend/)).toBeInTheDocument();
  });

  it("shows location note when present", () => {
    render(<ResidentCard resident={makeResident({ note: "Found in Spooky Swamp" })} onLevelChange={vi.fn()} onViewDetails={vi.fn()} />);
    expect(screen.getByText(/Spooky Swamp/)).toBeInTheDocument();
  });

  it("falls back to hellokitty for unknown color", () => {
    render(<ResidentCard resident={makeResident({ color: "unknown" })} onLevelChange={vi.fn()} onViewDetails={vi.fn()} />);
    expect(screen.getByText("Hello Kitty")).toBeInTheDocument();
  });
});

describe("ResidentCard — interactions", () => {
  it("calls onLevelChange with decremented value when − is clicked", () => {
    const onLevelChange = vi.fn();
    render(<ResidentCard resident={makeResident({ currentLevel: 3 })} onLevelChange={onLevelChange} onViewDetails={vi.fn()} />);
    fireEvent.click(screen.getByText("−"));
    expect(onLevelChange).toHaveBeenCalledWith("r1", 2);
  });

  it("calls onLevelChange with incremented value when ＋ is clicked", () => {
    const onLevelChange = vi.fn();
    render(<ResidentCard resident={makeResident({ currentLevel: 3 })} onLevelChange={onLevelChange} onViewDetails={vi.fn()} />);
    fireEvent.click(screen.getByText("＋"));
    expect(onLevelChange).toHaveBeenCalledWith("r1", 4);
  });

  it("does not exceed max level when ＋ is clicked at max", () => {
    const onLevelChange = vi.fn();
    render(<ResidentCard resident={makeResident({ currentLevel: 10, maxLevel: "10" })} onLevelChange={onLevelChange} onViewDetails={vi.fn()} />);
    fireEvent.click(screen.getByText("＋"));
    expect(onLevelChange).toHaveBeenCalledWith("r1", 10);
  });

  it("does not go below 0 when − is clicked at 0", () => {
    const onLevelChange = vi.fn();
    render(<ResidentCard resident={makeResident({ currentLevel: 0 })} onLevelChange={onLevelChange} onViewDetails={vi.fn()} />);
    fireEvent.click(screen.getByText("−"));
    expect(onLevelChange).toHaveBeenCalledWith("r1", 0);
  });

  it("calls onViewDetails when an ability pill is clicked", () => {
    const onViewDetails = vi.fn();
    const resident = makeResident();
    render(<ResidentCard resident={resident} onLevelChange={vi.fn()} onViewDetails={onViewDetails} />);
    fireEvent.click(screen.getByText(/Sous Chef/));
    expect(onViewDetails).toHaveBeenCalledWith(resident);
  });

  it("calls onViewDetails when View Gifts is clicked", () => {
    const onViewDetails = vi.fn();
    const resident = makeResident();
    render(<ResidentCard resident={resident} onLevelChange={vi.fn()} onViewDetails={onViewDetails} />);
    fireEvent.click(screen.getByText(/View Gifts/));
    expect(onViewDetails).toHaveBeenCalledWith(resident);
  });
});
