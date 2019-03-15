import { Story } from '@storybook/react';

/** Definition of component interactions scenario. */
export type IInteractions = unknown;

/** Definition of TOC. */
export interface ITOC {
  /** Story kind of Storybook data. */
  kind: string;
  /** Story name of Storybook data. */
  name: string;
  /** Interactions definition for BackstopJS. */
  interactions: IInteractions;
}

/** Interface of Storybook module. */
export interface IStories {
  /** Current definition of Storybook data. */
  default: Story;
  /** Interactions definition for BackstopJS. */
  interactions: IInteractions;
}
