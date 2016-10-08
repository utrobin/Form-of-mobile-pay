/**
 * Created by utrobin on 08.10.16.
 */
let express = require('express');
let parser = require('body-parser');
let app = express();

app.use('/', express.static('public'));

// app.use(parser.json());


app.post('/users', (req, res, body) => {
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${process.env.PORT || 3000}`);
});