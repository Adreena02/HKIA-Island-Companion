import { useState, useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SEED_RESIDENTS, migrateResident, ACCENT_SOLID, ACCENT_GRADIENTS, getSafeColor, normaliseAbility } from "../../constants";
import { SEED_EVENTS, EVENT_TYPES } from "../../constants_events";
import { getCurrentGiftCount, formatNextReset, getLastResetISO } from "../../utils/giftReset";
import { uid } from "../../constants";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/** Returns today's {month:1-12, day} */
function today() {
  const d = new Date();
  return { month: d.getMonth() + 1, day: d.getDate() };
}

/** Days from date a to date b (both {month,day}), same year logic */
function daysBetween(a, b) {
  const yr = new Date().getFullYear();
  const da = new Date(yr, a.month - 1, a.day);
  const db = new Date(yr, b.month - 1, b.day);
  return Math.round((db - da) / 86400000);
}

/** Returns event status: "active" | "upcoming" | "past" */
function eventStatus(event) {
  const t = today();
  const yr = new Date().getFullYear();

  // Handle wrap-around (Lighttime Jubilee spans Dec→Jan)
  let start = new Date(yr, event.startMonth - 1, event.startDay);
  let end   = new Date(yr, event.endMonth   - 1, event.endDay);
  if (end < start) end = new Date(yr + 1, event.endMonth - 1, event.endDay);

  const now = new Date();
  if (now >= start && now <= end) return "active";
  if (now < start) return "upcoming";
  return "past";
}

/** Days until event starts (or 0 if active) */
function daysUntilStart(event) {
  const yr = new Date().getFullYear();
  const start = new Date(yr, event.startMonth - 1, event.startDay);
  const now   = new Date();
  if (now > start) return 0;
  return Math.ceil((start - now) / 86400000);
}

/** Days remaining in active event */
function daysRemaining(event) {
  const yr = new Date().getFullYear();
  let end = new Date(yr, event.endMonth - 1, event.endDay);
  if (end < new Date(yr, event.startMonth - 1, event.startDay))
    end = new Date(yr + 1, event.endMonth - 1, event.endDay);
  const now = new Date();
  return Math.max(0, Math.ceil((end - now) / 86400000));
}

// ─── Card wrapper with optional scrollable body ───────────────────────────────

