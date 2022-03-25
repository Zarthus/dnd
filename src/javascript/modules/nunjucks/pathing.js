const path = require('path');

const rootpath = path.join(__dirname, '..', '..', '..', '..')
const htmlpath = path.join(rootpath, 'src', 'html')
const compilepath = path.join(rootpath, 'src', 'html', 'pages')

exports.htmlpath = htmlpath;
exports.rootpath = rootpath;
exports.compilepath = compilepath;
