# Barry Playground (Android app)

1. Create a new GitHub repo and upload everything in this folder (keep `.github/workflows/build.yml`).
2. Open the repo's **Actions** tab -> **Build Android APK** -> **Run workflow** (it also runs on every push).
3. When it turns green, open the run and download **BarryPlayground-APK** -> unzip -> install `app-debug.apk`.

The build downloads Lua (Fengari), Python (Pyodide), three.js (3D Studio) and icons into the app,
so the runner, debugger and 3D Studio all work with no internet.
Still online-only: the YouTube/Spotify music links.
