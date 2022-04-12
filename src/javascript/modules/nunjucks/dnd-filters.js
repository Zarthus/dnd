const dungeon = require('../dnd/dungeon');

exports.abbr_alignment = function (alignment) {
    let abbr = null;
    switch (alignment) {
    case 'LG': abbr = 'Lawful Good'; break;
    case 'NG': abbr = 'Neutral Good'; break;
    case 'CG': abbr = 'Chaotic Good'; break;
    case 'LN': abbr = 'Lawful Neutral'; break;
    case 'TN': abbr = 'True Neutral'; break;
    case 'CN': abbr = 'Chaotic Neutral'; break;
    case 'LE': abbr = 'Lawful Evil'; break;
    case 'NE': abbr = 'Neutral Evil'; break;
    case 'CE': abbr = 'Chaotic Evil'; break;
    }

    if (abbr === null) {
        return alignment;
    }

    return `<abbr title="${abbr}">${alignment}</abbr>`;
};

exports.lookup_spell = function (spell) {
    const urlsafe_spell = spell.toLowerCase()
        .replace(/[^a-z]+/g, '-')
        .replace(/--+/, '-');
    return `<a target="_blank" href="https://dndspellslist.com/spells/${urlsafe_spell}">${spell}</a>`;
};

exports.lookup_equipment = function (equipment) {
    const items = [];

    try {
        equipment.match(/{[^}]+}/g).forEach((e) => {
            items.push(e);
        });
    } catch (err) {
        return equipment;
    }

    let newEquipmentStr = equipment;
    for (const item of items) {
        const safe_item = item.replace('{', '').replace('}', '');
        const urlsafe_item = safe_item.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/--+/, '-');

        newEquipmentStr = newEquipmentStr.replace(item, `<a target="_blank" href="https://www.dndbeyond.com/equipment/${urlsafe_item}">${safe_item}</a>`);
    }
    return newEquipmentStr;
};

exports.lookup_magic_item = function (equipment) {
    const items = [];

    try {
        equipment.match(/_[^_]+_/g).forEach((e) => {
            items.push(e);
        });
    } catch (err) {
        return equipment;
    }

    let newEquipmentStr = equipment;
    for (const item of items) {
        const safe_item = item.replace(/_/g, '');
        const urlsafe_item = safe_item.toLowerCase()
            .replace(/[^a-z]+/g, '-')
            .replace(/--+/, '-');

        newEquipmentStr = newEquipmentStr.replace(item, `<a target="_blank" href="https://www.dndbeyond.com/magic-items/${urlsafe_item}">${safe_item}</a>`);
    }
    return newEquipmentStr;
};

exports.dungeon_ls = dungeon.ls;
exports.dungeon_parse = dungeon.parse;
