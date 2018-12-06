var fs          = require('fs');
var inquirer    = require('inquirer');
var chalk       = require('chalk');
var ip          = require('ip');
var mysql2      = require('mysql2');

var settings = {};
var mysqlConnection;

var warningQuestions = [
    {
        type: 'list',
        name: 'accept',
        choices: ['ignore', 'start over'],
        message: 'Ignore Warnings',
        default: 'ignore'
    }
];

var httpQuestions = [
    {
        type: 'input',
        name: 'ip',
        message: 'IP',
        default: ip.address()
    },
    {
        type: 'input',
        name: 'port',
        message: 'Port',
        default: '80'
    },
    {
        type: 'list',
        name: 'https',
        message: 'HTTPS',
        choices: ['true', 'false'],
        default: 'false'
    }
];

var databaseQuestions = [
    {
        type: 'input',
        name: 'host',
        message: 'Host',
        default: 'localhost'
    },
    {
        type: 'input',
        name: 'port',
        message: 'Port',
        default: '3306'
    },
    {
        type: 'input',
        name: 'username',
        message: 'Username',
        default: 'root'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Password'
    },
    {
        type: 'input',
        name: 'database',
        message: 'Database'
    }
];

var arcturusQuestions = [
    {
        type: 'input',
        name: 'ip',
        message: 'IP',
        default: ip.address()
    },
    {
        type: 'input',
        name: 'port',
        message: 'Port',
        default: '3000'
    },
    {
        type: 'input',
        name: 'portRcon',
        message: 'Rcon Port',
        default: '3001'
    },
    {
        type: 'list',
        name: 'watchEmulator',
        choices: ['true', 'false'],
        message: 'Watch Emulator',
        default: 'true'
    },
    {
        
        type: 'list',
        name: 'watchRcon',
        choices: ['true', 'false'],
        message: 'Watch Rcon',
        default: 'true'
    }
];

console.log();
console.log(` 888    888          888      888                     d8888 8888888b. 8888888 `);
console.log(` 888    888          888      888                   d88P888 888    888  888   `);
console.log(` 8888888888  8888b.  88888b.  88888b.   .d88b.     d88P 888 888   d88P  888   `);
console.log(` 888    888     "88b 888 "88b 888 "88b d88""88b   d88P  888 8888888P"   888   `);
console.log(` 888    888 .d888888 888  888 888  888 888  888  d88P   888 888         888   `);
console.log(` 888    888 888  888 888 d88P 888 d88P Y88..88P d8888888888 888         888   `);
console.log(` 888    888 "Y888888 88888P"  88888P"   "Y88P" d88P     888 888       8888888 `);
console.log(` @habboapi by Billsonnn`);
console.log();

startInstallation();

function startInstallation()
{
    console.log(chalk.cyan(` Welcome to HabboAPI`));
    console.log(chalk.cyan(` It appears this is a new installation.`));
    console.log(chalk.cyan(` If not, HabboAPI is unable to find ${ chalk.white(`./src/config/config.ts`) } verify this files location and restart the server.`));
    console.log(chalk.cyan(` Otherwise, lets get started by configurating the system.`));
    console.log();
    console.log(chalk.cyan(` Please answer the following prompts, hit ${ chalk.white(`enter`) } to use the default value.`));
    console.log();

    httpSettings();
}

function startOver()
{
    if(mysqlConnection) mysqlConnection.close();

    settings = {};

    console.log();
    httpSettings();
}

