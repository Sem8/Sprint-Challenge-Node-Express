// play this: https://www.youtube.com/watch?v=d-diB65scQU  // yarn server
// code away! //   yarn add express    yarn add nodemon --dev
 const server = require('./server.js');

 server.listen(4000, () => {
     console.log('\n* Server Running on port 4000 *\n');
 });

