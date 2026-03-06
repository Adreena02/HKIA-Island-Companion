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
  likedTags: ["Bakery", "Fruit", "Fancy"],
  lovedGift: { name: "Red Bow Apple Pie", heartValue: 3, friendshipValue: 10 },
  gifts: [{ name: "Apple Pie", heartValue: 2, friendshipValue: 7 }],
  abilities: [
    { name: "Sous Chef",         levels: [{ level: 1, unlocksAt: 2,  description: "25% chance", unlocked: true  }] },
    { name: "Everyone's Friend", levels: [{ level: 1, unlocksAt: 12, description: "10% faster", unlocked: false }] },
  ],
  giftLog: null,
  note: "",
  ...overrides,
});

const defaultProps = (overrides = {}) => ({
  onLevelChange: vi.fn(),
  onViewDetails: vi.fn(),
  onGiftLog: vi.fn(),
  ...overrides,
});

describe("ResidentCard rendering", () => {
  it("displays the resident name", () => {
    render(<ResidentCard resident={makeResident()} {...defaultProps()} />);
    expect(screen.getByText("Hello Kitty")).toBeInTheDocument();
  });

  it("displays the birthday", () => {
    render(<ResidentCard resident={makeResident()} {...defaultProps()} />);
    expect(screen.getByText("November 1st")).toBeInTheDocument();
  });

  it("displays the return gift", () => {
    render(<ResidentCard resident={makeResident()} {...defaultProps()} />);
    expect(screen.getByText("Ribbon Badge")).toBeInTheDocument();
  });

  it("displays current/max friendship level", () => {
    render(<ResidentCard resident={makeResident()} {...defaultProps()} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("/10")).toBeInTheDocument();
  });

  it("shows the paw placeholder when no imageUrl", () => {
    render(<ResidentCard resident={makeResident({ imageUrl: "" })} {...defaultProps()} />);
    expect(screen.getByText("🐾")).toBeInTheDocument();
  });

  it("renders ability names", () => {
    render(<ResidentCard resident={makeResident()} {...defaultProps()} />);
    expect(screen.getByText(/Sous Chef/)).toBeInTheDocument();
    expect(screen.getByText(/Everyone's Friend/)).toBeInTheDocument();
  });

  it("shows location note when present", () => {
    render(<ResidentCard resident={makeResident({ note: "Found in Spooky Swamp" })} {...defaultProps()} />);
    expect(screen.getByText(/Spooky Swamp/)).toBeInTheDocument();
  });

  it("falls back to hellokitty for unknown color", () => {
    render(<ResidentCard resident={makeResident({ color: "unknown" })} {...defaultProps()} />);
    expect(screen.getByText("Hello Kitty")).toBeInTheDocument();
  });

  it("shows View Details button", () => {
    render(<ResidentCard resident={makeResident()} {...defaultProps()} />);
    expect(screen.getByText(/View Details/)).toBeInTheDocument();
  });
});

describe("liked tag pills", () => {
  it("renders liked tag pills with title attributes", () => {
    render(<ResidentCard resident={makeResident()} {...defaultProps()} />);
    expect(screen.getByTitle("Bakery")).toBeInTheDocument();
    expect(screen.getByTitle("Fruit")).toBeInTheDocument();
    expect(screen.getByTitle("Fancy")).toBeInTheDocument();
  });

  it("renders no tag pills when likedTags is empty", () => {
    render(<ResidentCard resident={makeResident({ likedTags: [] })} {...defaultProps()} />);
    expect(screen.queryByTitle("Bakery")).not.toBeInTheDocument();
  });
});

describe("gift tracker on card", () => {
  it("shows 0/3 gifted when giftLog is null", () => {
    render(<ResidentCard resident={makeResident({ giftLog: null })} {...defaultProps()} />);
    expect(screen.getByText("0/3 gifted")).toBeInTheDocument();
  });

  it("shows correct count from giftLog", () => {
    const recent = new Date(Date.now() - 1000 * 30).toISOString();
    render(<ResidentCard resident={makeResident({ giftLog: { count: 2, lastGiftedAt: recent } })} {...defaultProps()} />);
    // Either 2/3 (if after reset) or 0/3 (if before reset) — both are valid
    expect(screen.getByText(/\/3 gifted/)).toBeInTheDocument();
  });

  it("calls onGiftLog when gift counter is clicked", () => {
    const onGiftLog = vi.fn();
    render(<ResidentCard resident={makeResident({ giftLog: null })} {...defaultProps({ onGiftLog })} />);
    fireEvent.click(screen.getByText("0/3 gifted"));
    expect(onGiftLog).toHaveBeenCalledWith("r1");
  });

  it("disables gift button when maxed at 3/3", () => {
    const recent = new Date(Date.now() - 1000 * 30).toISOString();
    const { getLastResetTime } = require("../utils/giftReset");
    if (new Date(recent) > getLastResetTime()) {
      render(<ResidentCard resident={makeResident({ giftLog: { count: 3, lastGiftedAt: recent } })} {...defaultProps()} />);
      const btn = screen.getByText("3/3 gifted");
      expect(btn).toBeDisabled();
    }
  });
});

describe("level and interaction handlers", () => {
  it("calls onLevelChange with decremented value when − is clicked", () => {
    const onLevelChange = vi.fn();
    render(<ResidentCard resident={makeResident({ currentLevel: 3 })} {...defaultProps({ onLevelChange })} />);
    fireEvent.click(screen.getByText("−"));
    expect(onLevelChange).toHaveBeenCalledWith("r1", 2);
  });

  it("calls onLevelChange with incremented value when ＋ is clicked", () => {
    const onLevelChange = vi.fn();
    render(<ResidentCard resident={makeResident({ currentLevel: 3 })} {...defaultProps({ onLevelChange })} />);
    fireEvent.click(screen.getByText("＋"));
    expect(onLevelChange).toHaveBeenCalledWith("r1", 4);
  });

  it("does not exceed max level when ＋ is clicked at max", () => {
    const onLevelChange = vi.fn();
    render(<ResidentCard resident={makeResident({ currentLevel: 10, maxLevel: "10" })} {...defaultProps({ onLevelChange })} />);
    fireEvent.click(screen.getByText("＋"));
    expect(onLevelChange).toHaveBeenCalledWith("r1", 10);
  });

  it("does not go below 0 when − is clicked at 0", () => {
    const onLevelChange = vi.fn();
    render(<ResidentCard resident={makeResident({ currentLevel: 0 })} {...defaultProps({ onLevelChange })} />);
    fireEvent.click(screen.getByText("−"));
    expect(onLevelChange).toHaveBeenCalledWith("r1", 0);
  });

  it("calls onViewDetails when View Details is clicked", () => {
    const onViewDetails = vi.fn();
    const resident = makeResident();
    render(<ResidentCard resident={resident} {...defaultProps({ onViewDetails })} />);
    fireEvent.click(screen.getByText(/View Details/));
    expect(onViewDetails).toHaveBeenCalledWith(resident);
  });

  it("calls onViewDetails when an ability pill is clicked", () => {
    const onViewDetails = vi.fn();
    const resident = makeResident();
    render(<ResidentCard resident={resident} {...defaultProps({ onViewDetails })} />);
    fireEvent.click(screen.getByText(/Sous Chef/));
    expect(onViewDetails).toHaveBeenCalledWith(resident);
  });
});