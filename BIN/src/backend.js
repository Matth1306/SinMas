let { exec, rootCwd } = require("lib");
let path = require("path");

let backendOptions = {
  cwd: path.resolve(rootCwd, "APP"),
  env: {
    SECRET: "code",
    DB_CONNECT: "mongodb://root:rei@localhost:27017",
  },
};

exports.backend_install = (cb) => {
  exec("npm install", backendOptions);
  cb();
};

exports.backend_start = (cb) => {
  exec("npm start", backendOptions);
  cb();
};
