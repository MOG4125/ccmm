// bookmarklets.js — Cookie Clicker web bookmarklet generator

function generateBookmarkletCode() {
  const cursorCps   = num("cursor-cps", 1);
  const cursorClick = num("cursor-click", 1);

  const buildingMults = getBuildingMultipliers();

  const gcFreq     = num("gc-freq", 1);
  const gcDuration = num("gc-duration", 1);
  const gcReward   = num("gc-reward", 1);
  const gcFrenzy   = num("gc-frenzy", 1);

  const globalCps        = num("global-cps", 1);
  const startingCookies  = num("starting-cookies", 0);
  const disableWrinklers = gv("toggle-wrinklers");
  const lockSeason       = gv("toggle-seasons");
  const customJs         = gv("custom-js") || "";

  const upgrades = getUpgrades();
  const blabs    = getBlabs();

  // Build the init code as a single minified string
  let initCode = "";

  // Cursor multipliers
  if (cursorCps !== 1 || cursorClick !== 1) {
    if (cursorCps !== 1) {
      initCode += `Game.Objects["Cursor"].storedCps*=${cursorCps};`;
    }
    if (cursorClick !== 1) {
      initCode += `var _origMouseCps=Game.computedMouseCps;Game.computedMouseCps=function(){return _origMouseCps.call(this)*${cursorClick};};`;
    }
  }

  // Building multipliers
  const nonDefaultBuildings = Object.entries(buildingMults).filter(([, v]) => v !== 1);
  const buildingNameMap = {
    cursor: "Cursor", grandma: "Grandma", farm: "Farm", mine: "Mine",
    factory: "Factory", bank: "Bank", temple: "Temple",
    wizardtower: "Wizard Tower", shipment: "Shipment",
    alchemylab: "Alchemy Lab", portal: "Portal",
    timemachine: "Time Machine", antimatter: "Antimatter Condenser",
    prism: "Prism", chancemaker: "Chancemaker",
    fractal: "Fractal Engine", javascript: "Javascript Console",
    idleverse: "Idleverse", cortex: "Cortex Baker",
  };
  nonDefaultBuildings.forEach(([id, mult]) => {
    const name = buildingNameMap[id] || id;
    initCode += `if(Game.Objects["${name}"])Game.Objects["${name}"].storedCps*=${mult};`;
  });

  // Golden cookie tweaks
  if (gcFreq !== 1) {
    initCode += `Game.goldenCookieMod=${gcFreq};Game.registerHook("logic",function(){for(var i in Game.shimmers){var s=Game.shimmers[i];if(s.type==="golden"&&!s.ccmmFixed){s.maxTime=s.maxTime*Game.goldenCookieMod;s.ccmmFixed=true;}}});`;
  }
  if (gcDuration !== 1) {
    initCode += `Game.shimmer.prototype.life=(Game.shimmer.prototype.life||13)*${gcDuration};`;
  }
  if (gcReward !== 1) {
    initCode += `var _origEarn=Game.Earn;Game.Earn=function(n){return _origEarn.call(this,n*${gcReward});};`;
  }
  if (gcFrenzy !== 1) {
    initCode += `var _origBuffTime=Game.gainBuff;Game.gainBuff=function(type,time,arg){if(type==="frenzy")time*=${gcFrenzy};return _origBuffTime.call(this,type,time,arg);};`;
  }

  // Global CPS
  if (globalCps !== 1) {
    initCode += `Game.cookiesPs*=${globalCps};`;
  }

  // Starting cookies
  if (startingCookies > 0) {
    initCode += `if(Game.cookies<${startingCookies}){Game.cookies=${startingCookies};}`;
  }

  // Disable wrinklers
  if (disableWrinklers) {
    initCode += `Game.registerHook("logic",function(){for(var i in Game.wrinklers){Game.wrinklers[i].type=1;Game.wrinklers[i].phase=0;}});`;
  }

  // Lock season
  if (lockSeason) {
    initCode += `Game.season="";Game.seasonT=0;`;
  }

  // Upgrades
  if (upgrades.length > 0) {
    const targetNameMap = {
      global_cps: null, click: null,
      cursor: "Cursor", grandma: "Grandma", farm: "Farm", mine: "Mine",
      factory: "Factory", bank: "Bank", temple: "Temple",
      wizardtower: "Wizard Tower", shipment: "Shipment",
      alchemylab: "Alchemy Lab", portal: "Portal",
      timemachine: "Time Machine", antimatter: "Antimatter Condenser",
      prism: "Prism", chancemaker: "Chancemaker",
      fractal: "Fractal Engine", javascript: "Javascript Console",
      idleverse: "Idleverse", cortex: "Cortex Baker",
    };

    upgrades.forEach((u, idx) => {
      const safDesc = (u.desc || "").replace(/"/g, '\\"');
      const safUpgName = u.name.replace(/"/g, '\\"');
      const upgId = safeName(u.name) + "_" + idx;

      initCode += `var ${upgId}=new Game.Upgrade("${safUpgName}","${safDesc}",${u.cost});${upgId}.buyFunction=function(){`;

      if (u.target === "global_cps") {
        initCode += `Game.cookiesPs*=${u.multiplier};`;
      } else if (u.target === "click") {
        initCode += `var _origMC=Game.computedMouseCps;Game.computedMouseCps=function(){return _origMC.call(this)*${u.multiplier};};`;
      } else {
        const buildingName = targetNameMap[u.target] || u.target;
        initCode += `if(Game.Objects["${buildingName}"])Game.Objects["${buildingName}"].storedCps*=${u.multiplier};`;
      }

      initCode += `};`;
    });
  }

  // Blabs
  if (blabs.length > 0) {
    const blabArray = blabs.map(b => `"${b.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`).join(",");
    initCode += `var ccmmBlabs=[${blabArray}];ccmmBlabs.forEach(function(msg){if(Game.goldenCookieBlabMessages&&Game.goldenCookieBlabMessages.indexOf(msg)===-1){Game.goldenCookieBlabMessages.push(msg);}});`;
  }

  // Custom JS
  if (customJs.trim()) {
    initCode += customJs.replace(/\s+/g, " ");
  }

  // Build the full bookmarklet - standard format without full URL encoding
  // We only need to escape newlines and some special chars for the bookmark URL field
  const bookmarklet = "javascript:(function(){" + initCode + "})();";

  return bookmarklet;
}

function updateBookmarkletPreview() {
  const code = generateBookmarkletCode();
  const preview = document.getElementById("bookmarklet-code");
  if (preview) {
    preview.value = code;
  }
}
