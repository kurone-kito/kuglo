/** Pair of selector and string values. */
interface IKeyPressSelectors {
  keyPress: string;
  selector: string;
}

export interface IBackstopScenarioOptions {
  /** import cookies in JSON format (available with default onBeforeScript see setting cookies below) */
  cookiePath: string;

  /** Click the specified DOM element prior to screen shot. */
  clickSelector: string;

  /** *Puppeteer only* takes array of selectors -- simulates multiple sequential click interactions. */
  clickSelectors: string[];

  /** Wait for x milliseconds */
  delay: number;

  /** Array of selectors set to visibility: hidden */
  hideSelectors: string[];

  /** Move the pointer over the specified DOM element prior to screen shot. */
  hoverSelector: string;

  /** *Puppeteer only* takes array of selectors -- simulates multiple sequential hover interactions. */
  hoverSelectors: string[];

  /** @deprecated */
  keyPressSelector?: IKeyPressSelectors;

  /** Takes array of selector and string values -- simulates multiple sequential keypress interactions. */
  keyPressSelectors: IKeyPressSelectors[];

  /** Percentage of different pixels allowed to pass test */
  misMatchThreshold: number;

  /** Used to set up browser state e.g. cookies. */
  onBeforeScript: string;

  /** After the above conditions are met -- use this script to modify UI state prior to screen shots e.g. hovers, clicks etc. */
  onReadyScript: string;

  /** Wait for a selector after interacting with hoverSelector or clickSelector (optionally accepts wait time in ms. Idea for use with a click or hover element transition. available with default onReadyScript) */
  postInteractionWait: number;

  /** Wait until this string has been logged to the console. */
  readyEvent: string;

  /** Wait until this selector exists before continuing. */
  readySelector: string;

  /** Specify a different state or environment when creating reference. */
  referenceUrl: string;

  /** Array of selectors set to display: none */
  removeSelectors: string[];

  /** If set to true -- any change in selector size will trigger a test failure. */
  requireSameDimensions: boolean;

  /** Scrolls the specified DOM element into view prior to screen shot (available with default onReadyScript) */
  scrollToSelector: string;

  /** If you want BackstopJS to find and take screenshots of all matching selector instances then there is a handy switch for that. */
  selectorExpansion: boolean;

  /** Array of selectors to capture. Defaults to document if omitted. Use "viewport" to capture the viewport size. */
  selectors: string[];
}

export interface IBackstopScenario extends Partial<IBackstopScenarioOptions> {
  /** Tag saved with your reference images. */
  label: string;
  /** The url of your app state. */
  url: string;
}
