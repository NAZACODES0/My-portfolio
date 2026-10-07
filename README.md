# Onyisi Chinaza: Portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Structure
```
portfolio/
├── index.html          page content and SEO tags
├── styles.css          all styles; colours are variables at the top
├── projects.js         YOUR PROJECTS AND SKILLS (edit this most)
├── main.js             theme, menu, filter, form, ProjectCard component
├── favicon.svg
└── README.md
```

## Run locally
Open `index.html` in a browser, or for a local server run `npx serve` (or VS Code "Live Server") in this folder.

## Add a project
Open `projects.js`, copy one block in `PROJECTS`, change the values, set `soon: false`, and add `live` and `github` URLs. New categories (Game, ML) get a filter button automatically. For a real thumbnail, put an image beside `projects.js` and add `image: "name.png"`.

## Change colours and content
- Accent colour: `--accent` at the top of `styles.css` (keep white text readable on it).
- Light and dark palettes: the `[data-theme=...]` blocks.
- Text: edit `index.html`. Skills: `SKILLS` in `projects.js`.
- Fonts: the Google Fonts link in `index.html` and `--font-d` / `--font-b` in `styles.css`.

## Contact form
1. Create a free form at formspree.io and copy the form ID.
2. In `index.html`, replace `YOUR_FORM_ID` in the form `action`.

## Deploy
- **Vercel / Netlify:** push the folder to GitHub, import the repo, leave build command empty and publish directory as the root.
- **GitHub Pages:** push to a repo, then Settings > Pages > deploy from `main` / root.
After deploying, replace `YOUR-SITE.vercel.app` in the Open Graph tags and add an `og-image.png` (1200x630) in the project root.

## Your checklist
- [x] Add your photo (`photo.jpg`) to the About section
- [ ] Check bio, education dates (I assumed 2025 start) and course list
- [ ] Confirm skills in `SKILLS` (I added HTML, CSS, JavaScript, Git and GitHub as guesses; remove any you're not comfortable with)
- [ ] Replace the 3 placeholder projects
- [ ] Add your Formspree form ID
- [ ] Add a resume PDF and a link to it, if you want one
- [ ] Update Open Graph URL and image after deploying
- [ ] Run Lighthouse in Chrome DevTools and check at 360px, 768px, 1280px
