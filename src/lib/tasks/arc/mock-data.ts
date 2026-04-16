import { runDatasetSchema } from "~/lib/tasks/arc/contracts";
import { getLs20Run } from "./ls20-run";

export function getMockRun() {
  return runDatasetSchema.parse(getLs20Run());
}
