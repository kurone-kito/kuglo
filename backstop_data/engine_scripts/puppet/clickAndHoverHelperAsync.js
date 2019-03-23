/** @typedef {import('puppeteer').Page} Page */
/** @typedef {import('../backstop').IBackstopScenario} IBackstopScenario */

/**
 * @param {T | T[]} source
 * @param {(item: T) => Promise<void>} func
 * @template T
 */
const doSequential = (source, func) =>
  (Array.isArray(source) ? [...source] : [source])
    .map(item => () => func(item))
    .reduce((prev, curr) => prev.then(curr), Promise.resolve());

/**
 * @param {Page} page
 * @param {IBackstopScenario} scenario
 */
module.exports = async (
  page,
  {
    clickSelectors,
    clickSelector,
    hoverSelector,
    hoverSelectors,
    keyPressSelectors,
    keyPressSelector,
    postInteractionWait,
    scrollToSelector
  }
) => {
  const click = clickSelectors || clickSelector;
  const hover = hoverSelectors || hoverSelector;
  const keypress = keyPressSelectors || keyPressSelector;

  if (keypress) {
    /** @param {string} selector */
    const fn = selector => {
      /** @type {HTMLInputElement} */
      const found = document.querySelector(selector);
      if (found.value) {
        found.value = '';
      }
    };
    await doSequential(keypress, async ({ keyPress, selector }) => {
      await page.waitFor(selector);
      await page.evaluate(fn, selector);
      await page.type(selector, keyPress);
    });
  }

  if (hover) {
    await doSequential(hover, async item => {
      await page.waitFor(item);
      await page.hover(item);
    });
  }

  if (click) {
    await doSequential(click, async item => {
      await page.waitFor(item);
      await page.click(item);
    });
  }

  if (postInteractionWait) {
    await page.waitFor(postInteractionWait);
  }

  if (scrollToSelector) {
    /** @param {string} selector */
    const fn = selector => document.querySelector(selector).scrollIntoView();
    await page.waitFor(scrollToSelector);
    await page.evaluate(fn, scrollToSelector);
  }
};
