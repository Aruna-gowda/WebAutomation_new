// utils/config.js
const fs = require('fs');
const ini = require('ini');

function loadConfig(env = 'default') {
    const configPath = './config/config.ini';
    if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file not found at ${configPath}`);
    }
    const config = ini.parse(fs.readFileSync(configPath, 'utf-8'));
    return config[env] || config['default'];
}

module.exports = { loadConfig };
