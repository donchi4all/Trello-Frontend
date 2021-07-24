// Using webpacks to pull all files in modules folder & subfolder
const files = require.context(".", true, /\.js$/);
const modules = {};

// Process and format filenames the way we want to reference them in store
// e.g. auth.store.js = auth (discarding .store.js)
files.keys().forEach((fileName) => {
  // Exclude this auto import file
  if (fileName === "./index.js") return;

  // Take out trailing directory slashes and pick main module name
  let moduleName = fileName.slice(fileName.lastIndexOf("/") + 1);
  moduleName = moduleName.slice(0, moduleName.indexOf("."));

  // Load auto imported modules into the modules object
  modules[moduleName] = files(fileName).default;
});
export default modules;
