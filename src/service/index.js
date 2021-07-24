import auth from "./api/app/auth.service";
import user from "./api/app/user.service";
import board from "./api/app/board.service";
import card from "./api/app/card.service";
import list from "./api/app/list.service";
import dump from "./api/app/dump.service";

export { auth, user, board, list, card, dump };

// Using webpacks to pull all files in services folder & subfolder
const files = require.context(".", true, /\.js$/);
const services = {};

// Process and format filenames the way we want to reference them
// e.g. auth.service.js = auth (discarding .service.js)
files.keys().forEach((fileName) => {
  // Exclude this auto import file
  if (["./index.js"].includes(fileName)) return;

  // Take out trailing directory slashes and pick main module name
  let serviceName = fileName.slice(fileName.lastIndexOf("/") + 1);
  serviceName = serviceName.slice(0, serviceName.indexOf("."));

  // Load auto imported services into the services object
  services[serviceName] = files(fileName).default;
});
