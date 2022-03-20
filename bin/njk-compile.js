const njk = require('nunjucks')
const pretty = require('pretty')
const fs = require('fs')
const path = require('path')

const htmlpath = path.join(__dirname, '..', 'src', 'html')
njk.configure(htmlpath, { autoescape: true })

function compile(fpath, file) {
    njk.render(path.join(fpath, file), function (err, res) {
        const html = pretty(res, {ocd: true})

        if (err) {
            console.log(err.toString());
            return;
        }

        const outpath = path.join(__dirname, '..', 'public', fpath.replace(path.join(htmlpath, 'pages'), ''))
        // console.log(' => ' + outpath);

        fs.mkdirSync(outpath, { recursive: true })
        fs.writeFile(path.join(outpath, file.replace('njk', 'html')), html, { flag: 'w+' }, function (err) {
            if (err) {
                console.log(' => fwrite: ' + err)
            }
        });
    });
}

function walk(filepath) {
    fs.readdir(filepath, { withFileTypes: true },function (err, files) {
        if (err) {
            return console.log('err: ' + err);
        }

        for (const file of files) {
            const fpath = path.join(filepath, file.name)

            if (file.isDirectory()) {
                walk(fpath)
            } else {
                //console.log('compile ' + fpath)
                compile(filepath, file.name)
            }
        }
    });
}

walk(path.join(htmlpath, 'pages'))
