const dungeons = require(`${__dirname}/../src/javascript/modules/dnd/dungeon.js`);
const path = require('path');

dungeons.build(path.join(__dirname, '..', 'public', 'resources', 'assets', 'dungeons'));
