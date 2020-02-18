const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/tpm-connect'));

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, '/dist/tmp-connect/index.html'));
});

app.listen(process.env.PORT || 8080);
