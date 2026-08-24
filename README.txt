Medication Timer PWA

Files:
- index.html
- manifest.webmanifest
- sw.js
- icon-192.png
- icon-512.png

Schedule encoded:
- Celebrex: 2 doses, 16 hours apart
- Oxy: 4 doses across a 16-hour first-to-last span = 5h20m spacing
- Tylenol: 4 doses across a 16-hour first-to-last span = 5h20m spacing
- Robaxin: 3 doses across a 16-hour first-to-last span = 8h spacing
- Zofran: 3 doses across a 16-hour first-to-last span = 8h spacing
- Aspirin: 2 doses, 16 hours apart
- Senna: one morning entry representing 2 tablets

iPhone install:
1. Host this folder on an HTTPS site (GitHub Pages, Cloudflare Pages, Netlify, etc.).
2. Open the HTTPS site in Safari on the iPhone.
3. Share -> Add to Home Screen.
4. Open from the Home Screen icon.
5. Tap Enable Alerts and allow notifications if offered.

Important iPhone limitation:
This fully local PWA can keep timers/history and can alert while it is running, but iOS does not provide a general-purpose API for a self-contained web app to schedule guaranteed future local notifications after the app is closed. Reliable closed-app reminders require Web Push infrastructure or a native app. Do not rely on the PWA alone for time-critical medication reminders.
