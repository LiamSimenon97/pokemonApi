// importData.command.ts
import * as yargs from 'yargs';
import { importData } from './importPokemon';
 
yargs
  .command({
    command: 'import-data',
    describe: 'Import data from an external API',
    builder: {
      nameOrId: {
        describe: 'Name of the data to import',
        demandOption: true,
        type: 'string',
      }
    },
    handler: (argv) => {
      importData(argv.nameOrId);
    },
  })
  .argv;