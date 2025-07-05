# How a 15% fare cut exposed Ghana’s commuter chaos

![Project Screenshot](images/kasoa.jpg)

**Author:** Charles Sarpong Amponsah  
**Project Type:** Scroll-driven visual story with Mapbox GL JS  
**Live Version:** [View the project here](https://ksarpongg.github.io/fare-cut-scroll/)  
**WordPress Embed:** [Embedded version](https://www.gbcghanaonline.com/features/fare-cut-millions/2025/)

---

## 🎯 Overview

In 2025, Ghana announced a 15% reduction in public transport fares to ease the burden of rising fuel prices. But on the ground, commuters experienced something different: fare manipulation, unapproved route changes, and a broken enforcement system.

This scroll-driven visual story combines satellite imagery, live map transitions, and commuter testimony to expose the real cost of a fare cut that never reached most passengers.

---

## 🚍 What the Visualisation Shows

- Satellite route from **Kasoa** to **Circle**, segmented into fare manipulation hotspots
- Sticky, animated Mapbox scenes that reveal:
  - Where the announced fare cut was ignored
  - How routes were unofficially shortened mid-journey
  - Visual markers of every key bus stop along the route
- Field photos
  - An interactive journey where the map responds to the story

---

## 🧰 Tools & Technologies

- **Mapbox GL JS v2.15**
- **Scrollama.js** for scroll-triggered map animations
- **HTML, CSS, JavaScript**
- Satellite screenshots captured and matched to commuter routes

---

## Access Token Safety

This project uses a **restricted Mapbox access token** safely embedded in `config.js`. 

To ensure the token is not misused:
- The token is restricted by URL in the Mapbox dashboard (`https://ksarpongg.github.io/*`)
- It only grants minimal permissions (`styles:read`) needed for map display
- No sensitive or write-access scopes are included

While `secrets.js` was used in local development to protect a full-access token, the public version no longer requires it.

✅ The token currently in use is safe for public projects.

---

## 📸 Credits

- All commuter interviews and photos by Charles Sarpong Amponsah  
- Mapping, animation, and web development by Charles Sarpong Amponsah  
- Inspired by visual storytelling formats from The San Francisco Chronicle and The Africa Report

---

## 🏆 Why This Project Matters

This project isn't just about transport. It’s about **accountability, enforcement, and survival** in an economy where policy doesn't always translate to lived experience.

It aims to elevate data-driven storytelling in Ghana and across Africa — blending maps, narrative, and evidence into an immersive reader journey.

---

## 📬 Contact

For collaborations, interviews, or media use:

**Email:** ksarpongg@gmail.com 
**Whatsapp:** +233244987043
**Twitter/X:** [@charamponsah](https://x.com/charamponsah)

---
