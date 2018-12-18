<p align="center">
    <a href="https://habboapi.com/" target="blank">
        <img src="https://assets.habboapi.com/habboapi.png" width="276" height="67" alt="HabboAPI Logo" />
    </a>
</p>

<p align="center">a modern restapi server written in <a href="https://www.typescriptlang.org" target="blank">typescript</a> for interacting with Arcturus Emulator</p>

## Description

<p>HabboAPI is a collection of packages that once put together, create secure restapi endpoints designed to interact with Arctrus Emulator.</p>

<p>Under the hood, HabboAPI is using the <a href="https://nestjs.com" target="_blank">NestJS</a> framework to easily create manageable, modular code. The system is designed around an Angular like dependency injection system. This allows for great code seperation, while easily injecting data from a seperate module.</p>

<p>HabboAPI has 4 main modules designed to be used together</p>

>    <a href="https://www.npmjs.com/package/@habboapi/common" title="@habboapi/common">@habboapi/common</a><br />
>    <a href="https://www.npmjs.com/package/@habboapi/emulator" title="@habboapi/emulator">@habboapi/emulator</a><br />
>    <a href="https://www.npmjs.com/package/@habboapi/habbo" title="@habboapi/habbo">@habboapi/habbo</a><br />
>    <a href="https://www.npmjs.com/package/@habboapi/security" title="@habboapi/security">@habboapi/security</a>
>
>    Each module has different dependencies while also relying on eachother.


## <a href="https://www.npmjs.com/package/@habboapi/common" title="@habboapi/common">@habboapi/common</a>

<p>@habboapi/common is our main module, it has no dependencies of other modules, but other modules may depend it.</p>

<p>The following is handled by this module</p>

> * BackupService
>    * Provides the ability to backup specified MySQL tables and save the data to a file.
> * ConfigService
>    * Provides the ability for modules to interact with the global configuration and use its values.
> * LogService
>    * Provides the ability to write to the built in logger which can save outputted data.
> * Database Initialization
>    * Initalizes the TypeORM system and registers all entities across the system.


## <a href="https://www.npmjs.com/package/@habboapi/emulator" title="@habboapi/emulator">@habboapi/emulator</a>

<p>@habboapi/emulator handles any direct connection to Arcturus Emulator as well as managing any of its settings.</p>

<p>The following is handled by this module</p>

> * EmulatorService
>    * Provides the ability to connect to Arcturus over a peristant connection that can watch and immediately notify if the server goes down.
> * RconService
>    * Provides the ability to send and recieve data from Arcturus Rcon.