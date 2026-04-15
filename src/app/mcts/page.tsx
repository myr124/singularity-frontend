import { VisualizerWorkspace } from "~/components/visualizer-workspace";
import { api } from "~/trpc/server";

export default async function MctsPage() {
  const run = await api.run.current();

  return <VisualizerWorkspace run={run} taskId="arc" />;
}