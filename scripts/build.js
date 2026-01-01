#!/usr/bin/env node

import { execSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PKG_JSON_PATH = join(ROOT, "src/lib/moon.pkg.json");
const LIB_DIR = join(ROOT, "lib");

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: "inherit" });
}

function buildFormat(format) {
  console.log(`\nBuilding ${format.toUpperCase()}...`);

  // Read and modify moon.pkg.json
  const pkgJson = JSON.parse(readFileSync(PKG_JSON_PATH, "utf-8"));
  const originalFormat = pkgJson.link.js.format;
  pkgJson.link.js.format = format;
  writeFileSync(PKG_JSON_PATH, JSON.stringify(pkgJson, null, 2) + "\n");

  try {
    run("moon build --target js");

    // Copy output
    const outputDir = join(LIB_DIR, format);
    mkdirSync(outputDir, { recursive: true });

    const buildOutput = join(ROOT, "target/js/release/build/lib/lib.js");
    cpSync(buildOutput, join(outputDir, "index.js"));

    // Add package.json for CJS
    if (format === "cjs") {
      writeFileSync(
        join(outputDir, "package.json"),
        JSON.stringify({ type: "commonjs" }, null, 2) + "\n"
      );
    }
  } finally {
    // Restore original format
    pkgJson.link.js.format = originalFormat;
    writeFileSync(PKG_JSON_PATH, JSON.stringify(pkgJson, null, 2) + "\n");
  }
}

function copyTypes() {
  console.log("\nCopying type definitions...");
  const typesDir = join(LIB_DIR, "types");
  mkdirSync(typesDir, { recursive: true });
  cpSync(join(ROOT, "types/index.d.ts"), join(typesDir, "index.d.ts"));
}

function clean() {
  console.log("Cleaning lib directory...");
  rmSync(LIB_DIR, { recursive: true, force: true });
}

// Main
clean();
buildFormat("esm");
buildFormat("cjs");
copyTypes();

console.log("\nBuild complete!");
