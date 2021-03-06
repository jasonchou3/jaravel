function replaceAll(str, from, to) {
    return str.replace(new RegExp(from, 'gm'), to)
}

function processPackageFile(content) {
    const config = require('../framework/package.json');
    content = content.replace(/"billow-js": ".*"/, `"billow-js": "^${config.version}"`)
    return content;
}

function ergodicDir(path) {
    const files = fs.readdirSync(rootPath + path);
    files.map(file => {
        if(file === 'node_modules')
            return;

        const currentPath = path + '/' + file;
        const state = fs.statSync(rootPath + currentPath);
        if (state.isDirectory()) {
            const templateDir = templatePath + currentPath;
            mkdirp.sync(templateDir);
            ergodicDir(currentPath);
        } else {
            const templateFile = templatePath + currentPath;
            const srcFile = rootPath + currentPath;

            // console.log(templateFile)
            // console.log(srcFile)
            let content = fs.readFileSync(srcFile, 'utf8');
            content = replaceAll(content, '\'.*/framework/src/', '\'billow-js/');

            if (file === 'package.json') {
                content = processPackageFile(content)
            }

            fs.writeFileSync(templateFile, content);
        }
    })
}


function rimraf(dir_path) {
    if (fs.existsSync(dir_path)) {
        fs.readdirSync(dir_path).forEach(function (entry) {
            const entry_path = path.join(dir_path, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                rimraf(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });
        fs.rmdirSync(dir_path);
    }
}

// ============================================================

const fs = require('fs');
const path = require('path');
const rootPath = __dirname + '/../src';
const mkdirp = require('mkdirp');

const templatePath = __dirname + '/template';

rimraf(templatePath);
mkdirp.sync(templatePath);

ergodicDir('');

