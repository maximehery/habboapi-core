var fs          = require('fs');
var inquirer    = require('inquirer');
var chalk       = require('chalk');
var ip          = require('ip');
var mysql2      = require('mysql2');

var settings = {};
var mysqlConnection;

console.log();
console.log(` 888    888          888      888                     d8888 8888888b. 8888888 `);
console.log(` 888    888          888      888                   d88P888 888    888  888   `);
console.log(` 8888888888  8888b.  88888b.  88888b.   .d88b.     d88P 888 888   d88P  888   `);
console.log(` 888    888     "88b 888 "88b 888 "88b d88""88b   d88P  888 8888888P"   888   `);
console.log(` 888    888 .d888888 888  888 888  888 888  888  d88P   888 888         888   `);
console.log(` 888    888 888  888 888 d88P 888 d88P Y88..88P d8888888888 888         888   `);
console.log(` 888    888 "Y888888 88888P"  88888P"   "Y88P" d88P     888 888       8888888 `);
console.log(` @habboapi/setup | v${process.env.npm_package_version} | by Billsonnn`);
console.log();

startInstallation();

function startInstallation()
{
    console.log(` Welcome to HabboAPI`);
    console.log(` It appears this is a new installation.`);
    console.log(` If not, HabboAPI is unable to find ${ chalk.bgWhite(chalk.black(` src/config/config.ts `)) } verify this files location and restart the server.`);
    console.log(` Otherwise, lets get started by configurating the system.`);
    console.log();
    console.log(` Please answer the following prompts, hit ${ chalk.bgWhite(chalk.black(` enter `)) } to use the default value.`);
    console.log();

    httpSettings();
}

function startOver()
{
    settings = {};

    console.log();
    httpSettings();
}

function httpSettings()
{
    console.log(` HTTP/S Settings`);
    console.log(` HTTP/S IP - This is the IP HabboAPI will be listenening on, typically your VPS IP.`);
    console.log(` HTTP/S Port - This is the port HabboAPI will be listening on, typically 80, if using HTTPS, 443.`);
    console.log(` HTTPS Enabled - True if using HTTPS, you need a private & public key. Place the .pem files (private.pem & public.pem) in the config folder.`);
    console.log();

    inquirer.prompt([
        {
            type: 'input',
            name: 'ip',
            message: 'HTTP/S IP',
            default: ip.address()
        },
        {
            type: 'input',
            name: 'port',
            message: 'HTTP/S Port',
            default: '80'
        },
        {
            type: 'input',
            name: 'httpsEnabled',
            message: 'HTTPS Enabled',
            default: 'false',
            validate: answer =>
            {
                if(answer == 'true' || answer == 'false') return true;
    
                return 'Must be true or false';
            }
        }
    ]).then(answers =>
    {
        console.log();

        if(answers.httpsEnabled == 'true')
        {
            var hasWarning = false;

            if(answers.port != '443')
            {
                hasWarning = true;
                console.log(` [WARNING] HTTPS should use port 443, you inputted: ${answers.port}.`);
            }

            if(!fs.existsSync(`./src/config/private.pem`) || !fs.existsSync(`./src/config/public.pem`))
            {
                hasWarning = true;
                console.log(` [WARNING] HTTPS is enabled but ${ chalk.bgWhite(chalk.black(` config/private.pem & config/public.pem `)) } could not be found.`);
            }

            if(hasWarning)
            {
                console.log();
                console.log(` To accept these warnings, please hit ${ chalk.bgWhite(chalk.black(` enter `)) } or type startover`);
                console.log();

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'accept',
                        message: 'Accept Warnings',
                        default: 'accept'
                    }
                ]).then(answer =>
                {
                    if(answer.accept == 'accept')
                    {
                        settings.http = answers;
    
                        console.log();
    
                        databaseSettings();

                        return;
                    }
                    else startOver();
                });
            }
        }
        else
        {
            settings.http = answers;

            databaseSettings();
        }
    });
}

