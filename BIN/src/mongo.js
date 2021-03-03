let path = require("path");
let { exec, argv, initCwd } = require("lib");

let dockerName = "mongo-dev";
let usr = process.env.MONGO_INITDB_ROOT_USERNAME || "root";
let pwd = process.env.MONGO_INITDB_ROOT_PASSWORD || "rei";

exports.mongo_start = (cb) => {
  let cd = initCwd;
  let dd = path.join(cd, ".data", dockerName);

  exec(`
        docker run --rm -d
        --name ${dockerName}
        -p 27017:27017
        -w /work
        -v ${cd}:/work
        -v ${dd}:/data/db
        -e MONGO_INITDB_ROOT_USERNAME=${usr}
        -e MONGO_INITDB_ROOT_PASSWORD=${pwd}
        -e MONGODB_DATABASE=dlhk
        mongo:latest
    `);
  cb();
};

exports.mongo_stop = (cb) => {
  exec(`
        docker stop ${dockerName}
    `);
  cb();
};

exports.mongo_shell = (cb) => {
  exec(`
        docker exec -it ${dockerName}
        mongo --host localhost -u ${usr} -p ${pwd}
        ${argv}
    `);
  cb();
};
