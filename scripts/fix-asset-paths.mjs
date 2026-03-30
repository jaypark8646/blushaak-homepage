import { readdir, readFile, writeFile } from "fs/promises";
import { join, extname } from "path";

const BASE_PATH = "/blushaak-homepage";
const OUT_DIR = join(process.cwd(), "out");
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

async function fixPaths() {
  if (!isGithubActions) {
    console.log("Skipping asset path fixes outside GitHub Pages builds");
    return;
  }

  let count = 0;
  for await (const filePath of walk(OUT_DIR)) {
    const ext = extname(filePath);
    if (![".html", ".js", ".css", ".json", ".txt"].includes(ext)) continue;

    const content = await readFile(filePath, "utf-8");
    // Replace absolute paths to /images/, /fonts/, /favicon.ico, etc.
    // but NOT paths that already have the basePath prefix
    const fixed = content
      .replace(/(?<!")\/images\//g, `${BASE_PATH}/images/`)
      .replace(/(?<!")\/fonts\//g, `${BASE_PATH}/fonts/`)
      .replace(/"\/images\//g, `"${BASE_PATH}/images/`)
      .replace(/"\/fonts\//g, `"${BASE_PATH}/fonts/`)
      .replace(/['"]\/favicon\.ico['"]/g, `"${BASE_PATH}/favicon.ico"`);

    if (content !== fixed) {
      await writeFile(filePath, fixed, "utf-8");
      count++;
    }
  }
  console.log(`Fixed asset paths in ${count} files`);
}

fixPaths().catch(console.error);
