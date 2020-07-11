module.exports = {
  
  /**
   * folder to scan for animations (relative to ./)
   */
  srcFolder: 'animations',

  /**
   * template to use
   * script will look for ${bundle} to replace with bundled animations object
   */
  template: './src/_template.js',

  /**
   * variable name for iife
   */
  variable: 'bmAnimations',

  /**
   * 
   */
  imagePrefix: null,

  /**
   * 
   */
  imageDomain: null,

  /**
   * output file
   */
  output: './dist/output.js'

};