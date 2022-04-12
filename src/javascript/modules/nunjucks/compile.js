const path = require('path');
const pretty = require('pretty');
const fs = require('fs');
const { env } = require('./envs');
const { rootpath, compilepath } = require('./pathing');

function compile(fpath, file) {
    env().render(path.join(fpath, file), (err, res) => {
        const html = pretty(res, { ocd: true });

        if (err) {
            console.log(err.toString());
            return;
        }

        const outpath = path.join(rootpath, 'public', fpath.replace(compilepath, ''));
        // console.log(' => ' + outpath);

        fs.mkdirSync(outpath, { recursive: true });
        fs.writeFile(path.join(outpath, file.replace('njk', 'html')), html, { flag: 'w+' }, (err) => {
            if (err) {
                console.log(` => fwrite: ${err}`);
            }
        });
    });
}

function walk(filepath) {
    fs.readdir(filepath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return console.log(`err: ${err}`);
        }

        for (const file of files) {
            const fpath = path.join(filepath, file.name);

            if (file.isDirectory()) {
                walk(fpath);
            } else {
                // console.log('compile ' + fpath)
                compile(filepath, file.name);
            }
        }
    });
}

exports.compile = compile;
exports.walk = walk;
