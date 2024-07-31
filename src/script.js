const ts = require('typescript');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const chokidar = require('chokidar');
const typeorm = require('typeorm');
const swagger = require('@nestjs/swagger');

function getDecoratorNamesFromModule(module) {
  return Object.keys(module).filter(key => {
    const exportItem = module[key];
    return typeof exportItem === 'function' && key.charAt(0) === key.charAt(0).toUpperCase();
  });
}

const BACKEND_DECORATORS = [
  ...getDecoratorNamesFromModule(typeorm),
  ...getDecoratorNamesFromModule(swagger)
];

const IMPORTS_TO_REMOVE = ['@nestjs/swagger', 'typeorm', '@faker-js/faker'];

function processFile(filePath) {
  // Your existing processFile function logic
}

function trimEmptyLines(content) {
  // Your existing trimEmptyLines function logic
}

function findAllFilesSync(directory, fileList = []) {
  // Your existing findAllFilesSync function logic
}

function copyDirSync(src, dest, projectType) {
  // Your existing copyDirSync function logic
}

function shouldCopyFile(fileName) {
  // Your existing shouldCopyFile function logic
}

function processDirectory(directory) {
  // Your existing processDirectory function logic
}

function processAppsDirectory(config) {
  config.packages.forEach(app => {
    const appPath = path.join(config.packagesPath, app.name);
    if (app.type === 'backend') {
      copyDirSync(config.libsPath, path.join(appPath, app.libsPath), app.type);
      const indexFilePath = path.join(appPath, app.libsPath, 'index.ts');
      let indexFileContent = fs.readFileSync(indexFilePath, 'utf8');
      config.libs.forEach((lib) => {
        if (lib.type === 'frontend') {
          indexFileContent = indexFileContent.replace(`export * from './${lib.name}';`, '');
        }
      });
      fs.writeFileSync(indexFilePath, indexFileContent, 'utf8');
    } else if (app.type === 'frontend') {
      copyDirSync(config.libsPath, path.join(appPath, app.libsPath), app.type);
      const indexFilePath = path.join(appPath, app.libsPath, 'index.ts');
      let indexFileContent = fs.readFileSync(indexFilePath, 'utf8');
      config.libs.forEach((lib) => {
        if (lib.type === 'backend') {
          indexFileContent = indexFileContent.replace(`export * from './${lib.name}';`, '');
        }
      });
      fs.writeFileSync(indexFilePath, indexFileContent, 'utf8');
      processDirectory(path.join(appPath, 'src/app/libs/models'));
      processDirectory(path.join(appPath, 'src/app/libs/dtos'));
    }
  });
  console.log('Reprocessing complete.');
}

function run(config) {
  const args = process.argv.slice(2);
  const shouldWatch = !args.includes('exec');

  processAppsDirectory(config);

  if (shouldWatch) {
    chokidar.watch(config.libsPath, { persistent: true }).on('change', (filePath) => {
      console.log(`${filePath} has been changed. Reprocessing...`);
      processAppsDirectory(config);
    });
  }
}

module.exports = { run };

