# CCMM - Cookie Clicker Mod Builder

A no-code mod builder for Cookie Clicker. Fill in the form, click **Export Mod**, and paste the generated JavaScript into your mod file.

## Hosting on GitHub Pages

1. Create a new GitHub repository (e.g. `ccmm`).
2. Upload all files, keeping the folder structure:
   ```
   index.html
   css/style.css
   js/buildings.js
   js/upgrades.js
   js/export.js
   js/app.js
   README.md
   ```
3. Go to **Settings > Pages** in your repository.
4. Under **Source**, select `main` branch and `/ (root)`.
5. Save. GitHub will give you a URL like `https://yourusername.github.io/ccmm/`.

## Using your exported mod

1. Export your mod from CCMM.
2. Save the code as `main.js`.
3. Create a `info.txt` alongside it:
   ```
   name:[Your Mod Name]
   id:[your-mod-id]
   version:1.0.0
   author:Your Name
   description:Your description here.
   ```
4. Zip both files together.
5. In Cookie Clicker, go to **Options > Mods > Import a mod** and load the zip.

## File structure

| File | Purpose |
|---|---|
| `index.html` | App shell and all panels |
| `css/style.css` | All styling |
| `js/buildings.js` | Building list and multiplier inputs |
| `js/upgrades.js` | Dynamic upgrade card management |
| `js/export.js` | Mod code generation |
| `js/app.js` | Navigation, events, and initialisation |
