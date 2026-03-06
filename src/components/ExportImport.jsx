import { Btn } from "./ui/Btn";

export function ExportImport({ showToast }) {
  const handleExport = () => {
    const data = {
      exported:  new Date().toISOString(),
      residents: JSON.parse(localStorage.getItem("hkia_residents") || "[]"),
      inventory: JSON.parse(localStorage.getItem("hkia_inventory") || "[]"),
      recipes:   JSON.parse(localStorage.getItem("hkia_recipes")   || "[]"),
      catalogue: JSON.parse(localStorage.getItem("hkia_catalogue") || "[]"),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `hkia-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("📦 Data exported!");
  };

  const handleImport = () => {
    const input    = document.createElement("input");
    input.type     = "file";
    input.accept   = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader    = new FileReader();
      reader.onload   = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.residents) localStorage.setItem("hkia_residents", JSON.stringify(data.residents));
          if (data.inventory) localStorage.setItem("hkia_inventory", JSON.stringify(data.inventory));
          if (data.recipes)   localStorage.setItem("hkia_recipes",   JSON.stringify(data.recipes));
          if (data.catalogue) localStorage.setItem("hkia_catalogue", JSON.stringify(data.catalogue));
          showToast("✅ Data imported! Refreshing…");
          setTimeout(() => window.location.reload(), 1200);
        } catch {
          showToast("⚠️ Invalid file format");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Btn variant="ghost" small onClick={handleImport}>📂 Import</Btn>
      <Btn variant="ghost" small onClick={handleExport}>📦 Export</Btn>
    </div>
  );
}