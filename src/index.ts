import { StorageService } from './services/StorageService';
import { AddCommand } from './commands/AddCommand';
import { StartCommand } from './commands/StartCommand';
import { StopCommand } from './commands/StopCommand';
import { ReportCommand } from './commands/ReportCommand';

const storage = new StorageService();
const [,, command, ...args] = process.argv;

switch (command) {
    case 'add':
        new AddCommand(storage).execute(args.join(' '));
        break;
    case 'start':
        new StartCommand(storage).execute(args[0]);
        break;
    case 'stop':
        new StopCommand(storage).execute(args[0]);
        break;
    case 'report':
        new ReportCommand(storage).execute();
        break;
    default:
        console.log('Usage: ts-node src/index.ts <command> [args]');
        console.log('Commands: add <name> | start <id> | stop <id> | report');
}