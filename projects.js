/* ============================================================
   EDIT THIS FILE to change your projects and skills.
   To add a project, copy one block, change the values, and save.
   category: "Web", "Mobile", "Game" or "ML" (filter buttons are built automatically)
   Leave live/github as "" if there is no link yet.
   Set soon: false when the project is real.
   hue: 0-360, sets the colour of the placeholder thumbnail.
   Optional: image: "my-project.png" replaces the placeholder (store it beside this file).
   ============================================================ */
const PROJECTS = [
  { title: "Project One", category: "Web", soon: true,
    description: "A full stack web app. Details coming soon.",
    tags: ["HTML", "CSS", "JavaScript"], live: "", github: "", hue: 255 },
  { title: "Project Two", category: "Mobile", soon: true,
    description: "A mobile app. Details coming soon.",
    tags: ["Mobile"], live: "", github: "", hue: 200 },
  { title: "Project Three", category: "Web", soon: true,
    description: "Another web project. Details coming soon.",
    tags: ["Web"], live: "", github: "", hue: 320 }
];

const SKILLS = {
  Web: ["Next.js + Tailwind CSS", "React + Vite + Tailwind", "HTML", "CSS", "JavaScript"],
  Mobile: ["React Native"],
  Tools: ["VS Code", "Git and GitHub", "Vercel", "Netlify"]
};
