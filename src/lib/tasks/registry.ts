import type { TaskConfig } from "~/lib/tasks/types";
import { arcTask } from "~/lib/tasks/arc";
import { mathTask } from "~/lib/tasks/math";
import { templateTask } from "~/lib/tasks/template";
import { wordPuzzleTask } from "~/lib/tasks/word-puzzle";

const registry = new Map<string, TaskConfig<unknown, unknown>>();

function register<S, A>(task: TaskConfig<S, A>) {
  registry.set(task.id, task as TaskConfig<unknown, unknown>);
}

register(arcTask);
register(wordPuzzleTask);
register(mathTask);
register(templateTask);

export function getTaskConfig(id: string): TaskConfig<unknown, unknown> | undefined {
  return registry.get(id);
}

export function getAllTasks(): TaskConfig<unknown, unknown>[] {
  return Array.from(registry.values());
}