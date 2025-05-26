const fs = require('fs');
const path = require('path');

const baseDir = 'J:\\dev_and_project\\tooling\\app\\tools';

function findClientPages(dir) {
    const result = [];

    const subdirs = fs.readdirSync(dir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

    for (const sub of subdirs) {
        const pagePath = path.join(dir, sub, 'page.tsx');
        if (fs.existsSync(pagePath)) {
            const content = fs.readFileSync(pagePath, 'utf-8');
//
            if (content.includes("use client") && content.includes("metadata") ) {
                result.push(sub);
            }
        }
    }

    return result;
}

const matches = findClientPages(baseDir);
console.log('Matched subdirectories:', matches);