function httpSettings()
{
    console.log(chalk.cyan(` HTTP Settings`));
    console.log(`   IP - This is the IP HabboAPI will be listening on, typically your VPS IP.`);
    console.log(`   Port - This is the port HabboAPI will be listening on, typically 80, if using HTTPS, 443.`);
    console.log(`   HTTPS - True if using HTTPS, you need a private & public key. Place the .pem files (private.pem & public.pem) in the config folder.`);
    console.log();

    inquirer.prompt(httpQuestions).then(answers =>
    {
        console.log();

        var hasWarning = false;

        if(answers.https == 'true')
        {
            if(answers.port != '443')
            {
                hasWarning = true;
                console.log(chalk.red(` [WARNING] HTTPS should use port 443, you inputted: ${answers.port}.`));
            }

            if(!fs.existsSync(`./src/config/private.pem`) || !fs.existsSync(`./src/config/public.pem`))
            {
                hasWarning = true;
                console.log(chalk.red(` [WARNING] HTTPS is enabled but ${ chalk.white(`./src/config/private.pem & ./src/config/public.pem`) } could not be found.`));
            }
        }
        
        if(hasWarning)
        {
            console.log();
            console.log(` To ignore these warnings, select ${ chalk.white(`ignore`) } below, or you can start over.`);
            console.log();

            inquirer.prompt(warningQuestions).then(answer =>
            {
                if(answer.accept == 'start over')
                {
                    startOver();
                    return;
                }
                
                settings.http = answers;

                console.log();

                databaseSettings();
            });
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
    console.log(chalk.cyan(` Database Settings`));
    console.log(`   These settings should match up with your emulator. HabboAPI will not run independently of it.`);
    console.log();

    inquirer.prompt(databaseQuestions).then(answers =>
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
                console.log();
                console.log(chalk.red(` [ERROR] Unable to connect to MySQL, please try again.`));
                console.log();
                
                databaseSettings();
            }
            else
            {
                console.log();
                console.log(chalk.green(` [MySQL] Connection Established!`));

                settings.database = answers;

                console.log();

                emulatorSettings();
            }
        });
    });
}

function emulatorSettings()
{
    console.log(chalk.cyan(` Arcturus Settings`));
    console.log(`   IP - This is the IP Arcturus is listening on.`);
    console.log(`   Port - This is the port Arcturus is listening on.`);
    console.log(`   Rcon Port - This is the port Arcturus Rcon is listnening on.`);
    console.log(`   Watch Emulator - Enabling this option will have HabboAPI maintain a perisistant connection to the emulator to watch its status.`);
    console.log(`   Watch Rcon - Enabling this option will have HabboAPI maintain a perisistant connection to the rcon server to watch its status.`);
    console.log();

    inquirer.prompt(arcturusQuestions).then(answers =>
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

function runSQL()
{
    mysqlConnection.query(fs.readFileSync(__dirname + './database.sql').toString(), (err, results, fields) =>
    {
        mysqlConnection.end();

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
    });
}

function writeConfig()
{
    const configFile = `import { IConfig } from '@habboapi/common';

export const Config: IConfig = {
    http: {
        https: ${ settings.http.https },
        ip: '${ settings.http.ip }',
        port: ${ settings.http.port }
    },
    database: {
        type: 'mysql',
        host: '${ settings.database.host }',
        port: ${ settings.database.port },
        username: '${ settings.database.username }',
        password: '${ settings.database.password }',
        database: '${ settings.database.database }',
        entities: ['./node_modules/@habboapi/**/*.entity.js', './node_modules/@habboapi/**/**/*.entity.js', './src/**/*.entity.ts', './src/**/**/*.entity.ts', './dist/**/*.entity.js', './dist/**/**/*.entity.js'],
        synchronize: false, // always leave false
        logging: false,
        logger: 'file'
    },
    session: {
        secret: '${ settings.sessionSecret }'
    },
    emulator: {
        ip: '${ settings.emulator.ip }',
        port: ${ settings.emulator.port },
        portRcon: ${ settings.emulator.portRcon },
        watchEmulator: ${ settings.emulator.watchEmulator },
        watchRcon: ${ settings.emulator.watchRcon },
        newUser: {
            maxAccountsPerIp: 3,
            rank: 1,
            look: 'wa-2001-3072.ch-220-66.hd-180-1.hr-3090-1398.lg-285-82.sh-305-92',
            gender: 'M',
            motto: 'Welcome to HabboAPI',
            credits: 0,
            homeRoom: 0,
            currencies: [
                { type: 0, amount: 0 }, // duckets
                { type: 5, amount: 0} // diamonds
            ]
        }
    },
    public: {
        name: 'HabboAPI'
    }
}`;

    if(!fs.existsSync('./src'))
    {
        console.log(chalk.red(` [ERROR] ${ chalk.white(`./src`) } doesn't exist. This folder and the contents in it are required to run HabboAPI. Please create this directory and try again.`));

        mysqlConnection.close();
        process.exit();
    }

    if(!fs.existsSync('./src/config'))
    {
        fs.mkdirSync('./src/config');
    }

    fs.writeFile('./src/config/config.ts', configFile, err =>
    {
        if(err) console.log(chalk.red(` [ERROR] Unable to write the configuration file.`));
        else console.log(chalk.green(` Configuration Saved!`));

        mysqlConnection.close();
        process.exit();
    });
}