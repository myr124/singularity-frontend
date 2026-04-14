import { VisualizerWorkspace } from "~/components/visualizer-workspace";
import { api } from "~/trpc/server";

export default async function HomePage() {
  const run = await api.run.current();

  return <VisualizerWorkspace run={run} />;
}
