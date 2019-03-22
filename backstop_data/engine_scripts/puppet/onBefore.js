/* eslint-disable global-require */
module.exports = async (page, scenario) => {
  await require('./loadCookiesAsync')(page, scenario);
};
