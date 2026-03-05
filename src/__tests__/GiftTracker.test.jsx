import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GiftTracker } from "../components/residents/GiftTracker";
import { getLastResetTime } from "../utils/giftReset";

const recentDate = () => {
  const d = new Date(Date.now() - 1000 * 30); // 30s ago
  return d > getLastResetTime() ? d.toISOString() : null;
};

const expiredDate = () => new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(); // 2 days ago

// ─── Compact mode ─────────────────────────────────────────────────────────────

describe("GiftTracker — compact mode", () => {
  it("shows 0/3 gifted when giftLog is null", () => {
    render(<GiftTracker giftLog={null} onLog={vi.fn()} onReset={null} compact />);
    expect(screen.getByText("0/3 gifted")).toBeInTheDocument();
  });

  it("shows 0/3 gifted when giftLog is expired", () => {
    render(<GiftTracker giftLog={{ count: 3, lastGiftedAt: expiredDate() }} onLog={vi.fn()} onReset={null} compact />);
    expect(screen.getByText("0/3 gifted")).toBeInTheDocument();
  });

  it("shows reset time message when maxed", () => {
    const recent = recentDate();
    if (!recent) return;
    render(<GiftTracker giftLog={{ count: 3, lastGiftedAt: recent }} onLog={vi.fn()} onReset={null} compact />);
    expect(screen.getByText(/Resets at/)).toBeInTheDocument();
  });

  it("calls onLog when button is clicked and not maxed", () => {
    const onLog = vi.fn();
    render(<GiftTracker giftLog={null} onLog={onLog} onReset={null} compact />);
    fireEvent.click(screen.getByText("0/3 gifted"));
    expect(onLog).toHaveBeenCalledOnce();
  });

  it("button is disabled when maxed", () => {
    const recent = recentDate();
    if (!recent) return;
    render(<GiftTracker giftLog={{ count: 3, lastGiftedAt: recent }} onLog={vi.fn()} onReset={null} compact />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

// ─── Full mode ────────────────────────────────────────────────────────────────

describe("GiftTracker — full mode", () => {
  it("shows 0/3 gifts given today when giftLog is null", () => {
    render(<GiftTracker giftLog={null} onLog={vi.fn()} onReset={vi.fn()} />);
    expect(screen.getByText("0/3 gifts given today")).toBeInTheDocument();
  });

  it("shows Log Gift button when not maxed", () => {
    render(<GiftTracker giftLog={null} onLog={vi.fn()} onReset={vi.fn()} />);
    expect(screen.getByText("＋ Log Gift")).toBeInTheDocument();
  });

  it("shows All done! when maxed", () => {
    const recent = recentDate();
    if (!recent) return;
    render(<GiftTracker giftLog={{ count: 3, lastGiftedAt: recent }} onLog={vi.fn()} onReset={vi.fn()} />);
    expect(screen.getByText("All done!")).toBeInTheDocument();
  });

  it("calls onLog when Log Gift is clicked", () => {
    const onLog = vi.fn();
    render(<GiftTracker giftLog={null} onLog={onLog} onReset={vi.fn()} />);
    fireEvent.click(screen.getByText("＋ Log Gift"));
    expect(onLog).toHaveBeenCalledOnce();
  });

  it("calls onReset when Reset is clicked", () => {
    const onReset = vi.fn();
    render(<GiftTracker giftLog={null} onLog={vi.fn()} onReset={onReset} />);
    fireEvent.click(screen.getByText("🔄 Reset"));
    expect(onReset).toHaveBeenCalledOnce();
  });

  it("shows reset time in footer", () => {
    render(<GiftTracker giftLog={null} onLog={vi.fn()} onReset={vi.fn()} />);
    expect(screen.getByText(/Resets daily at/)).toBeInTheDocument();
  });

  it("shows last gifted time when recent", () => {
    const recent = recentDate();
    if (!recent) return;
    render(<GiftTracker giftLog={{ count: 1, lastGiftedAt: recent }} onLog={vi.fn()} onReset={vi.fn()} />);
    expect(screen.getByText(/Last gifted at/)).toBeInTheDocument();
  });

  it("does not show last gifted time when expired", () => {
    render(<GiftTracker giftLog={{ count: 1, lastGiftedAt: expiredDate() }} onLog={vi.fn()} onReset={vi.fn()} />);
    expect(screen.queryByText(/Last gifted at/)).not.toBeInTheDocument();
  });

  it("Log Gift button is disabled when maxed", () => {
    const recent = recentDate();
    if (!recent) return;
    render(<GiftTracker giftLog={{ count: 3, lastGiftedAt: recent }} onLog={vi.fn()} onReset={vi.fn()} />);
    const btn = screen.getByText("All done!");
    expect(btn).toBeDisabled();
  });
});
