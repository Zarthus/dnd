const fs = require('fs');
const path = require('path');
const pathing = require('../nunjucks/pathing');

function ls() {
    const elems = fs.readdirSync(pathing.dungeonpath, { withFileTypes: true });
    const files = [];

    elems.forEach((val) => {
        if (!val.isDirectory()) {
            return;
        }
        if (val.name === '_template') {
            return;
        }

        if (fs.existsSync(path.join(pathing.dungeonpath, val.name, 'dungeon.json'))) {
            files.push(val.name);
        }
    });

    return files;
}

function parse(dungeonName) {
    const dungeonDir = path.join(pathing.dungeonpath, dungeonName);
    const file = path.join(dungeonDir, 'dungeon.json');

    const rawDungeon = fs.readFileSync(file);
    console.log(`preprocessing dungeon: ${file}`);

    const dungeon = JSON.parse(rawDungeon.toString());

    dungeon.npcs.forEach((npc, pos) => {
        const npcfile = path.join(dungeonDir, 'npcs', npc.$ref);
        const rawNpc = fs.readFileSync(npcfile);
        console.log(` -> preprocessing dungeon npc: ${npc.$ref}`);
        dungeon.npcs[pos] = JSON.parse(rawNpc.toString());
    });

    dungeon.monsters.forEach((monster, pos) => {
        const mfile = path.join(dungeonDir, 'monsters', monster.$ref);
        const rawMst = fs.readFileSync(mfile);
        console.log(` -> preprocessing dungeon monster: ${monster.$ref}`);
        dungeon.monsters[pos] = JSON.parse(rawMst.toString());
    });
    return dungeon;
}

function build(out_dir) {
    const dungeonPath = pathing.dungeonpath;
    const dungeons = ls();

    dungeons.forEach((dungeonName) => {
        console.log(`Packaging ${dungeonName}`);

        const dungeon = parse(dungeonName);
        const copy = [];

        if (typeof dungeon.banner !== 'undefined' && dungeon.banner !== null && fs.existsSync(path.join(dungeonPath, dungeonName, dungeon.banner))) {
            copy.push({ name: 'banner', from: path.join(dungeonPath, dungeonName, dungeon.banner), to: path.join(out_dir, dungeonName, dungeon.banner) });
        }

        dungeon.maps.forEach((map) => {
            const mapurl = map.url.replace('./maps', '');
            const mapfile = path.join(dungeonPath, dungeonName, 'maps', mapurl);

            copy.push({ name: map.name, from: mapfile, to: path.join(out_dir, dungeonName, 'maps', mapurl) });
        });

        dungeon.resources.forEach((res) => {
            const resurl = res.url.replace('./resources', '');
            const resfile = path.join(dungeonPath, dungeonName, 'resources', resurl);

            copy.push({ name: res.name, from: resfile, to: path.join(out_dir, dungeonName, 'resources', resfile) });
        });

        try {
            fs.mkdirSync(path.join(out_dir, dungeonName, 'maps'), { recursive: true });
        } catch (err) { /** ignore */ }
        try {
            fs.mkdirSync(path.join(out_dir, dungeonName, 'resources'), { recursive: false });
        } catch (err) { /** ignore */ }

        fs.writeFileSync(path.join(out_dir, dungeonName, 'dungeon.json'), JSON.stringify(dungeon, null, '  '));
        copy.forEach((cpy) => {
            fs.copyFileSync(cpy.from, cpy.to);
        });
    });
}

exports.ls = ls;
exports.parse = parse;
exports.build = build;
