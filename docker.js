var exports = module.exports;
var fs = require("fs");
//Load required modules
var colors = require('colors');

//Set the colour scheme
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

//Define instance variables
var dockerfile = "";

exports.from = function (image){
    //Check if not null
    if (image == null){
        console.log("Invalid FROM instruction".error);
        process.exit(1);
    }

    //Trim the string
    image = image.trim();
    if (image == ""){
        console.log("Invalid FROM instruction".error);
        process.exit(1);
    }

    //Add the from line to the dockerfile
    dockerfile = dockerfile + "FROM " + image + "\n";
}

exports.maintainer = function (maintainer){
    //Check if not null
    if (maintainer == null){
        console.log("Invalid MAINTAINER instruction".error);
        process.exit(1);
    }

    //Trim the string
    maintainer = maintainer.trim();
    if (maintainer == ""){
        console.log("Invalid MAINTAINER instruction".error);
        process.exit(1);
    }

    //Add the from line to the dockerfile
    dockerfile = dockerfile + "MAINTAINER " + maintainer + "\n";
}

exports.run = function (process){
    //Check if process is null or has an empty length
    if (process == null || process.length == 0){
        console.log("Invalid RUN instruction".error);
        process.exit(1);
    }

    //Loop through the run commands and create a command string
    var command = "[";
    for (var i = 0; i < process.length; i++){
        if (i != 0){
            command = command + ",\"" + process[i] + "\"";
        } else {
            command = command + "\"" + process[i] + "\"";
        }
    }
    command = command + "]";

    //Add the command string to the docker file
    dockerfile = dockerfile + "RUN " + command + "\n";
}

exports.cmd = function (process){
    //Check if process is null or has an empty length
    if (process == null || process.length == 0){
        console.log("Invalid CMD instruction".error);
        process.exit(1);
    }

    //Loop through the run commands and create a command string
    var command = "[";
    for (var i = 0; i < process.length; i++){
        if (i != 0){
            command = command + ",\"" + process[i] + "\"";
        } else {
            command = command + "\"" + process[i] + "\"";
        }
    }
    command = command + "]";

    //Add the command string to the docker file
    dockerfile = dockerfile + "CMD " + command + "\n";
}

exports.entrypoint = function (process){
    //Check if process is null or has an empty length
    if (process == null || process.length == 0){
        console.log("Invalid ENTRYPOINT instruction".error);
        process.exit(1);
    }

    //Loop through the run commands and create a command string
    var command = "[";
    for (var i = 0; i < process.length; i++){
        if (i != 0){
            command = command + ",\"" + process[i] + "\"";
        } else {
            command = command + "\"" + process[i] + "\"";
        }
    }
    command = command + "]";

    //Add the command string to the docker file
    dockerfile = dockerfile + "ENTRYPOINT " + command + "\n";
}

exports.expose = function (port){
    //Check if port is not null
    if (port == null || isNumber(port) == false || port <= 0){
        console.log("Invalid EXPOSE port".error);
        process.exit(1);
    }

    //Add the port to the dockerfile
    dockerfile = dockerfile + "EXPOSE " + port + "\n";
}

function isNumber(obj) { return !isNaN(parseFloat(obj)) }

exports.env = function (key, value){
    //Check that key and value are not null
    if (key == null){
        console.log("ENV key is invalid".error);
        process.exit(1);
    }

    if (value == null){
        console.log("ENV value is invalid".error);
        process.exit(1);
    }

    key = key.toString();
    value = value.toString();
    key = key.trim();
    value = value.trim();

    if (key == ""){
        console.log("ENV key is invalid".error);
        process.exit(1);
    }

    if (value == ""){
        console.log("ENV value is invalid".error);
        process.exit(1);
    }

    //Add the key and value to the docker file
    dockerfile = dockerfile + "ENV " + key + " " + value + "\n";

}

exports.add = function (src, dst){
    //Check that source and destination are not null
    if (src == null){
        console.log("ADD source is invalid".error);
        process.exit(1);
    }

    if (dst == null){
        console.log("ADD destination is invalid".error);
        process.exit(1);
    }

    src = src.trim();
    dst = dst.trim();

    if (src == ""){
        console.log("ADD source is invalid".error);
        process.exit(1);
    }

    if (dst == ""){
        console.log("ADD destination is invalid".error);
        process.exit(1);
    }

    //Add the key and value to the docker file
    dockerfile = dockerfile + "ADD " + src + " " + dst + "\n";
}

exports.copy = function (src, dst){
    //Check that source and destination are not null
    if (src == null){
        console.log("COPY source is invalid".error);
        process.exit(1);
    }

    if (dst == null){
        console.log("COPY destination is invalid".error);
        process.exit(1);
    }

    src = src.trim();
    dst = dst.trim();

    if (src == ""){
        console.log("COPY source is invalid".error);
        process.exit(1);
    }

    if (dst == ""){
        console.log("COPY destination is invalid".error);
        process.exit(1);
    }

    //Add the key and value to the docker file
    dockerfile = dockerfile + "COPY " + src + " " + dst + "\n";
}

exports.workdir = function (workdir){
    //Check if not null
    if (workdir == null){
        console.log("Invalid WORKDIR instruction".error);
        process.exit(1);
    }

    //Trim the string
    workdir = workdir.trim();
    if (workdir == ""){
        console.log("Invalid WORKDIR instruction".error);
        process.exit(1);
    }

    //Add the from line to the dockerfile
    dockerfile = dockerfile + "WORKDIR " + workdir + "\n";
}

exports.build = function (args){
    //Create the argument array
    arguments = [];
    arguments[0] = "build";
    arguments = arguments.concat(args);
    arguments.push(".");

    //Save the dockerfile to file
    fs.writeFileSync("Dockerfile", dockerfile);

    //Run the docker build command
    console.info("Sending the generated Dockerfile to the docker dameon".info);
    var docker = require('child_process').spawn('docker', arguments);
        docker.stdout.on('data', function (data){
          console.log(data.toString().data);
        });

        docker.stderr.on('data', function (data) {
          console.log(data.toString().data);
        });

        docker.on('close', function (code) {
         console.info("Done".info);
        });

}

exports.dockerFile = function (){
    return dockerfile;
}
