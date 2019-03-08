/* eslint-disable no-underscore-dangle */
const fetch = require('node-fetch').default;
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

module.exports = async (page, scenario) => {
  const intercept = async (request, targetUrl) => {
    const requestUrl = request.url();

    // FIND TARGET URL REQUEST
    if (requestUrl === targetUrl) {
      const cookiesList = await page.cookies(requestUrl);
      const cookies = cookiesList
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ');
      const headers = Object.assign(request.headers(), { cookie: cookies });
      const options = {
        headers,
        body: request.postData(),
        method: request.method(),
        follow: 20,
        agent
      };

      const result = await fetch(requestUrl, options);

      const buffer = await result.buffer();
      const cleanedHeaders = result.headers._headers || {};
      cleanedHeaders['content-security-policy'] = '';
      await request.respond({
        body: buffer,
        headers: cleanedHeaders,
        status: result.status
      });
    } else {
      request.continue();
    }
  };

  await page.setRequestInterception(true);
  page.on('request', req => {
    intercept(req, scenario.url);
  });
};
