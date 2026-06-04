import { StorageService } from '../services/StorageService';

export class StopCommand {
    constructor(private storage: StorageService) {}

    execute(taskId: string): void {
        const data = this.storage.read();

        const task = data.tasks.find(t => t.id === taskId);
        if (!task) {
            console.log(`❌ Task not found: ${taskId}`);
            return;
        }

        const entry = data.entries.find(
            e => e.taskId === taskId && e.stoppedAt === null
        );
        if (!entry) {
            console.log(`⚠️ No running timer for: "${task.name}"`);
            return;
        }

        entry.stoppedAt = new Date().toISOString();
        this.storage.write(data);

        console.log(`⏹️ Timer stopped for: "${task.name}"`);
    }
}