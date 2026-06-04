import { StorageService } from '../services/StorageService';
import { TimeEntry } from '../models/TimeEntry';

export class StartCommand {
    constructor(private storage: StorageService) {}

    execute(taskId: string): void {
        const data = this.storage.read();

        const task = data.tasks.find(t => t.id === taskId);
        if (!task) {
            console.log(`❌ Task not found: ${taskId}`);
            return;
        }

        const running = data.entries.find(
            e => e.taskId === taskId && e.stoppedAt === null
        );
        if (running) {
            console.log(`⚠️ Timer already running for: "${task.name}"`);
            return;
        }

        const entry: TimeEntry = {
            taskId,
            startedAt: new Date().toISOString(),
            stoppedAt: null,
        };

        data.entries.push(entry);
        this.storage.write(data);

        console.log(`▶️ Timer started for: "${task.name}"`);
    }
}