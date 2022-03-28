const njk = require('nunjucks');
const paths = require('./pathing');
const filters = require('./filters');
const dnd_filters = require('./dnd-filters')

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
    env.addFilter('nl2br_desc', filters.nl2br_desc)
    env.addFilter('placeholder', filters.placeholder)
    env.addFilter('empty', filters.empty)
    env.addFilter('sort_by', filters.sort_by)
    env.addFilter('abbr_alignment', dnd_filters.abbr_alignment)
    env.addFilter('lookup_spell', dnd_filters.lookup_spell)
    env.addFilter('lookup_equipment', dnd_filters.lookup_equipment)
    env.addFilter('lookup_magic_item', dnd_filters.lookup_magic_item)
    env.addFilter('dungeon_ls', dnd_filters.dungeon_ls)
    env.addFilter('dungeon_parse', dnd_filters.dungeon_parse)

    if (devmode) {
        env.addFilter('debug', filters.debug)
        env.addFilter('keys', filters.keys)
        env.addFilter('pretty', filters.pretty)
    }
    return env;
}

exports.env = setupEnv;
