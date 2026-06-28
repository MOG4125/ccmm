// upgrades.js — dynamic upgrade card management

let upgradeCount = 0;

const UPGRADE_TARGETS = [
  { value: "global_cps",   label: "Global CPS" },
  { value: "click",        label: "Click Power" },
  { value: "cursor",       label: "Cursor" },
  { value: "grandma",      label: "Grandma" },
  { value: "farm",         label: "Farm" },
  { value: "mine",         label: "Mine" },
  { value: "factory",      label: "Factory" },
  { value: "bank",         label: "Bank" },
  { value: "temple",       label: "Temple" },
  { value: "wizardtower",  label: "Wizard Tower" },
  { value: "shipment",     label: "Shipment" },
  { value: "alchemylab",   label: "Alchemy Lab" },
  { value: "portal",       label: "Portal" },
  { value: "timemachine",  label: "Time Machine" },
  { value: "antimatter",   label: "Antimatter Condenser" },
  { value: "prism",        label: "Prism" },
  { value: "chancemaker",  label: "Chancemaker" },
  { value: "fractal",      label: "Fractal Engine" },
  { value: "javascript",   label: "Javascript Console" },
  { value: "idleverse",    label: "Idleverse" },
  { value: "cortex",       label: "Cortex Baker" },
];

function targetOptions(selectedValue) {
  return UPGRADE_TARGETS.map(t =>
    `<option value="${t.value}"${t.value === selectedValue ? " selected" : ""}>${t.label}</option>`
  ).join("");
}

function addUpgradeCard(data = {}) {
  upgradeCount++;
  const id = upgradeCount;

  const card = document.createElement("div");
  card.className = "upgrade-card";
  card.dataset.upgradeId = id;

  card.innerHTML = `
    <div class="upgrade-card-header">
      <span class="upgrade-card-title">Upgrade #${id}</span>
      <button class="btn-remove" data-remove="${id}">Remove</button>
    </div>
    <div class="upgrade-grid">
      <div class="field-group">
        <label for="upg-name-${id}">Name</label>
        <input type="text" id="upg-name-${id}" value="${data.name || ""}" placeholder="Double Grandmas" />
      </div>
      <div class="field-group">
        <label for="upg-cost-${id}">Cost (cookies)</label>
        <input type="number" id="upg-cost-${id}" value="${data.cost || 1000}" min="0" step="100" />
      </div>
      <div class="field-group">
        <label for="upg-target-${id}">Affects</label>
        <select id="upg-target-${id}" style="width:100%;padding:8px 10px;font-size:13px;border:1px solid #d4d4d4;border-radius:3px;background:#fafafa;">
          ${targetOptions(data.target || "global_cps")}
        </select>
      </div>
      <div class="field-group">
        <label for="upg-mult-${id}">Multiplier</label>
        <input type="number" id="upg-mult-${id}" value="${data.multiplier || 2}" min="0" step="0.1" />
      </div>
      <div class="field-group" style="grid-column:1/-1;">
        <label for="upg-desc-${id}">Flavour Text</label>
        <input type="text" id="upg-desc-${id}" value="${data.desc || ""}" placeholder="Doubles grandma output." />
      </div>
    </div>
  `;

  document.getElementById("upgrades-list").appendChild(card);

  card.querySelector(`[data-remove="${id}"]`).addEventListener("click", () => {
    card.remove();
  });
}

function getUpgrades() {
  const cards = document.querySelectorAll(".upgrade-card");
  return Array.from(cards).map(card => {
    const i = card.dataset.upgradeId;
    return {
      name:       document.getElementById(`upg-name-${i}`)?.value || "Upgrade",
      cost:       parseFloat(document.getElementById(`upg-cost-${i}`)?.value) || 0,
      target:     document.getElementById(`upg-target-${i}`)?.value || "global_cps",
      multiplier: parseFloat(document.getElementById(`upg-mult-${i}`)?.value) || 1,
      desc:       document.getElementById(`upg-desc-${i}`)?.value || "",
    };
  });
}

function resetUpgrades() {
  document.getElementById("upgrades-list").innerHTML = "";
  upgradeCount = 0;
}
