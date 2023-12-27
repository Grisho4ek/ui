const fs = require('fs');
const path = require('path');

const configPath = path.join(process.cwd(), 'tailwind.config.js');
const config = require(configPath);

config.purge.content.push('./node_modules/ui-grisha/**/*.{js,ts,jsx,tsx}');

fs.writeFileSync(
  configPath,
  `module.exports = ${JSON.stringify(config, null, 2)}`
);
