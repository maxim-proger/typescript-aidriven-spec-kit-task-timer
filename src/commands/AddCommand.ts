import { StorageService } from '../services/StorageService';
import { Task } from '../models/Task';
import { randomUUID } from 'crypto';

export class AddCommand {
    constructor(private storage: StorageService) {}

    execute(name: string): void {
        const data = this.storage.read();

        const task: Task = {
            id: randomUUID(),
            name,
            createdAt: new Date().toISOString(),
        };

        data.tasks.push(task);
        this.storage.write(data);

        console.log(`✅ Task added: "${name}" (id: ${task.id})`);
    }
}