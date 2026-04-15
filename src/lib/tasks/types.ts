import type { ComponentType } from "react";

import type {
  ActionMetaRenderer,
  FramePreviewRenderer,
  NodePreviewRenderer,
  RunDataset,
  StateRenderer,
  TransitionRenderer,
} from "~/lib/mcts/types";

export interface TaskConfig<S, A> {
  id: string;
  name: string;
  description: string;
  getData: () => RunDataset<S, A>;
  StateView: ComponentType<Parameters<StateRenderer<S>>[0]>;
  TransitionView: ComponentType<
    Parameters<TransitionRenderer<S, A>>[0]
  >;
  NodeStatePreview: ComponentType<
    Parameters<NodePreviewRenderer<S>>[0]
  >;
  IterationPreview: ComponentType<
    Parameters<FramePreviewRenderer<S>>[0]
  >;
  ActionMeta: ComponentType<
    Parameters<ActionMetaRenderer<A>>[0]
  >;
  formatActionKey: (action: A) => string;
}