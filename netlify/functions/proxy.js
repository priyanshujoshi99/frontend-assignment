const https = require('https');

exports.handler = async (event, context) => {
  // Log the incoming event for debugging
  console.log('Incoming request:', event);

  // Construct the URL by removing '/api' from the path
  const url = `https://raw.githubusercontent.com${event.path.replace(
    '/.netlify/functions/proxy',
    ''
  )}`;

  console.log('Request URL:', url);

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let data = '';

        // Collect data chunks
        response.on('data', (chunk) => {
          data += chunk;
        });

        // On end, handle the response
        response.on('end', () => {
          if (!data) {
            console.error('No data received from GitHub URL');
            return reject({
              statusCode: 500,
              body: 'No data received from GitHub URL'
            });
          }

          try {
            // Try to parse the data as JSON
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
            console.error('Error parsing JSON:', err.message);
            return reject({
              statusCode: 500,
              body: 'Error parsing JSON response'
            });
          }
        });
      })
      .on('error', (e) => {
        console.error('Error with the request:', e.message);
        reject({
          statusCode: 500,
          body: `Request failed: ${e.message}`
        });
      });
  });
};
