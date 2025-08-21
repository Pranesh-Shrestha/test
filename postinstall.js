const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const https = require('https');

console.log("=== Advanced Postinstall Simulation ===");

// Step 1: Conditional execution (simulate attacker logic)
const runSimulation = process.env.SAFE_SIM === "true";
if (!runSimulation) {
  console.log("Simulation skipped (env SAFE_SIM not set).");
  process.exit(0);
}

// Step 2: Simulate downloading a DLL (safe file from URL)
const dummyDllPath = path.join(__dirname, 'dummy.dll');
const fileUrl = 'https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore'; // safe sample file
https.get(fileUrl, (res) => {
  const fileStream = fs.createWriteStream(dummyDllPath);
  res.pipe(fileStream);
  fileStream.on('finish', () => {
    fileStream.close();
    console.log(`Downloaded safe dummy DLL from URL to: ${dummyDllPath}`);

    // Step 3: Read local file safely
    const packageJson = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8');
    console.log("Read package.json safely, first 100 chars:\n", packageJson.slice(0, 100));

    // Step 4: Simulate network exfiltration safely
    console.log("Simulate exfiltration: logging dummy data instead of sending real data.");
    const dummyToken = "FAKE_TOKEN_12345";
    console.log("Exfiltrated token (safe simulation):", dummyToken);

    // Step 5: Run harmless system command
    exec('echo Running system command safely...', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      console.log("=== Advanced Postinstall Simulation Complete ===");
    });
  });
});
