const fs = require('fs');

exports.json_parse = function (file) {
    const res = fs.readFileSync(file);
    console.log(`preprocessing json: ${file}`);
    return JSON.parse(res.toString());
};

exports.nl2br = function (str) {
    if (typeof str === 'string') {
        return str.replace('\n', '<br>\n');
    }
    let s = '';
    for (const item of str) {
        s += `${item}<br>\n`;
    }
    return s;
};

exports.nl2br_desc = function (str) {
    if (typeof str === 'string') {
        return str.replace('\n', '<br>\n');
    }
    let s = '';
    for (const item of str) {
        s += item;
    }
    return s;
};

exports.placeholder = function (img, height, width, bgcolor = null, fgcolor = '000000', format = 'png') {
    if (img !== null && typeof img !== 'undefined') {
        return img;
    }

    if (bgcolor === null) {
        const opts = [
            'ffffff', 'eeeeee', 'dddddd',
            '967096', '337a8a', '3a8c78',
            '4e9e23', 'd4a039', 'b03a3a',
            'ae3ab0', '9e4444', '3eaba0',
        ];

        bgcolor = opts[Math.floor((Math.random() * opts.length))];
    }

    return `https://dummyimage.com/${height}x${width}/${bgcolor}/${fgcolor}.png`;
};

exports.empty = function (item) {
    if (typeof item === 'undefined' || item === null) {
        return true;
    }
    if (typeof item === 'object') {
        return Object.keys(item).length === 0;
    }
    return item.length === 0;
};

exports.classify = function (elements, prefix) {
    if (typeof elements === 'string') {
        return prefix + elements.toLowerCase().replace(/[^a-z]+/g, '-');
    }

    let result = '';
    for (const str of elements) {
        result += `${prefix + str.toLowerCase().replace(/[^a-z]+/g, '-')} `;
    }
    return result;
};

exports.sort_by = function (elements, accessor) {
    if (typeof accessor === 'string') {
        accessor = [accessor];
    }
    const sortFunction = function (a, b) {
        for (const ac of accessor) {
            if ((typeof a[ac]) === 'undefined') {
                console.error(`Element does not have accessor: ${ac}`, a);
                continue;
            }
            if ((typeof b[ac]) === 'undefined') {
                console.error(`Element does not have accessor: ${ac}`, b);
                continue;
            }

            if (a[ac] > b[ac]) {
                return 1;
            }
            if (a[ac] < b[ac]) {
                return -1;
            }
        }

        return 0;
    };

    if (typeof elements === 'object') {
        return elements.sort(sortFunction);
    }

    return accessor;
};

exports.pretty = function (res) {
    return require('pretty')(res);
};

exports.debug = function (value) {
    console.log(typeof value, value);
};

exports.keys = function (obj) {
    return Object.keys(obj || {}).toString();
};
