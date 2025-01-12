const https = require('https');

exports.handler = async (event, context) => {
  // Construct the URL by removing '/api' from the path
  const url = `https://raw.githubusercontent.com${event.path.replace(
    '/.netlify/functions/proxy',
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
          if (!data) {
            return reject({
              statusCode: 500,
              body: 'No data received from GitHub URL'
            });
          }

          try {
            const jsonData = JSON.parse(data);
            resolve({
              statusCode: 200,
              body: JSON.stringify(jsonData),
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            });
          } catch (err) {
            return reject({
              statusCode: 500,
              body: 'Error parsing JSON response'
            });
          }
        });
      })
      .on('error', (e) => {
        reject({
          statusCode: 500,
          body: `Request failed: ${e.message}`
        });
      });
  });
};
