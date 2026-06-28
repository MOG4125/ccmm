// buildings.js — building definitions and grid renderer

const BUILDINGS = [
  { id: "cursor",      name: "Cursor" },
  { id: "grandma",     name: "Grandma" },
  { id: "farm",        name: "Farm" },
  { id: "mine",        name: "Mine" },
  { id: "factory",     name: "Factory" },
  { id: "bank",        name: "Bank" },
  { id: "temple",      name: "Temple" },
  { id: "wizardtower", name: "Wizard Tower" },
  { id: "shipment",    name: "Shipment" },
  { id: "alchemylab",  name: "Alchemy Lab" },
  { id: "portal",      name: "Portal" },
  { id: "timemachine", name: "Time Machine" },
  { id: "antimatter",  name: "Antimatter Condenser" },
  { id: "prism",       name: "Prism" },
  { id: "chancemaker", name: "Chancemaker" },
  { id: "fractal",     name: "Fractal Engine" },
  { id: "javascript",  name: "Javascript Console" },
  { id: "idleverse",   name: "Idleverse" },
  { id: "cortex",      name: "Cortex Baker" },
];

function renderBuildingsGrid() {
  const container = document.getElementById("buildings-list");
  container.innerHTML = "";

  BUILDINGS.forEach(b => {
    const item = document.createElement("div");
    item.className = "building-item";

    const label = document.createElement("label");
    label.setAttribute("for", "bld-" + b.id);
    label.textContent = b.name;

    const input = document.createElement("input");
    input.type = "number";
    input.id = "bld-" + b.id;
    input.value = "1";
    input.min = "0";
    input.step = "0.1";

    item.appendChild(label);
    item.appendChild(input);
    container.appendChild(item);
  });
}

function getBuildingMultipliers() {
  const result = {};
  BUILDINGS.forEach(b => {
    const val = parseFloat(document.getElementById("bld-" + b.id)?.value || "1");
    result[b.id] = isNaN(val) ? 1 : val;
  });
  return result;
}

function resetBuildings() {
  BUILDINGS.forEach(b => {
    const el = document.getElementById("bld-" + b.id);
    if (el) el.value = "1";
  });
}
