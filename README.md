# Cartouche

Your name, in hieroglyphs — handcrafted Egyptian cartouche pendant customizer.

## About

**Cartouche** is an interactive web app that lets users create personalized Egyptian cartouche pendants. Type your name, and the app translates each letter into its hieroglyphic equivalent, rendering a preview of a pendant in gold or silver.

### Features

- **Name-to-hieroglyph translation** — each letter is mapped to its phonetic hieroglyph sound
- **Step-by-step builder** — write your name → pick design & metal → preview & order
- **Live pendant preview** — SVG-rendered cartouche that grows to fit the name length
- **Gold & silver options** — two polished metal finishes with realistic gradients
- **Shopping cart** — add multiple pendants and checkout
- **Pharaonic theme** — immersive ancient Egyptian visual experience with sandstone walls, dune parallax, carved hieroglyph dividers, and floating sand particles
- **Responsive design** — fully adapts to mobile with a bottom tab bar
- **Accessibility** — respects `prefers-reduced-motion`, proper ARIA labels, and keyboard navigation

## Tech Stack

- **HTML** — single-page app with hash-based view routing
- **CSS** — vanilla CSS with custom properties, two-layer theming (base + pharaonic skin)
- **JavaScript** — vanilla JS, no frameworks or build tools

## Project Structure

```
cartouche/
├── index.html            # Main app — markup, inline base styles, and app logic
├── pharaonic-theme.css   # Ancient Egyptian theme skin (scoped under html.ph)
├── pharaonic-theme.js    # Decorative layer builder (wall, dunes, sand, scroll reveal)
└── README.md
```

## Getting Started

No build step required. Just open `index.html` in a browser:

```bash
# Option 1: open directly
start index.html        # Windows
open index.html         # macOS

# Option 2: local server (avoids potential CORS issues with fonts)
npx serve .
```

## How It Works

1. **Write your name** — enter up to 10 characters; the app maps each letter to a Unicode Egyptian hieroglyph
2. **Pick design & metal** — choose an engraving style and select gold or silver
3. **Preview & order** — see the exact pendant with accurate length scaling, then add to cart

## Theme

The pharaonic theme (`html.ph` class) layers a rich ancient Egyptian atmosphere on top of the base dark-gold design:

- Sandstone wall texture with carved hieroglyph columns
- Radial sun glow and layered desert dunes with scroll parallax
- Floating sand particle animation
- Papyrus-textured cards with meander and lotus border patterns
- Cinzel Decorative typography and lapis lazuli accent wells
- Gold-engraved buttons with shimmer sweep on hover

Remove the `ph` class from `<html>` (or unlink the theme files) to revert to the base look.

## License

All rights reserved.
