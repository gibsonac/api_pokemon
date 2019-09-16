const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static( __dirname + '/public/dist/public' ));


app.listen(8000, () => console.log("listening on port 8000!"));