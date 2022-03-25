const njk = require('nunjucks');
const paths = require('./pathing');
const filters = require('./filters');

function setupEnv() {
    const env = njk.configure(paths.htmlpath, { autoescape: true })

    const webroot = ''; // may be modified by ci
    const devmode = true;
    env.addGlobal('root_path', paths.rootpath)
    env.addGlobal('webroot', webroot)
    env.addGlobal('devmode', devmode)

    env.addFilter('json_parse', filters.json_parse)
    env.addFilter('classify', filters.classify)
    env.addFilter('nl2br', filters.nl2br)
    env.addFilter('empty', filters.empty)

    if (devmode) {
        env.addFilter('debug', filters.debug)
        env.addFilter('keys', filters.keys)
        env.addFilter('pretty', filters.pretty)
    }
    return env;
}

exports.env = setupEnv;
