// Localhost
// module.exports = [
//   {
//     context: [ '/**' ],
//     target: 'http://localhost:8080',
//     secure: false
//   }
// ]

//Railway
module.exports = [
  {
    context: [ '/api' ],
    target: 'https://miniproject01-production-9b75.up.railway.app',
    secure: true,
    changeOrigin: true,
    headers: {
      'X-Forwarded-Proto': 'https'
    }
  }
];
