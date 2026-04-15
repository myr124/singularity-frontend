import { notFound } from "next/navigation";

import { VisualizerWorkspace } from "~/components/visualizer-workspace";
import { getAllTasks, getTaskConfig } from "~/lib/tasks/registry";

export function generateStaticParams() {
  return getAllTasks().map((task) => ({ task: task.id }));
}

type PageProps = {
  params: Promise<{ task: string }>;
};

export default async function TaskVisualizerPage({ params }: PageProps) {
  const { task: taskId } = await params;
  const task = getTaskConfig(taskId);
  if (!task) notFound();

  const run = task.getData();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <VisualizerWorkspace run={run as any} taskId={taskId} />;
}