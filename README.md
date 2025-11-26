# Phone Preview helper (TK-STUDIO)

This workspace includes a lightweight static phone preview UI to help test mobile layouts locally.

Files added:
- `phoneview.html` — a small device-frame page that embeds `index.html` in an iframe and provides device presets, rotate, and custom sizes.
- `phoneview.css` / `phoneview.js` — helper styles and JS for the preview UI.
- `phoneview.start.ps1` — Windows PowerShell helper to start a temporary HTTP server and open the preview in your browser.

How to use (Windows):

1. Ensure you have Python installed and available on PATH (python or python3).
2. Open PowerShell in the project folder and run:

```powershell
.\phoneview.start.ps1
```

3. The script starts a local server on port 8000 and opens `http://127.0.0.1:8000/phoneview.html` in your default browser. Press Enter in the PowerShell window to stop the server.

Alternative: you can open `phoneview.html` directly in the browser without running a server; however, some browsers restrict features when using file:/// and an HTTP server is recommended.