function databaseSettings()
{
    console.log(` Database Settings`);
    console.log();

    inquirer.prompt([
        {
            type: 'input',
            name: 'host',
            message: 'MySQL Host',
            default: 'localhost'
        },
        {
            type: 'input',
            name: 'port',
            message: 'MySQL Port',
            default: '3306'
        },
        {
            type: 'input',
            name: 'username',
            message: 'MySQL Username',
            default: 'root'
        },
        {
            type: 'password',
            name: 'password',
            message: 'MySQL Password'
        },
        {
            type: 'input',
            name: 'database',
            message: 'MySQL Database'
        }
    ]).then(answers =>
    {
        mysqlConnection = mysql2.createConnection({
            host: answers.host,
            port: +answers.port,
            user: answers.username,
            password: answers.password,
            database: answers.database,
        });

        mysqlConnection.query('SELECT 1+1 AS solution', (err, results, fields) =>
        {
            if(err)
            {
                if(err.errno == 1045)
                {
                    console.log();
                    console.log(` [ERROR] Invalid database details, please try again.`);
                    console.log();
                    
                    databaseSettings();
                }
            }
            else
            {
                console.log();
                console.log(` [MySQL] Connection Established! Running installer SQL...`);

                settings.database = answers;

                console.log();

                emulatorSettings();

                /*
                connection.query(fs.readFileSync('./setup/database.sql').toString(), (err, results, fields) =>
                {
                    connection.end();

                    if(err)
                    {
                        console.log(err);
                        console.log(` [ERROR] Could not run database SQL`);
                    }
                    else
                    {
                        settings.database = answers;

                        console.log();

                        emulatorSettings();
                    }
                });*/
            }
        });
    });
}

function emulatorSettings()
{
    console.log(` Arcturus Settings`);
    console.log(` Arcturus IP - This is the IP Arcturus is listening on.`);
    console.log(` Arcturus Port - This is the port Arcturus is listening on.`);
    console.log(` Arcturus Rcon Port - This is the port Arcturus Rcon is listnening on.`);
    console.log();

    inquirer.prompt([
        {
            type: 'input',
            name: 'ip',
            message: 'Arcturus IP',
            default: ip.address()
        },
        {
            type: 'input',
            name: 'port',
            message: 'Arcturus Port',
            default: '3000'
        },
        {
            type: 'input',
            name: 'portRcon',
            message: 'Arcturus Rcon Port',
            default: '3001'
        }
    ]).then(answers =>
    {
        settings.emulator = answers;

        setSecret();
    });
}

function setSecret()
{
    var secret = require('crypto').randomBytes(256).toString('base64');

    settings.sessionSecret = secret;

    console.log();
    console.log(` Unique randomized session secret set.`);
    console.log();

    writeConfig();
}

function writeConfig()
{
    const configFile = `import { IConfig } from '@habboapi/common';

export const Config: IConfig = {
    http: {
        https: ${settings.http.httpsEnabled},
        ip: '${settings.http.ip}',
        port: ${settings.http.port}
    },
    database: {
        type: 'mysql',
        host: '${settings.database.host}',
        port: ${settings.database.port},
        username: '${settings.database.username}',
        password: '${settings.database.password}',
        database: '${settings.database.database}',
        entities: ['./node_modules/@habboapi/**/**.entity.js'],
        synchronize: false, // always leave false
        logging: false,
        logger: 'file'
    },
    session: {
        secret: '${settings.sessionSecret}'
    },
    emulator: {
        ip: '${settings.emulator.ip}',
        port: ${settings.emulator.port},
        portRcon: ${settings.emulator.portRcon},
        newUser: {
            maxAccountsPerIp: 3,
            rank: 1,
            look: 'wa-2001-3072.ch-220-66.hd-180-1.hr-3090-1398.lg-285-82.sh-305-92',
            gender: 'M',
            motto: 'Welcome to HabboAPI',
            credits: 0,
            duckets: 0,
            diamonds: 0,
            homeRoom: 0
        }
    },
    public: {
        name: 'HabboAPI'
    }
}`;

    fs.writeFile('./src/config/config.ts', configFile, err =>
    {
        if(err) return console.log(err);

        console.log('saved');

        //installDependencies();
    });
}

function installDependencies()
{
    require('child_process').exec(`npm i`, (error, stdout, stderr) =>
    {
        if(error) console.log(error); return;

        console.log(stdout);
    });
}