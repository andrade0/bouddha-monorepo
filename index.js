#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const script = require('./src/script');

const CONFIG_FILE = '.bouddha-monorepo';

function readConfig() {
  const configPath = path.join(process.cwd(), CONFIG_FILE);
  if (!fs.existsSync(configPath)) {
    console.error(`Configuration file ${CONFIG_FILE} not found.`);
    process.exit(1);
  }
  
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  validateConfig(config);
  return config;
}

function validateConfig(config) {
  const requiredFields = ['libsPath', 'packagesPath', 'packages', 'libs'];
  requiredFields.forEach(field => {
    if (!config[field]) {
      console.error(`Configuration error: missing field '${field}'.`);
      process.exit(1);
    }
  });

  // Additional nested structure checks
  config.packages.forEach(pkg => {
    if (!pkg.name || !pkg.libsPath || !pkg.type) {
      console.error('Configuration error: each package must have a name, libsPath, and type.');
      process.exit(1);
    }
  });

  config.libs.forEach(lib => {
    if (!lib.name || !lib.type) {
      console.error('Configuration error: each lib must have a name and type.');
      process.exit(1);
    }
  });
}

function checkGitIgnore(config) {
  const gitIgnorePath = path.join(process.cwd(), '.gitignore');
  if (!fs.existsSync(gitIgnorePath)) {
    console.warn('.gitignore file not found. Proceeding without check.');
    return;
  }

  const gitIgnoreContent = fs.readFileSync(gitIgnorePath, 'utf8');
  config.packages.forEach(pkg => {
    const libsPath = path.join(pkg.libsPath);
    if (!gitIgnoreContent.includes(libsPath)) {
      console.error(`Git ignore check failed: '${libsPath}' must be included in .gitignore.`);
      process.exit(1);
    }
  });
}

// Read and validate the configuration
const config = readConfig();

// Check .gitignore
checkGitIgnore(config);

// Run the main script
script.run(config);

