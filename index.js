var fs = require('fs');

if(!fs.existsSync('./src/config/config.ts')) return require('@habboapi/setup/setup');

if(process.argv[2] == '--dev')
{
    require('ts-node/register');
    require('./src/main');
}