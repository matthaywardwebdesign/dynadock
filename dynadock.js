#!/usr/bin/env node
/*
    dynadock is a tool for generating
    dynamic docker images to help cut down build times

    Running dynadock is easy
    ========================

    dynadock scripts args
*/

//Load required modules
var colors = require('colors');
var docker = require('./docker.js');

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

//Load the command line arguments
var args = process.argv;

//Check whether we were passed a script file name
var script = args[2];

if (script == null){
    console.log("No dynadock script specified".error);
    process.exit(1);
}

//Remove the first 3 arguments
args.splice(0, 3);

//Load the script as a module
var script = require(process.cwd() + "/" + script);

//Call the build function on the script
console.log("Running dynadock script".info);
script.build(docker, args);
