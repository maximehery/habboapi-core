var fs = require('fs');

if(process.argv[2] == '--dev')
{
    console.log('Development Mode');

    if(!fs.existsSync('./src/config/config.ts')) console.log('Configuration not found');

    require('ts-node/register');
    require('./src/main');
}
else
{
    if(!fs.existsSync('./src/config/config.ts'))
    {
        require('@habboapi/setup');
        return;
    }
    else
    {
        require('./dist/main');
    }
}