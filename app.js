#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const { readFile } = require('./File');
const userCwd = process.cwd(); // where the user runs the command
const { argv } = process;

let scriptPath; // Declare it once here

// ✅ Fix 1: Typo - `arv` → `argv`
// ✅ Fix 2: Use an IIFE to handle `await` at top level
(async () => {
  if (argv[2] === "help") {
    try {
      const figure = await readFile(path.join(__dirname, 'dog.txt'), 'utf-8');
      const image = `\u001b[32m${figure}\u001b[0m`; // GC was undefined, so I used green (32) for now
      console.log(image);
    } catch (err) {
      console.error("Error reading help image:", err);
    }
    return;
  }

  if (argv[2] === "force") {
    scriptPath = path.join(__dirname, 'delete_branches.sh');
  } else {
    scriptPath = path.join(__dirname, 'remove_branches.sh');
  }

  console.log('Current working directory:', userCwd);
  console.log('Using script:', scriptPath);

  exec(`sh "${scriptPath}"`, { cwd: userCwd }, (error, stdout, stderr) => {
    if (stdout) {
      console.log(`\n📤 Script output:\n${stdout}`);
    }
    if (stderr) {
      console.error(`\n⚠️ Script stderr:\n${stderr}`);
    }
    if (error) {
      console.error(`\n❌ Script exited with code ${error.code}`);
      return;
    }

    console.log("\n✅ Script executed successfully.");
  });
})();
