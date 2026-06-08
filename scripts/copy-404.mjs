import { copyFileSync } from "fs";

// GitHub Pages serves 404.html for unknown routes — needed for client-side routing.
copyFileSync("dist/index.html", "dist/404.html");
