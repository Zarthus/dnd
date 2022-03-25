const { env } = require('./envs')
const compile = require('./compile')
const paths = require('./pathing');

exports.env = env;
exports.compile = compile.compile;
exports.compileDirectory = compile.walk;
exports.htmlpath = paths.htmlpath;
exports.compilepath = paths.compilepath;
