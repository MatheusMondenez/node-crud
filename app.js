var express = require('./config/config');
var app = express();

app.listen(3000, function(){
	console.log('Server is running');
});