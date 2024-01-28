import * as yargs from 'yargs';
import { importData } from './importPokemon';
 
yargs
  .command({
    command: 'import-data',
    describe: 'Import pokemon data from an external API',
    builder: {
      nameOrId: {
        describe: 'Name or id of the pokemon to import',
        demandOption: true,
        type: 'string',
      }
    },
    handler: (argv) => {
      importData(argv.nameOrId);
    },
  })
  .argv;