const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

/**
 * returns list of files
 * @param {String} folder   path to read for files
 */
const scanFolder = async (folder) => {

  try {
    return fsPromises.readdir(folder);
  } catch (err) {
    throw err;
  }

}

/**
 * returns array of files that match extension
 * @param {Array} files         list of files
 * @param {String} extension    extension to keep
 */
const filterFiles = (files, extension = '.json') => {

  let jsonFiles = files.filter((file) => {
    return path.extname(file).toLowerCase() === extension
  });

  console.log('Files found: ' + jsonFiles.length);

  return jsonFiles;

}

/**
 * generates a slug/key
 * @param {String} file   filename 
 */
const slugify = (file) => {
  return path.basename(file, path.extname(file))
    .toLowerCase()
    .replace(/[\W_]+/g, "");
}

/**
 * looks for any png asset references and appends key to the file to minimize conflict
 * @param {Object} animationData 
 * @param {String} key 
 */
const processImages = (animationData, key, config) => {
  animationData.assets.forEach((asset) => {
    let asset_file = asset.p
    if (asset_file && path.extname(asset_file) === '.png') {
      let p = key + '-' + asset.p;
      // additional common prefix
      if(config.imagePrefix)
        p = config.imagePrefix + p;
      asset.p = p;
      // domain override
      if(config.imageDomain)
        asset.u = config.imageDomain;
    }
  });
  return animationData;
}

/**
 * 
 * @param {String} template 
 */
const getTemplate = async (template) => {

  try {
    return fsPromises.readFile(template, 'utf8');
  } catch(err) {
    throw err;
  }

}

const writeOutput = (file, output) => {

  fs.writeFile(file, output, (err) => {
    if (err) throw err;
  });

}

// exports
module.exports.scanFolder = scanFolder;
module.exports.filterFiles = filterFiles;
module.exports.slugify = slugify;
module.exports.processImages = processImages;
module.exports.getTemplate = getTemplate;
module.exports.writeOutput = writeOutput;