// app.js — navigation, events, initialisation

document.addEventListener("DOMContentLoaded", function() {

  // ---- init subsystems ----
  renderBuildingsGrid();

  // ---- nav ----
  const navBtns  = document.querySelectorAll(".nav-btn");
  const panels   = document.querySelectorAll(".panel");

  navBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      navBtns.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const target = document.getElementById("panel-" + btn.dataset.section);
      if (target) target.classList.add("active");
    });
  });

  // ---- add upgrade ----
  document.getElementById("btn-add-upgrade").addEventListener("click", function() {
    addUpgradeCard();
    // Switch to upgrades panel
    navBtns.forEach(b => b.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    document.querySelector('[data-section="upgrades"]').classList.add("active");
    document.getElementById("panel-upgrades").classList.add("active");
  });

  // ---- export ----
  document.getElementById("btn-export").addEventListener("click", function() {
    const code = generateMod();
    document.getElementById("output-code").textContent = code;
    document.getElementById("output-panel").classList.remove("hidden");
  });

  // ---- close output ----
  document.getElementById("btn-close-output").addEventListener("click", function() {
    document.getElementById("output-panel").classList.add("hidden");
  });

  // ---- copy output ----
  document.getElementById("btn-copy").addEventListener("click", function() {
    const code = document.getElementById("output-code").textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById("btn-copy");
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = "Copy"; }, 1800);
      });
    } else {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      const btn = document.getElementById("btn-copy");
      btn.textContent = "Copied!";
      setTimeout(() => { btn.textContent = "Copy"; }, 1800);
    }
  });

  // ---- reset ----
  document.getElementById("btn-reset").addEventListener("click", function() {
    if (!confirm("Reset all fields to defaults?")) return;

    // Info
    ["mod-name", "mod-id", "mod-version", "mod-author", "mod-desc"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    // Cursors
    document.getElementById("cursor-cps").value   = "1";
    document.getElementById("cursor-click").value = "1";

    // Buildings
    resetBuildings();

    // Upgrades
    resetUpgrades();

    // Golden cookies
    ["gc-freq", "gc-duration", "gc-reward", "gc-frenzy"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "1";
    });

    // Misc
    document.getElementById("global-cps").value      = "1";
    document.getElementById("starting-cookies").value = "0";
    document.getElementById("toggle-wrinklers").checked = false;
    document.getElementById("toggle-seasons").checked   = false;
    document.getElementById("custom-js").value          = "";

    // Hide output
    document.getElementById("output-panel").classList.add("hidden");
  });

  // ---- auto-generate mod ID from name ----
  document.getElementById("mod-name").addEventListener("input", function() {
    const idField = document.getElementById("mod-id");
    if (idField && idField.dataset.userEdited !== "true") {
      idField.value = this.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
  });

  document.getElementById("mod-id").addEventListener("input", function() {
    this.dataset.userEdited = "true";
  });

});
