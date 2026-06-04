import * as fs from 'fs';
import * as path from 'path';
import { Task } from '../models/Task';
import { TimeEntry } from '../models/TimeEntry';

interface AppData {
    tasks: Task[];
    entries: TimeEntry[];
}

export class StorageService {
    private filePath: string;

    constructor() {
        this.filePath = path.join(process.cwd(), 'data.json');
    }

    read(): AppData {
        if (!fs.existsSync(this.filePath)) {
            return { tasks: [], entries: [] };
        }
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(raw) as AppData;
    }

    write(data: AppData): void {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
}