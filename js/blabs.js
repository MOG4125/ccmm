// blabs.js — dynamic blab card management

let blabCount = 0;

function addBlabCard(data = "") {
  blabCount++;
  const id = blabCount;

  const card = document.createElement("div");
  card.className = "blab-card";
  card.dataset.blabId = id;

  const input = document.createElement("input");
  input.type = "text";
  input.id = "blab-" + id;
  input.className = "blab-input";
  input.value = data;
  input.placeholder = "A witty one-liner…";

  const btn = document.createElement("button");
  btn.className = "btn-remove-blab";
  btn.textContent = "×";
  btn.addEventListener("click", () => {
    card.remove();
  });

  card.appendChild(input);
  card.appendChild(btn);
  document.getElementById("blabs-list").appendChild(card);
}

function getBlabs() {
  const cards = document.querySelectorAll(".blab-card");
  return Array.from(cards).map(card => {
    const i = card.dataset.blabId;
    return document.getElementById("blab-" + i)?.value.trim() || "";
  }).filter(b => b !== "");
}

function resetBlabs() {
  document.getElementById("blabs-list").innerHTML = "";
  blabCount = 0;
}
