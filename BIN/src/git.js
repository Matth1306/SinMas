let { exec } = require("lib");

exports.git_update = (cb) => {
  exec("git fetch --recurse-submodules");
  exec("git pull --recurse-submodules");
  cb();
};
