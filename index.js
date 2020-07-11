#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const core = require('./src/core.js');

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

/**
 * bundling script
 */
(async () => {

  core.scanFolder(animationFolder).then((files) => {

    let jsonFiles = core.filterFiles(files);

    jsonFiles.forEach((file) => {

      // [to consider] support key->file mapping
      let key = core.slugify(file);

      let animationData = require(animationFolder + file);
      animationData = core.processImages(animationData, key, config);

      // store in our bundle
      animationBundle[key] = animationData;
      // add to map reference
      animationBundleMap[key] = file;

    });

    // retrieve object template
    core.getTemplate(config.template).then((template) => {

      // insert data into template
      let output = template.replace(/\${bundle}/g, JSON.stringify(animationBundle))
                           .replace(/\${variable}/g, config.variable);
      let outputMap = JSON.stringify(animationBundleMap);

      core.writeOutput(config.output, output);
      core.writeOutput(config.output+'.map', outputMap);
      console.log('Animation data bundle generated in ' + config.output);

    });

  });

})();