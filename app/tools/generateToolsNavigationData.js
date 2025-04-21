const fs = require('fs');
const path = require('path');
const activeTools = require('../activeTools.json'); // Import activeTools.json

const basePath = __dirname;
const allItems = fs.readdirSync(basePath, { withFileTypes: true });

const directories = allItems
    .filter(item => item.isDirectory())
    .map(dir => {
        // Convert directory name to a nice title (e.g., 'ai-tools' becomes 'AI Tools')
        const name = dir.name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        // Find the description from activeTools.json based on the slug
        const tool = activeTools.find(tool => tool.slug === dir.name);
        const description = tool ? tool.description : "";  // Use description if exists, else leave it empty

        // Generate the object for each directory
        return {
            name: name,
            slug: dir.name,
            description: description  // Use description from activeTools.json
        };
    });

// Save the formatted data to toolsList.json in the parent directory
fs.writeFileSync(
    path.join(basePath, '../toolsList.json'),
    JSON.stringify(directories, null, 2)
);

console.log('Formatted directory data saved to toolsList.json');








// // save this as index.js (or any name)
// const fs = require('fs');
// const path = require('path');
// const activeTools = require('../activeTools.json');
//
//
// const basePath = __dirname;
// const allItems = fs.readdirSync(basePath, { withFileTypes: true });
//
// const directories = allItems
//     .filter(item => item.isDirectory())
//     .map(dir => dir.name);
//
// fs.writeFileSync(
//     path.join(basePath, '../availableTools.json'),
//     JSON.stringify(directories, null, 2)
// );
//
// console.log('Directory names saved to dirs.json');
