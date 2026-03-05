import { useEffect } from "react";

/**
 * Modal
 * A centered overlay dialog.
 * - Closes on Escape key press
 * - Closes when clicking the backdrop
 * - Closes via the ✕ button in the header
 */
export function Modal({ open, onClose, title, children }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(100,60,60,0.25)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div style={{
        background: "#fffdf9",
        borderRadius: 20,
        padding: "clamp(16px, 4vw, 28px)",
        width: "100%",
        maxWidth: 480,
        boxShadow: "0 20px 60px rgba(100,60,60,0.2)",
        animation: "popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        maxHeight: "90vh",
        overflowY: "auto",
        border: "2px solid rgba(255,255,255,0.9)",
      }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Modal header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{
            fontFamily: "'Baloo 2', cursive",
            fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
            fontWeight: 700,
            color: "#3a2e2e",
            margin: 0,
          }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
              color: "#7a6a6a",
              lineHeight: 1,
              padding: 4,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}