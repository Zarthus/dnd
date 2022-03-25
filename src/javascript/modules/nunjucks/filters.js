const fs = require('fs')

exports.json_parse = function (file) {
    const res = fs.readFileSync(file)
    console.log('compiled json: ' + file)
    return JSON.parse(res.toString())
}

exports.nl2br = function (str) {
    if (typeof str === 'string') {
        return str.replace("\n", "<br>\n")
    }
    let s = ''
    for (const item of str) {
        s += item + "<br>\n"
    }
    return s
}

exports.empty = function (item) {
    if (typeof item === 'object') {
        return Object.keys(item).length === 0
    }
    return item.length === 0
}

exports.classify = function (elements, prefix) {
    if (typeof elements === 'string') {
        return prefix + elements.toLowerCase().replace(/[^a-z]+/g, '-')
    }

    let result = '';
    for (const str of elements) {
        result += prefix + str.toLowerCase().replace(/[^a-z]+/g, '-') + ' '
    }
    return result;
}


exports.pretty = function (res) {
    return require('pretty')(res)
}

exports.debug = function (value) {
    console.log(typeof value, value)
}

exports.keys = function (obj) {
    return Object.keys(obj || {}).toString()
}
