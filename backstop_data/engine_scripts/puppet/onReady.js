/* eslint-disable global-require */
module.exports = async (page, scenario) => {
  console.log(`SCENARIO > ${scenario.label}`);
  await require('./clickAndHoverHelperAsync')(page, scenario);
};
