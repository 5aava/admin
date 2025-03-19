import express from 'express';
import path from 'path';
import next from 'next';
 
const port = process.env.SERVER_PORT || 3000;
const app = next({production: true});
const handle = app.getRequestHandler();

 
app.prepare().then(() => {

  const server = express();
  const __dirname = path.resolve();

  // Serve static files.
  server.use(express.static(path.join(__dirname, 'public')))
  server.use('/_next', express.static(path.join(__dirname, '.next')))

  server.all('*', (req, res, next) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if(err) {throw err};

    console.log(`> Custom Server listening at http://localhost:${port} as production`) 
  });

})
