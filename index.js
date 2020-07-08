#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// configuration
const localConfigPath = './script.config.js';

let defaultConfig = require('./src/default.config.js');
let localConfig = {}
if (fs.existsSync(localConfigPath)) {
  localConfig = require(localConfigPath);
}
const config = Object.assign(defaultConfig, localConfig);

// preparation
const animationFolder = `./${config.srcFolder}/`;
const animationBundle = {};
const animationBundleMap = {};

// scan directory for json files
fs.readdir(animationFolder, (err, files) => {

  let animationFiles = files.filter(function (file) {
    return path.extname(file).toLowerCase() === '.json'
  });

  console.log('Files found: ' + animationFiles.length);

  animationFiles.forEach((file) => {
    // cleanup filename to generate key
    // [maybe] support key->file mapping
    let key = path.basename(file, path.extname(file))
      .toLowerCase()
      .replace(/[\W_]+/g, "");
    let animationData = require(animationFolder + file);
    animationBundle[key] = animationData;
    // map reference
    animationBundleMap[key] = file;
  });

  const jsonBundle = JSON.stringify(animationBundle);

  // output
  fs.readFile(config.template, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    let output = data.replace(/\${bundle}/g, jsonBundle);
    let outputMap = JSON.stringify(animationBundleMap);

    fs.writeFile(config.output, output, (err) => {
      if (err) throw err;
      // complete
      console.log('Animation data bundle generated in '+config.output);
    });

    fs.writeFile(config.output+'.map', outputMap, (err) => {
      if (err) throw err;
    });

  });

});
