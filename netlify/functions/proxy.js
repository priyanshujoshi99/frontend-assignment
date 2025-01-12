const https = require('https');

exports.handler = async (event, context) => {
  const url = `https://raw.githubusercontent.com${event.path.replace(
    '/api',
    ''
  )}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          resolve({
            statusCode: 200,
            body: data,
            headers: { 'Content-Type': 'application/json' }
          });
        });
      })
      .on('error', (e) => {
        reject({
          statusCode: 500,
          body: e.message
        });
      });
  });
};
