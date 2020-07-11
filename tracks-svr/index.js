const express = require('express');
const path = require('path');
const app = express();

const hostname = "0.0.0.0";
const port = 3000;

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})