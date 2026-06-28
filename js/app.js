// app.js — navigation, events, initialisation

document.addEventListener("DOMContentLoaded", function() {

  // ---- init subsystems ----
  renderBuildingsGrid();

  // ---- toast ----
  const toast = document.createElement("div");
  toast.id = "export-toast";
  toast.textContent = "Downloading main.js and info.txt...";
  document.body.appendChild(toast);

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2400);
  }

  // ---- nav ----
  const navBtns = document.querySelectorAll(".nav-btn");
  const panels  = document.querySelectorAll(".panel");

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
    switchPanel("upgrades");
  });

  // ---- add blab ----
  document.getElementById("btn-add-blab").addEventListener("click", function() {
    addBlabCard();
  });

  // ---- export -> download ----
  document.getElementById("btn-export").addEventListener("click", function() {
    exportAndDownload();
    showToast("Downloading main.js and info.txt...");
  });

  // ---- reset ----
  document.getElementById("btn-reset").addEventListener("click", function() {
    if (!confirm("Reset all fields to defaults?")) return;

    ["mod-name", "mod-id", "mod-version", "mod-author", "mod-desc"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    document.getElementById("cursor-cps").value   = "1";
    document.getElementById("cursor-click").value = "1";

    resetBuildings();
    resetUpgrades();
    resetBlabs();

    ["gc-freq", "gc-duration", "gc-reward", "gc-frenzy"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "1";
    });

    document.getElementById("global-cps").value        = "1";
    document.getElementById("starting-cookies").value  = "0";
    document.getElementById("toggle-wrinklers").checked = false;
    document.getElementById("toggle-seasons").checked   = false;
    document.getElementById("custom-js").value          = "";
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

  // ---- helper ----
  function switchPanel(section) {
    navBtns.forEach(b => b.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    const btn = document.querySelector(`[data-section="${section}"]`);
    if (btn) btn.classList.add("active");
    const panel = document.getElementById("panel-" + section);
    if (panel) panel.classList.add("active");
  }

});
