import { StorageService } from '../services/StorageService';

export class ReportCommand {
    constructor(private storage: StorageService) {}

    execute(): void {
        const data = this.storage.read();

        if (data.tasks.length === 0) {
            console.log('No tasks found.');
            return;
        }

        console.log('\n📊 Time Report\n');

        for (const task of data.tasks) {
            const entries = data.entries.filter(e => e.taskId === task.id);
            const totalMs = entries.reduce((sum, e) => {
                if (e.stoppedAt === null) return sum;
                return sum + (new Date(e.stoppedAt).getTime() - new Date(e.startedAt).getTime());
            }, 0);

            const minutes = Math.floor(totalMs / 60000);
            const seconds = Math.floor((totalMs % 60000) / 1000);

            console.log(`• ${task.name} (${task.id})`);
            console.log(`  Total time: ${minutes}m ${seconds}s\n`);
        }
    }
}