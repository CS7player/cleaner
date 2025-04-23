#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const { readFile } = require('./File');
const userCwd = process.cwd(); // where the user runs the command
const { argv } = process;

let scriptPath; // Declare it once here

if (arv[2] == "help") {
  try {
    const [figure] = await Promise.all([
      readFile(`./dog.txt`)
    ]);
    const image = `\u001b[${GC}m${figure}\u001b[0m`;
    const show = `${image}`;
    console.log(show);
  } catch (err) {
    console.log(err);
  }
  return
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
    console.log(`Script output:\n${stdout}`);
  }
  if (stderr) {
    console.error(`Script stderr:\n${stderr}`);
  }

  if (error) {
    console.error(`Script exited with code ${error.code}`);
    return;
  }

  console.log("✅ Script executed successfully.");
});
