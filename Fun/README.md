# Steamworks Forge

A steampunk-themed full-stack console with animated mechanical gears and clockwork readings.

## Run locally

1. Open a terminal in `c:\Users\birdr\Downloads\Fun`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open `http://localhost:4000` in your browser.

## What it does

- Serves a neon-themed prank interface from the `public/` folder
- Uses an Express backend in `server.js`
- Generates silly April Fools messages via `/api/prank`

## Notes

- Customize prank lines in `server.js` under `prankMessages`
- Change styling in `public/style.css`
