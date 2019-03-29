import { Story } from '@storybook/react';

import { IBackstopScenarioOptions } from '../../backstop_data/engine_scripts/backstop';

/** Definition of component interactions scenario. */
export interface IInteraction extends Partial<IBackstopScenarioOptions> {
  /** Scenario name. */
  name: string;
}

/** Definition of TOC. */
export interface ITOC {
  /** Hash of interactions. */
  hash: string;
  /** Interactions definition for BackstopJS. */
  interaction: IInteraction;
  /** Path of Storybook data. */
  path: string;
}

/** Interface of Storybook module. */
export interface IStories {
  /** Current definition of Storybook data. */
  default: () => Story;
  /** Interactions definition for BackstopJS. */
  interactions?: IInteraction[];
}