function DashboardCard({ children, scrollable, maxHeight = 340 }) {
  return (
    <div style={{
      background: "#fffdf9", borderRadius: 16,
      border: "2px solid rgba(255,255,255,0.9)",
      boxShadow: "0 4px 18px rgba(180,130,130,0.12)",
      display: "flex", flexDirection: "column",
      overflow: "hidden", height: "100%",
    }}>
      {scrollable ? (
        <>
          <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>{children[0]}</div>
          <div style={{
            overflowY: "auto", flex: 1,
            padding: "0 20px 20px",
            maskImage: "linear-gradient(to bottom, black calc(100% - 32px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black calc(100% - 32px), transparent 100%)",
          }}>
            {children.slice(1)}
          </div>
        </>
      ) : (
        <div style={{ padding: 20, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>{children}</div>
      )}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ emoji, title, sub }) {
  return (
    <div style={{ marginBottom: 16, textAlign: "center" }}>
      <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.2rem", fontWeight: 700, color: "#3a2e2e", margin: 0 }}>
        {emoji} {title}
      </h2>
      {sub && <p style={{ fontSize: "0.8rem", color: "#b0a0a0", margin: "4px 0 0", fontWeight: 600 }}>{sub}</p>}
    </div>
  );
}

// ─── Daily Checklist ─────────────────────────────────────────────────────────

const DEFAULT_TASKS = [
  { id: "gifts",   label: "Give daily gifts to all residents", system: true  },
  { id: "daily-r", label: "Collect daily reward from My Melody", system: true },
  { id: "quests",  label: "Complete daily quests", system: true },
];

function DailyChecklist({ showToast }) {
  const nextReset = formatNextReset();

  // Checklist state: { date: "YYYY-MM-DD", checked: { taskId: bool }, customTasks: [{id,label}] }
  const [checklistState, setChecklistState] = useLocalStorage("hkia_checklist", {
    date: "",
    checked: {},
    customTasks: [],
  });

  const [newTask, setNewTask] = useState("");

  // Auto-reset when the 7AM UTC reset boundary has passed since last save
  const currentResetISO = getLastResetISO();
  const state = (checklistState.lastResetISO === currentResetISO)
    ? checklistState
    : { lastResetISO: currentResetISO, checked: {}, customTasks: checklistState.customTasks ?? [] };

  const allTasks = [...DEFAULT_TASKS, ...(state.customTasks ?? [])];
  const doneCount = allTasks.filter((t) => state.checked[t.id]).length;

  const toggle = (id) => {
    setChecklistState({ ...state, checked: { ...state.checked, [id]: !state.checked[id] } });
  };

  const addTask = () => {
    const label = newTask.trim();
    if (!label) return;
    const task = { id: uid(), label };
    setChecklistState({ ...state, customTasks: [...(state.customTasks ?? []), task] });
    setNewTask("");
    showToast("✅ Task added!");
  };

  const removeTask = (id) => {
    setChecklistState({
      ...state,
      customTasks: (state.customTasks ?? []).filter((t) => t.id !== id),
      checked: Object.fromEntries(Object.entries(state.checked).filter(([k]) => k !== id)),
    });
  };

  return (
    <DashboardCard scrollable>
      <SectionHeader emoji="✅" title="Daily Checklist" sub={`Resets at ${nextReset} · ${doneCount}/${allTasks.length} done`} />
      <div>
      {/* Progress bar */}
      <div style={{ height: 7, borderRadius: 10, background: "#f2eee8", overflow: "hidden", marginBottom: 16 }}>
        <div style={{
          height: "100%", borderRadius: 10,
          background: doneCount === allTasks.length && allTasks.length > 0
            ? "linear-gradient(90deg, #22c55e, #86efac)"
            : "linear-gradient(90deg, #f5a0c8, #e8003c)",
          width: `${allTasks.length > 0 ? (doneCount / allTasks.length) * 100 : 0}%`,
          transition: "width 0.4s ease",
        }} role="progressbar" aria-valuenow={doneCount} aria-valuemin={0} aria-valuemax={allTasks.length} />
      </div>

      {/* Task list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {allTasks.map((task) => {
          const done = !!state.checked[task.id];
          return (
            <div key={task.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 10,
              background: done ? "rgba(34,197,94,0.07)" : "#faf7f4",
              border: `1px solid ${done ? "rgba(34,197,94,0.2)" : "#ede8e2"}`,
              transition: "all 0.2s ease",
            }}>
              <button
                onClick={() => toggle(task.id)}
                aria-label={`${done ? "Uncheck" : "Check"} ${task.label}`}
                style={{
                  flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                  border: `2px solid ${done ? "#22c55e" : "#d0c0c0"}`,
                  background: done ? "#22c55e" : "transparent",
                  color: done ? "#fff" : "#d0c0c0",
                  cursor: "pointer", fontSize: "0.7rem", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease", padding: 0,
                }}
              >{done ? "✓" : ""}</button>
              <span style={{
                flex: 1, fontSize: "0.88rem", fontWeight: 600,
                color: done ? "#a0b0a0" : "#3a2e2e",
                textDecoration: done ? "line-through" : "none",
                transition: "all 0.2s ease",
              }}>{task.label}</span>
              {!task.system && (
                <button
                  onClick={() => removeTask(task.id)}
                  aria-label={`Remove task: ${task.label}`}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color: "#c0b0b0", padding: "0 2px", opacity: 0.5, transition: "opacity 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.5"; }}
                >✕</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add custom task */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a custom task…"
          aria-label="New task name"
          style={{
            flex: 1, padding: "8px 14px", borderRadius: 50,
            border: "2px solid rgba(180,130,130,0.2)",
            fontFamily: "'Nunito', sans-serif", fontSize: "0.88rem",
            color: "#3a2e2e", background: "#f2eee8", outline: "none",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onFocus={(e) => { e.target.style.borderColor = "#ff8fa3"; e.target.style.background = "#fff"; }}
          onBlur={(e)  => { e.target.style.borderColor = "rgba(180,130,130,0.2)"; e.target.style.background = "#f2eee8"; }}
        />
        <button
          onClick={addTask}
          aria-label="Add task"
          style={{
            fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "0.9rem",
            padding: "8px 18px", borderRadius: 50, border: "none", cursor: "pointer",
            background: "#e8003c", color: "#fff",
            boxShadow: "0 2px 10px #e8003c44",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
        >＋</button>
      </div>
      </div>
    </DashboardCard>
  );
}

// ─── Daily Gifts Summary ──────────────────────────────────────────────────────

function DailyGiftsSummary({ residents, onLogGift }) {
  const nextReset = formatNextReset();
  const sorted = [...residents].sort((a, b) => {
    const ca = getCurrentGiftCount(a.giftLog);
    const cb = getCurrentGiftCount(b.giftLog);
    return ca - cb; // residents with fewer gifts first
  });

  const allDone = sorted.every((r) => getCurrentGiftCount(r.giftLog) >= 3);

  return (
    <DashboardCard scrollable>
      <SectionHeader emoji="🎀" title="Daily Gifts" sub={`Resets at ${nextReset}`} />
      <div>
      {allDone && (
        <div style={{ textAlign: "center", padding: "10px 0 14px", fontSize: "0.88rem", fontWeight: 700, color: "#22c55e" }}>
          ✨ All gifts given today!
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {sorted.map((r) => {
          const count     = getCurrentGiftCount(r.giftLog);
          const maxed     = count >= 3;
          const safeColor = getSafeColor(r.color);
          const solid     = ACCENT_SOLID[safeColor];
          return (
            <div key={r.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "7px 12px", borderRadius: 10,
              background: maxed ? "rgba(34,197,94,0.06)" : "#faf7f4",
              border: `1px solid ${maxed ? "rgba(34,197,94,0.18)" : "#ede8e2"}`,
              transition: "all 0.2s",
            }}>
              {/* Portrait */}
              <div style={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${solid}44`, background: `${solid}18`,
                overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {r.imageUrl
                  ? <img src={r.imageUrl} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.target.style.display = "none"; }} />
                  : <span style={{ fontSize: "0.75rem" }}>🐾</span>}
              </div>

              {/* Name */}
              <span style={{ flex: 1, fontSize: "0.88rem", fontWeight: 700, color: maxed ? "#a0b0a0" : solid }}>
                {r.name}
              </span>

              {/* Dot indicators */}
              <div style={{ display: "flex", gap: 4 }}>
                {[0,1,2].map((i) => (
                  <div key={i} style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: i < count ? solid : "#e8d8d8",
                    border: `1.5px solid ${i < count ? solid : "#d8d0c8"}`,
                    transition: "all 0.2s",
                  }} aria-hidden="true" />
                ))}
              </div>

              {/* Quick-log button */}
              {maxed ? (
                <span style={{
                  fontSize: "0.75rem", fontWeight: 700, color: "#22c55e",
                  minWidth: 46, textAlign: "right",
                }}>✓ Done</span>
              ) : (
                <button
                  onClick={() => onLogGift(r.id)}
                  aria-label={`Log gift for ${r.name} (${count}/3 given)`}
                  style={{
                    flexShrink: 0, fontFamily: "'Baloo 2', cursive", fontWeight: 700,
                    fontSize: "0.8rem", padding: "3px 10px", borderRadius: 50,
                    border: `2px solid ${solid}`,
                    background: "transparent", color: solid, cursor: "pointer",
                    transition: "all 0.2s ease", whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = solid; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = solid; }}
                >＋ Gift</button>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </DashboardCard>
  );
}

// ─── Friendship Milestones ────────────────────────────────────────────────────

function FriendshipMilestones({ residents }) {
  const [selectedId, setSelectedId] = useState(residents[0]?.id ?? "");
  const resident = residents.find((r) => r.id === selectedId);

  const safeColor   = resident ? getSafeColor(resident.color) : "hellokitty";
  const solid       = ACCENT_SOLID[safeColor];
  const gradient    = ACCENT_GRADIENTS[safeColor];
  const currentLvl  = parseInt(resident?.currentLevel) || 0;
  const maxLvl      = parseInt(resident?.maxLevel) || 25;

  // Flatten all ability levels into milestone objects sorted by unlocksAt
  const milestones = useMemo(() => {
    if (!resident) return [];
    const normAbilities = (resident.abilities ?? []).map(normaliseAbility);
    const list = [];
    normAbilities.forEach((ability) => {
      ability.levels.forEach((lvl) => {
        list.push({
          unlocksAt:   lvl.unlocksAt,
          abilityName: ability.name,
          description: lvl.description,
          level:       lvl.level,
          totalLevels: ability.levels.length,
          unlocked:    lvl.unlocked || currentLvl >= lvl.unlocksAt,
        });
      });
    });
    return list.sort((a, b) => a.unlocksAt - b.unlocksAt);
  }, [resident, currentLvl]);

  const nextMilestone = milestones.find((m) => !m.unlocked);

  return (
    <DashboardCard scrollable>
      <SectionHeader emoji="🌟" title="Friendship Milestones" />
      <div>
      {/* Resident picker */}
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        aria-label="Select resident"
        style={{
          width: "100%", padding: "9px 14px", borderRadius: 12,
          border: `2px solid ${solid}44`,
          fontFamily: "'Nunito', sans-serif", fontSize: "0.92rem",
          color: "#3a2e2e", background: "#f9f5f2",
          outline: "none", cursor: "pointer", marginBottom: 16,
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => { e.target.style.borderColor = solid; }}
        onBlur={(e)  => { e.target.style.borderColor = `${solid}44`; }}
      >
        {residents.map((r) => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>

      {resident && (
        <>
          {/* Level progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
              border: `2px solid ${solid}55`, overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `${solid}18`,
            }}>
              {resident.imageUrl
                ? <img src={resident.imageUrl} alt={resident.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: "1rem" }}>🐾</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#7a6a6a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Friendship Level</span>
                <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: "0.95rem", fontWeight: 700, color: solid }}>
                  {currentLvl}<span style={{ color: "#b0a0a0", fontWeight: 500 }}>/{maxLvl}</span>
                </span>
              </div>
              <div style={{ height: 7, borderRadius: 10, background: "#f2eee8", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 10,
                  background: gradient,
                  width: `${(currentLvl / maxLvl) * 100}%`,
                  transition: "width 0.4s ease",
                }} role="progressbar" aria-valuenow={currentLvl} aria-valuemin={0} aria-valuemax={maxLvl} />
              </div>
            </div>
          </div>

          {/* Next milestone callout */}
          {nextMilestone && (
            <div style={{
              padding: "10px 14px", borderRadius: 10, marginBottom: 14,
              background: `${solid}10`, border: `1.5px solid ${solid}30`,
            }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: solid, marginBottom: 3 }}>
                Next unlock at Lv {nextMilestone.unlocksAt}
                {currentLvl < nextMilestone.unlocksAt && (
                  <span style={{ color: "#b0a0a0", fontWeight: 500, marginLeft: 6 }}>
                    ({nextMilestone.unlocksAt - currentLvl} level{nextMilestone.unlocksAt - currentLvl !== 1 ? "s" : ""} away)
                  </span>
                )}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#3a2e2e", fontWeight: 600 }}>{nextMilestone.abilityName}</div>
              <div style={{ fontSize: "0.8rem", color: "#7a6a6a", marginTop: 2, lineHeight: 1.4 }}>{nextMilestone.description}</div>
            </div>
          )}

          {milestones.length === 0 && (
            <div style={{ fontSize: "0.85rem", color: "#c0b0b0", fontStyle: "italic", textAlign: "center", padding: "12px 0" }}>
              No ability data for this resident.
            </div>
          )}

          {/* All milestones timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {milestones.map((m, i) => {
              const reached = currentLvl >= m.unlocksAt;
              return (
                <div key={i} style={{
                  display: "flex", gap: 10, alignItems: "flex-start",
                  padding: "8px 12px", borderRadius: 10,
                  background: reached ? `${solid}0d` : "#faf7f4",
                  border: `1px solid ${reached ? `${solid}25` : "#ede8e2"}`,
                  opacity: reached ? 1 : 0.75,
                  transition: "all 0.2s",
                }}>
                  {/* Level badge */}
                  <div style={{
                    flexShrink: 0, minWidth: 36, padding: "2px 6px", borderRadius: 50,
                    textAlign: "center", fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "0.78rem",
                    background: reached ? gradient : "#ece7e1",
                    color: reached ? "#fff" : "#a09090",
                  }}>
                    {reached ? "✓" : `Lv${m.unlocksAt}`}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: reached ? solid : "#7a6a6a", marginBottom: 2 }}>
                      {m.abilityName}
                      {m.totalLevels > 1 && (
                        <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "#b0a0a0", marginLeft: 5 }}>
                          Lv {m.level}/{m.totalLevels}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: reached ? "#5a4a4a" : "#a09090", lineHeight: 1.4 }}>{m.description}</div>
                  </div>
                  {!reached && (
                    <div style={{ flexShrink: 0, fontSize: "0.72rem", fontWeight: 700, color: "#b0a0a0", whiteSpace: "nowrap" }}>
                      Lv {m.unlocksAt}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      </div>
    </DashboardCard>
  );
}

// ─── Events Tracker ───────────────────────────────────────────────────────────

function EventsTracker() {
  const [filter, setFilter] = useState("upcoming"); // "active" | "upcoming" | "all"

  const enriched = useMemo(() => SEED_EVENTS.map((e) => ({
    ...e,
    status:    eventStatus(e),
    daysLeft:  daysRemaining(e),
    daysUntil: daysUntilStart(e),
  })), []);

  const active   = enriched.filter((e) => e.status === "active");
  const upcoming = enriched.filter((e) => e.status === "upcoming").slice(0, 8);
  const displayed =
    filter === "active"   ? active :
    filter === "upcoming" ? upcoming :
    enriched.filter((e) => e.status !== "past").sort((a, b) =>
      (a.status === "active" ? 0 : 1) - (b.status === "active" ? 0 : 1) || a.daysUntil - b.daysUntil
    );

  return (
    <DashboardCard scrollable maxHeight={380}>
      <SectionHeader
        emoji="📅"
        title="Seasonal Events"
        sub="Dates are approximate and may shift each year"
      />
      <div>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }} role="group" aria-label="Filter events">
        {[
          { val: "active",   label: `🟢 Active (${active.length})` },
          { val: "upcoming", label: "🔜 Upcoming" },
          { val: "all",      label: "📋 All" },
        ].map(({ val, label }) => (
          <button key={val} onClick={() => setFilter(val)}
            aria-pressed={filter === val}
            style={{
              fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "0.8rem",
              padding: "5px 14px", borderRadius: 50, border: "none", cursor: "pointer",
              background: filter === val ? "#e8003c" : "rgba(255,255,255,0.6)",
              color: filter === val ? "#fff" : "#7a6a6a",
              backdropFilter: "blur(8px)",
              boxShadow: filter === val ? "0 2px 10px #e8003c44" : "none",
              transition: "all 0.2s ease",
            }}>{label}</button>
        ))}
      </div>

      {displayed.length === 0 && (
        <div style={{ textAlign: "center", padding: "20px 0", color: "#b0a0a0", fontSize: "0.85rem", fontStyle: "italic" }}>
          No {filter} events right now.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {displayed.map((event) => {
          const typeInfo = EVENT_TYPES[event.type];
          const isActive = event.status === "active";
          return (
            <div key={event.id} style={{
              padding: "12px 14px", borderRadius: 12,
              background: isActive ? `${typeInfo.bg}` : "#faf7f4",
              border: `1.5px solid ${isActive ? typeInfo.color + "40" : "#ede8e2"}`,
              transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                {/* Left */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                    <span style={{ fontSize: "1.1rem" }} aria-hidden="true">{event.emoji}</span>
                    <span style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "0.95rem", color: "#3a2e2e" }}>
                      {event.name}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#7a6a6a", lineHeight: 1.4, marginBottom: 5 }}>
                    {event.description}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    {/* Type badge */}
                    <span style={{
                      fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: 50,
                      background: typeInfo.bg, color: typeInfo.color,
                    }}>{typeInfo.label}</span>
                    {/* Date range */}
                    <span style={{ fontSize: "0.72rem", color: "#b0a0a0", fontWeight: 600 }}>
                      {MONTHS[event.startMonth - 1]} {event.startDay} – {MONTHS[event.endMonth - 1]} {event.endDay}
                    </span>
                  </div>
                </div>

                {/* Right — countdown */}
                <div style={{ flexShrink: 0, textAlign: "center", minWidth: 60 }}>
                  {isActive ? (
                    <div>
                      <div style={{
                        fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: "1.3rem",
                        color: typeInfo.color, lineHeight: 1,
                      }}>{event.daysLeft}</div>
                      <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#b0a0a0", letterSpacing: "0.05em" }}>
                        {event.daysLeft === 1 ? "day left" : "days left"}
                      </div>
                      <div style={{
                        marginTop: 4, fontSize: "0.65rem", fontWeight: 700, padding: "2px 7px", borderRadius: 50,
                        background: "#22c55e", color: "#fff",
                      }}>ACTIVE</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: "1.3rem",
                        color: "#b0a0a0", lineHeight: 1,
                      }}>{event.daysUntil}</div>
                      <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#b0a0a0", letterSpacing: "0.05em" }}>
                        {event.daysUntil === 1 ? "day away" : "days away"}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {event.notes && (
                <div style={{ marginTop: 6, fontSize: "0.72rem", color: "#b0a0a0", fontStyle: "italic" }}>
                  💡 {event.notes}
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </DashboardCard>
  );
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────

export function DashboardTab({ showToast }) {
  const [rawResidents, setResidents] = useLocalStorage("hkia_residents", SEED_RESIDENTS);
  const residents = rawResidents.map(migrateResident);

  const handleLogGift = (id) => {
    setResidents((prev) => prev.map((r) => {
      if (r.id !== id) return r;
      const count = getCurrentGiftCount(r.giftLog);
      if (count >= 3) return r;
      return { ...r, giftLog: { count: count + 1, lastGiftedAt: new Date().toISOString() } };
    }));
    showToast("🎀 Gift logged!");
  };

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 17 ? "Good afternoon" :
    "Good evening";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <style>{`
        @media (max-width: 700px) {
          .dashboard-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
        }
      `}</style>

      {/* Welcome header */}
      <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
        <h1 style={{
          fontFamily: "'Baloo 2', cursive", fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
          fontWeight: 800, color: "#3a2e2e", margin: 0,
        }}>
          {greeting}, islander! 🌺
        </h1>
        <p style={{ color: "#b0a0a0", fontSize: "0.88rem", marginTop: 4, fontWeight: 600 }}>
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      {/* 2×2 equal-height grid */}
      <div className="dashboard-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 340px)",
        gap: 20,
        alignItems: "stretch",
      }}>
        <DailyChecklist showToast={showToast} />
        <EventsTracker />
        <DailyGiftsSummary residents={residents} onLogGift={handleLogGift} />
        <FriendshipMilestones residents={residents} />
      </div>
    </div>
  );
}