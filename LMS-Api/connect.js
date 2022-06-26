let mysql = require('mysql');


let connection = mysql.createConnection({
    
  host: 'nl-srv-web324.main-hosting.eu',
	user: 'u671633553_admin_padah',
	password: 'Padahweb@2022',
	database: 'u671633553_padahweb'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });