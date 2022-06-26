const express = require('express'),
http = require('http'),
port = process.env.PORT || 3000,
mysql = require('mysql2'),
app = express(),
nodemailer = require('nodemailer'),
bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const authorize = require('./authorization/authorization-middleware');
const config = require('./authorization/config');
const constant = require('./authorization/constant');
const registration_email = require('./email_templates/registration');
const contact_email = require('./email_templates/contact');
const get_password = require('./email_templates/password');
//const io = require('socket.io')(chatport);

/* const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer,{
	cors: true,
	origins: ["*"]
});
const webSocketPort = process.env.PORT || 3001; */

//const webSocketPort = process.env.PORT || 3001;
//const webSocketPort = 3001;
const webSocketPort = 1434;
const io = require('socket.io')(webSocketPort,{
	cors: true,
	origins: ["*"]
});

/* const webSocketPort = process.env.PORT;
var server = require('http').Server(app)
  .listen(webSocketPort, function() {
    console.log("WebSocket listening on port %d", port);
  }); 

const io = require('socket.io')(server);*/

//app.set("views",path.join(__dirname,"views"));
//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 
app.set('view engine', 'ejs');
app.use(express.static('public'));
//app.use('./uploads',express.static('public'));

//const DIR = './uploads/events';

var photopath = '', galleryphotopath=[], lessondocpath=[];
var usertableresp = '';

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/events');
    },
    filename: (req, file, cb) => {
	    photopath = '/uploads/events/event_' + req.params.dte +'_'+ req.params.event_name + path.extname(file.originalname);
	    cb(null, 'event_' + req.params.dte +'_'+ req.params.event_name + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});


var blogstorage = multer.diskStorage({
    destination: (req, file, cb) => {
      	cb(null, './uploads/blogs');
    },
    filename: (req, file, cb) => {
	    var dte = new Date();
		var a = dte.getDate()+'_'+(dte.getMonth()+1)+'_'+dte.getFullYear()+'_'+dte.getHours()+'_'+dte.getMinutes()+'_'+dte.getSeconds();

		photopath = '/uploads/blogs/blog_'+req.params.title+'_'+req.params.cat+'_'+a+path.extname(file.originalname);
		cb(null, 'blog_'+req.params.title+'_'+req.params.cat+'_'+a+path.extname(file.originalname));
    }
});
var blogupload = multer({storage: blogstorage});

var userstorage = multer.diskStorage({
    destination: (req, file, cb) => {
      	cb(null, './uploads/profile');
    },
    filename: (req, file, cb) => {
	    photopath = '/uploads/profile/user_'+req.params.user_id+path.extname(file.originalname);
		cb(null, 'user_'+req.params.user_id+path.extname(file.originalname));
    }
});
var userupload = multer({storage: userstorage}); 

var lmscatstorage = multer.diskStorage({
    destination: (req, file, cb) => {
      	cb(null, './uploads/lms/category');
    },
    filename: (req, file, cb) => {
	    photopath = '/uploads/lms/category/cat_'+req.params.cat_name+path.extname(file.originalname);
		cb(null, 'cat_'+req.params.cat_name+path.extname(file.originalname));
    }
});
var lmscatupload = multer({storage: lmscatstorage});

var lmscorstorage = multer.diskStorage({
    destination: (req, file, cb) => {
      	cb(null, './uploads/lms/course');
    },
    filename: (req, file, cb) => {
	    photopath = '/uploads/lms/course/cor_'+req.params.course_name+path.extname(file.originalname);
		cb(null, 'cor_'+req.params.course_name+path.extname(file.originalname));
    }
});
var lmscourseupload = multer({storage: lmscorstorage});

var lmslesstorage = multer.diskStorage({
    destination: (req, file, cb) => {
      	cb(null, './uploads/lms/lesson');
    },
    filename: (req, file, cb) => {
	    photopath = '/uploads/lms/lesson/lesson_'+req.params.lesson_name+path.extname(file.originalname);
		cb(null, 'lesson_'+req.params.lesson_name+path.extname(file.originalname));
    }
});
var lmslessonupload = multer({storage: lmslesstorage});

var lmsclassstorage = multer.diskStorage({
    destination: (req, file, cb) => {
      	cb(null, './uploads/lms/class');
    },
    filename: (req, file, cb) => {
	    photopath = '/uploads/lms/class/class_'+req.params.class_name+'_'+req.params.cnt+path.extname(file.originalname);
		cb(null, 'lesson_'+req.params.class_name+'_'+req.params.cnt+path.extname(file.originalname));
    }
});
var lmsclassupload = multer({storage: lmsclassstorage});

var gallerystorage = multer.diskStorage({
    destination: (req, file, cb) => {
      	cb(null, './uploads/events/gallery');
    },
    filename: (req, file, cb) => {
	    galleryphotopath.push('/uploads/events/gallery/event_'+req.params.id+'_'+file.originalname);
		cb(null, 'event_'+req.params.id+'_'+file.originalname);
    }
});
var galleryupload = multer({storage: gallerystorage});

var lessonstorage = multer.diskStorage({
    destination: (req, file, cb) => {
      	cb(null, './uploads/lms/lesson');
    },
    filename: (req, file, cb) => {
	    lessondocpath.push('/uploads/lms/lesson/lesson_'+req.params.id+'_'+file.originalname);
		cb(null, 'lesson_'+req.params.id+'_'+file.originalname);
    }
});
var lessonupload = multer({storage: lessonstorage});

const db = mysql.createPool({
	host: 'nl-srv-web324.main-hosting.eu',
	user: 'u671633553_chatbot',
	password: 'Chatbot@db69',
	database: 'u671633553_chatbot'
});

// const db = mysql.createPool({
// 	host: '65.175.118.74',
// 	user: 'admin_sas',
// 	password: 'S@SAdmin9',
// 	database: 'admin_singandshare'
// });

/*const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'singandshare'
});*/

/*const db = mysql.createPool({
	host:'sql324.main-hosting.eu',
	user: 'u671633553_sas_admin',
	password: 'S@SAdmin9',
	database: 'u671633553_singandshare'
});*/

const mailerdetails = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
 	auth: {
        user: constant.info_email,
        pass: constant.info_password
    },
	tls: {
	    rejectUnauthorized: false
	}
});

app.post('/login',function(req,res){
	let sql = "SELECT status from users where user_email_id ='"+req.body.email+"'";
	db.query(sql, function(err, data, fields) {
		if(data.length > 0){
			if(data[0].status != 'Enable'){
				res.json({
					status: 201,
					message: "You are not authorized to login"
				});
			}else{
				let sql = "SELECT * from users WHERE user_email_id = '"+req.body.email+"'";
				db.getConnection(function (err, connection) {
					if(err){
			            console.log(err);
			        }else{ 
						connection.query(sql, function(err, data, fields) {
							if(err){
								res.json({
									status: null,
									message: err
							   	});
							}else{
								if(data.length > 0){
									var id = data[0].user_id;
									let query = "SELECT user_password from users_password WHERE user_email_id = '"+req.body.email+"'";
									connection.query(query, function(err, data, fields) {
										if(err){console.log("test 2");
											res.json({
												status: null,
												message: err
										   	});
										}else{
											if(data[0].user_password == req.body.pass_word){				
												let query = "SELECT * from users a INNER JOIN roles b ON a.role_id = b.role_id WHERE user_email_id = '"+req.body.email+"'";
												connection.query(query, function(err, data, fields) {
													if(err){ 
														res.json({
															status: null,
															message: err
													   	});
													}else{
														const user = {
															email : data[0].user_email_id,
															user_id : data[0].user_id,
															first_name : data[0].user_first_name,
															last_name : data[0].user_last_name,
															srs_id : data[0].srs_id,
															role_id : data[0].role_id,
															role_name : data[0].role_name,
															scopes:["customer:create","customer:read"]
														}
														jwt.sign(user, 'my secret key', (err,token) => {
															res.json({
																status: 200,
																message: "User logged in successfully.",
																token : token,
																data: data
															});
														})
													}									
												})
											}else{
												let cnt = Number(data[0].entry_count);
												if(cnt < 3){
													cnt = cnt + 1;
													let query = "UPDATE users_password SET entry_count = "+cnt+" WHERE user_id="+id;
													connection.query(query, function(err, data, fields) {
														if(err){
															res.json({
																status: null,
																message: err
														   	});
														}else{
															res.json({
																status: 201,
																message: "Incorrect password."
															});
														}
													})
												}else{
													let query = "UPDATE users a, users_password b SET a.status = 'Disable', b.entry_count = 0 WHERE a.user_id="+id+" AND b.user_id="+id;
													connection.query(query, function(err, data, fields) {
														if(err){
															res.json({
																status: null,
																message: err
														   	});
														}else{
															res.json({
																status: 202,
																message: "Your account has been temporarily disabled. Kindly contact the admin to enable your account again"
															});
														}
													})
												}
											}
										}
									})
								}else{
									res.json({
										status: 201,
										message: "Email ID does not exist"
									});
								}								
							}
						})
						connection.release();
					}
				});
			}
		}else{
			res.json({
				status: 201,
				message: "Email ID does not exist"
			});
		}
	});
})

app.post('/register',function(req,res){
	let sql = "SELECT * FROM users WHERE user_email_id = '"+req.body.register_email_id+"'";
	db.query(sql, function(err, data, fields) {
		if(data.length == 0){
			var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
			month < 10 ? mon = "0"+month : mon = month;
			dte < 10 ? dt = "0"+dte : dt = dte;
			var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

			let sql = "INSERT INTO users (user_first_name, user_last_name, user_email_id, user_created_date, role_id, user_contact_number, status) VALUES ('"+req.body.register_first_name+"','"+req.body.register_last_name+"','"+req.body.register_email_id+"','"+reqdte+"',"+req.body.register_role+",'"+req.body.register_contact_number+"','Pending')";

			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					let user_id = data.insertId;
					let sql = "INSERT INTO users_password (user_password, user_email_id, user_id) VALUES ('"+req.body.register_password+"','"+req.body.register_email_id+"','"+user_id+"')";
					db.query(sql, function(err, data, fields) {
						if(err){
							res.json({
								status: null,
								message: err
						   	});
						}else{								
							let param ={
								"email_id" : req.body.register_email_id,
								"password" : req.body.register_password
							}
							var description = registration_email.user_register(param);

						   	var mailOptions={
						        to: req.body.register_email_id,
						        cc: 'nayana@vecan.co',
								subject: 'Welcome to PadahWeb !!!',
								html: description
						    }

						    mailerdetails.sendMail(mailOptions, function(error, response){
							    if(error){
							        res.end("error");
							    }else{
							        res.json({
										status: 200,
										message: "You have been successfully registered. Email has been sent to your mentioned ID."
									});
							    }
							});									
						}
					});					
				}
			});
		}else{
			res.json({
				status: 201,
				message: "Email ID already exist"
			});
		}
	})
})

app.post('/changeUserStatus',function(req,res) {
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql;
	if(req.body.statusEnableDesc){
		sql = "UPDATE users SET status = '"+req.body.status+"', user_activation_reason = '"+req.body.statusEnableDesc+"', modified_by_user_id = '"+req.body.modified_by_user_id+"', modified_on = '"+reqdte+"' WHERE user_id="+req.body.userid;
	}else{
		sql = "UPDATE users SET status = '"+req.body.status+"', user_deactivation_reason = '"+req.body.statusDisableDesc+"', modified_by_user_id = '"+req.body.modified_by_user_id+"', modified_on = '"+reqdte+"' WHERE user_id="+req.body.userid;
	}

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "User "+req.body.status+"d successfully."
			});						
		}
	});
})

app.post('/updateUser',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	//let sql = "UPDATE users , users_password SET users.user_first_name = '"+req.body.user_first_name+"', users.user_last_name = '"+req.body.user_last_name+"', users.user_email_id = '"+req.body.user_email_id+"', users.role_id = '"+req.body.role_id+"', users.mentor_email_id = '"+req.body.mentor_email_id+"', users.modified_by_user_id = '"+req.body.modified_by+"', users.srs_id = "+srs+", users.modified_on = '"+reqdte+"', users_password.user_email_id = '"+req.body.user_email_id+"' WHERE users.user_id="+req.body.user_id+" and users_password.user_id="+req.body.user_id;

	let sql = "UPDATE users SET user_first_name = '"+req.body.user_first_name+"', user_last_name = '"+req.body.user_last_name+"', users.modified_by_user_id = '"+req.body.modified_by+"', users.modified_on = '"+reqdte+"' WHERE user_id="+req.body.user_id;
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
			});
		}else{
			res.json({
				status: 200,
				message: "User updated successfully."
			});
		}
	})
})

app.get('/updateUserAccess/:code/:id',function(req,res){
	let sql;
	if(req.params.code == 8){
		sql = "UPDATE user_access SET sns_access = 1, user_access = 1, event_access = 1, attendance_access = 1, calendar_add_access = 1, calendar_access = 1, blog_access = 1, blog_approve_access = 1, blog_change_status_access = 1 WHERE user_id = "+req.params.id;
	}else if(req.params.code == 11){
		sql = "UPDATE user_access SET sns_access = 0, user_access = 0, event_access = 0, attendance_access = 1, calendar_add_access = 0, calendar_access = 1, blog_access = 0, blog_approve_access = 0, blog_change_status_access = 0 WHERE user_id = "+req.params.id;
	}else if(req.params.code == 9){
		sql = "UPDATE user_access SET sns_access = 0, user_access = 1, event_access = 0, attendance_access = 0, calendar_add_access = 0, calendar_access = 1, blog_access = 0, blog_approve_access = 0, blog_change_status_access = 0 WHERE user_id = "+req.params.id;
	}else if(req.params.code == 10){
		sql = "UPDATE user_access SET sns_access = 0, user_access = 0, event_access = 0, attendance_access = 0, calendar_add_access = 0, calendar_access = 1, blog_access = 0, blog_approve_access = 0, blog_change_status_access = 0 WHERE user_id = "+req.params.id;
	}

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{		
			res.json({
				status: 200,
				data: data,
				message: "Access Status Updated successfully.",
			});						
		}
	});
})

app.get('/getUsers/:type',function(req,res){
	let sql;
	if(req.params.type == 'all'){
		//sql = "SELECT users.user_id, users.user_first_name, users.user_last_name, users.user_created_date,users.status, roles.role_name FROM users INNER JOIN roles ON users.role_id = roles.role_id";
		sql = "SELECT a.user_id, a.user_first_name, a.user_last_name, a.user_created_date,a.status, b.role_name, c.srs_name, CONCAT(d.user_first_name, ' ', d.user_last_name) AS mentor_name FROM users a INNER JOIN roles b ON a.role_id = b.role_id LEFT JOIN srs_branch c ON a.srs_id = c.srs_id LEFT JOIN users d ON d.user_id = a.parent_id";
	}else{
		sql = "SELECT * from users WHERE users.user_id = " + req.params.type;
	}	

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{		
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully.",
			});						
		}
	});
})

app.get('/attendanceUsers/:type',function(req,res){
	let sql = "SELECT user_id, user_first_name, user_last_name, user_email_id, user_contact_number from users WHERE status = 'Enable' and srs_id = " + req.params.type;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{		
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully.",
			});						
		}
	});
})

app.post('/getProfile',function(req,res){
	let sql = "SELECT * from users INNER JOIN usersdetails ON users.user_id = usersdetails.user_id INNER JOIN roles ON users.role_id = roles.role_id WHERE users.user_id = '"+req.body.id+"'";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{		
			res.json({
				status: 200,
				data: data,
				message: "User Detail fetched successfully.",
			});						
		}
	});
})

app.post('/registerUserForEvent',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "INSERT INTO contact (salutation, contact_first_name, contact_last_name, contact_email_id, contact_number, contact_state, contact_city, contact_referrer, contact_address, event_id, created_date) VALUES ('"+req.body.contact_sal+"','"+req.body.contact_first_name+"','"+req.body.contact_last_name+"','"+req.body.contact_email_id+"','"+req.body.contact_number+"','"+req.body.contact_state+"','"+req.body.contact_city+"','"+req.body.contact_referrer+"','"+req.body.contact_address+"','"+req.body.event_id+"','"+reqdte+"')";
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				message: "New User registered for the event."
			});
		}
	});				
})

app.post('/updateProfile',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();
	let sql;

	if(req.body.image_url == ''){
		sql = "UPDATE users SET user_first_name = '"+req.body.user_first_name+"', user_last_name = '"+req.body.user_last_name+"', user_email_id = '"+req.body.user_email_id+"', user_contact_number = '"+req.body.user_contact_number+"' WHERE user_id="+req.body.user_id;
	}else{
		sql = "UPDATE users SET user_first_name = '"+req.body.user_first_name+"', user_last_name = '"+req.body.user_last_name+"', user_email_id = '"+req.body.user_email_id+"', user_contact_number = '"+req.body.user_contact_number+"', image_url = '"+req.body.image_url+"' WHERE user_id="+req.body.user_id;
	}
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let sql = "UPDATE usersdetails SET user_address = '"+req.body.user_address+"' WHERE user_id="+req.body.user_id;

			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					res.json({
						status: 200,
						message: "Your Profile has been updated successfully."
					});
				}
			});
		}
	});				
})

app.get('/getContact/:email',function(req,res){
	let sql = "SELECT contact_id FROM contact WHERE contact_email_id = '"+req.params.email+"'";
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				message: "User successfully registered for the event.",
				data: data
			});
		}
	});				
})

app.post('/addToContactEvent',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "INSERT INTO contact_event (contact_id, event_id, created_date) VALUES ('"+req.body.contact_id+"','"+req.body.event_id+"','"+reqdte+"')";
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let sql = "SELECT event_name, event_start_date, venue_name, connection_link FROM events WHERE event_id = " + req.body.event_id;
			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					var dte = new Date(data[0].event_start_date);
					var evt_date = dte.getDate()+'/'+(dte.getMonth()+1)+'/'+dte.getFullYear();
					let evt_time = dte.getHours()+':'+dte.getMinutes();

					let param = {
						"event_name" : data[0].event_name,
						"event_start_date" : evt_date,
						"event_start_time": evt_time,
						"venue_name": data[0].venue_name,
						"connection_link": data[0].connection_link
					}
					var description;
					if(data[0].connection_link){
						description = registration_email.event_register_link(param);
					}else{
						description = registration_email.event_register(param);
					}					

				   	var mailOptions={
				        to: req.body.contact_email_id,
						subject: 'Webinar Registration Details',
						html: description
				    }

				    mailerdetails.sendMail(mailOptions, function(error, response){
					    if(error){
					        res.end("error");
					    }else{
					        res.json({
								status: 200,
								message: "User successfully registered for the event."
							});
					    }
					});
				}
			})
		}
	})
})

app.post('/addAttendance',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "INSERT INTO meetingattendance (srs_id, meeting_date, total_members, new_attendees, presentees, absentees, created_by, created_on, topic_name, speaker_name) VALUES ('"+req.body.srs_id+"','"+req.body.meeting_date+"','"+req.body.total_members+"','"+req.body.new_attendees+"','"+req.body.presentees+"','"+req.body.absentees+"','"+req.body.created_by+"','"+reqdte+"','"+req.body.topic_name+"','"+req.body.speaker_name+"')";
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				message: "Added meeting details successfully.",
				rowid: data.insertId
			});
		}
	})
})

app.post('/addAttendees',function(req,res){
	let sql = "INSERT INTO attendees (user_id, user_first_name, user_last_name, user_email_id, attendance_status, meeting_id) VALUES?";

	db.query(sql, [req.body.vals], function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "Meeting Details added successfully."
			});						
		}
	});
})

app.post('/sendUserLink',function(req,res){
	let sql = "SELECT * from users WHERE user_email_id = '"+req.body.email+"'";
	db.query(sql, function(err, data, fields) {
		if(data.length == 0){
			let param = {
				redirectlink : constant.redirectlink,
				url : req.body.url
			}
			var description = registration_email.mentee_register(param);

		   	var mailOptions={
		        to: req.body.email,
		        cc: 'nayana@vecan.co',
				subject: 'Register Yourself at PadahWeb',
				html: description
		    }

		    mailerdetails.sendMail(mailOptions, function(error, response){
			    if(error){
			        res.json({
			        	status:201,
			        	message:error,
			        	data:response
			        });
			    }else{
			        res.json({
						status: 200,
						message: "Email is sent to the mentioned Email Address."
				   	});
			    }
			});
		}else{
			res.json({
				status:201,
				message: "Email ID already exists."
			})
		}
	})
})

app.post('/checkUser',function(req,res){
	let sql = "SELECT * from users WHERE user_email_id = '"+req.body.email+"'";
	db.query(sql, function(err, data1, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			let sql = "SELECT * from contact WHERE contact_email_id = '"+req.body.email+"'";
			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					if(data.length == 0){
						if(data1.length == 0){
							res.json({
								status: 201,
								email: req.body.email,
								message: "User Does not exist"
						   	});
						}else{
							var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
							month < 10 ? mon = "0"+month : mon = month;
							dte < 10 ? dt = "0"+dte : dt = dte;
							var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

							let sql = "INSERT INTO contact (user_id, contact_email_id, event_id, created_date) VALUES ('"+data1[0].user_id+"','"+req.body.email+"','"+req.body.event_id+"','"+reqdte+"')";
							
							db.query(sql, function(err, data, fields) {
								if(err){
									res.json({
										status: null,
										message: err
								   	});
								}else{
									res.json({
										status: 200,
										message: "New User registered for the event."
									});
								}
							});	
						}
					}else{
						res.json({
							status: 200,
							email: req.body.email,
							message: "User exists"
					   	});
					}
				}
			})
		}
	})
})

function imageFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb (null, true);
}

app.post('/addBlogImg/:title/:cat',blogupload.single('image'),function(req,res){	
	res.json({
		status: 200,
		message: "Blog Image Added successfully.",
		filepath: photopath
	});
})

app.post('/addUserImg/:user_id/',userupload.single('image'),function(req,res){	
	res.json({
		status: 200,
		message: "User Image Updated successfully.",
		filepath: photopath
	});
})

app.post('/addRole',function(req,res){
	//let accessToken = req.cookies.jwt;
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	req.body.created_by_user_id=1;
	req.body.modified_user_id=1;

	let sql = "INSERT INTO roles (role_name, created_by_user_id, created_date, modified_user_id, modified_user_date) VALUES ('"+req.body.role_name+"','"+req.body.created_by_user_id+"','"+reqdte+"','"+req.body.modified_user_id+"','"+reqdte+"')";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Role Added successfully."
			});						
		}
	});
})

app.get('/getRole',function(req,res){ //,authorize("customer:read")
	let sql = "SELECT role_id, role_name FROM roles";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "Role Fetched successfully."
			});						
		}
	});
})

app.get('/getUserImg/:id', function(req, res){
	let sql = "SELECT image_url from users WHERE user_id = "+req.params.id;
	db.query(sql, function(err, data, fields) {
		if(data.length > 0){
			const file = data[0].image_url;
			if(file){
				res.sendFile(__dirname + file);
			}else{
				res.sendFile(__dirname + '/uploads/not-found/no-img-found-small.png');
			}
		}else{
			res.sendFile(__dirname + '/uploads/not-found/no-img-found-small.png');
		}
	});
});

app.post('/addBranch',function(req,res) {
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "INSERT INTO srs_branch (srs_name, user_id, created_by, created_on, status) VALUES ('"+req.body.srs_name+"','"+req.body.user_id+"','"+req.body.created_by+"','"+reqdte+"','Enable')";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "A new Branch has been created successfully."
			});						
		}
	});
})

app.post('/editBranch',function(req,res) {
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "UPDATE srs_branch SET srs_name = '"+req.body.srs_name+"', user_id = '"+req.body.user_id+"', modified_by = '"+req.body.modified_by+"', modified_on = '"+reqdte+"' WHERE srs_id="+req.body.srs_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Branch Updated successfully."
			});						
		}
	});
})

app.get('/getBranches/:type',function(req,res){
	let sql = '';
	if(req.params.type == 'all'){
		sql = "SELECT srs_branch.srs_id, srs_branch.srs_name, srs_branch.created_on,srs_branch.status , users.user_first_name, users.user_last_name FROM srs_branch INNER JOIN users ON users.user_id = srs_branch.user_id ORDER BY created_on DESC";
	}else if(req.params.type == 'adduser'){
		sql = "SELECT srs_id, srs_name FROM srs_branch  WHERE status = 'Enable'";
	}else{
		sql = "SELECT srs_id, srs_name, user_id from srs_branch WHERE srs_id="+req.params.type;
	}
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.post('/changeBranchStatus',function(req,res) {
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "UPDATE srs_branch SET status = '"+req.body.status+"', modified_by = '"+req.body.modified_by+"', modified_on = '"+reqdte+"' WHERE srs_id="+req.body.srs_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Branch "+req.body.status+"d successfully."
			});						
		}
	});
})

app.post('/updateAccess',function(req,res) {
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "UPDATE user_access SET sns_access = '"+req.body.sns_access+"', user_access = '"+req.body.user_access+"', event_access = '"+req.body.event_access+"', attendance_access = '"+req.body.attendance_access+"', calendar_access = '"+req.body.calendar_access+"', calendar_add_access = '"+req.body.calendar_add_access+"', blog_access = '"+req.body.blog_access+"', blog_approve_access = '"+req.body.blog_approve_access+"', blog_change_status_access = '"+req.body.blog_status_access+"' WHERE access_id="+req.body.access_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Access assigned successfully."
			});						
		}
	});
})

app.post('/getAccessList',function(req,res){
	let sql = "SELECT * FROM user_access WHERE user_id = "+req.body.user_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.post('/getLoginAccessList',function(req,res){
	let sql = "SELECT * FROM user_access WHERE user_id = "+req.body.user_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getSNSList',function(req,res){
	let sql = "SELECT srs_id, srs_name from srs_branch";
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getNewlyAddedList',function(req,res){
	let sql = "SELECT a.user_id, CONCAT(a.user_first_name,' ',a.user_last_name) AS user_name, a.user_created_date, a.user_email_id, a.user_contact_number, a.status, b.role_name, CONCAT(c.user_first_name,' ',c.user_last_name) AS mentor_name, d.srs_name FROM users a LEFT JOIN roles b ON a.role_id = b.role_id LEFT JOIN users c ON a.parent_id = c.user_id LEFT JOIN srs_branch d ON a.srs_id = d.srs_id ORDER BY a.user_created_date DESC";
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	})
})

app.get('/getRegisteredUsersEventsDetails/:type',function(req,res){
	let sql = "SELECT (SELECT CONCAT(b.contact_first_name, ' ', b.contact_last_name) AS con_name FROM contact b WHERE b.contact_id = c.contact_id AND c.user_id IS NULL) AS name, (SELECT d.contact_number FROM contact d WHERE d.contact_id = c.contact_id AND c.user_id IS NULL) AS phone, (SELECT a.contact_email_id FROM contact a WHERE a.contact_id = c.contact_id AND c.user_id IS NULL) AS email, (SELECT CONCAT(e.user_first_name, ' ', e.user_last_name) AS use_name FROM users e WHERE e.user_id = c.user_id) AS 'user_name', (SELECT f.user_contact_number FROM users f WHERE f.user_id = c.user_id) AS 'user_phone', (SELECT g.user_email_id FROM users g WHERE g.user_id = c.user_id) AS 'user_email', c.event_name, c.event_start_date, c.event_end_date FROM all_events c";
	
	if(req.params.type == 'member'){
		sql = sql + " WHERE c.user_id IS NOT NULL";
	}else{
		sql = sql + " WHERE c.user_id IS NULL"
	}
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	})
})

app.get('/monthlyAttendance',function(req,res){
	let sql = "SELECT b.srs_name, CONCAT(MONTHNAME(a.meeting_date),', ',YEAR(a.meeting_date)) AS month, COUNT(*) AS count FROM meetingattendance a INNER JOIN srs_branch b ON a.srs_id = b.srs_id GROUP BY b.srs_name, month";
	
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	})
})

/* Training Category (LMS) */
app.post('/addLMSCategory',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "INSERT INTO Lms_Category (category_name, category_description, category_image_url, created_by, created_on, category_status) VALUES ('"+req.body.category_name+"','"+req.body.category_description+"','"+req.body.category_image_url+"','"+req.body.created_by+"','"+reqdte+"','Y')";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Category Added successfully."
			});						
		}
	});
})

app.post('/addTrainingCatImg/:cat_name',lmscatupload.single('image'),function(req,res){	
	res.json({
		status: 200,
		message: "Category Image Added successfully.",
		filepath: photopath
	});
})

app.get('/getLMSCategory/:cnt',function(req,res){
	let sql;
	if(req.params.cnt == 'all'){
		sql = "SELECT * from Lms_Category";
	}else if(req.params.cnt == 'Y'){
		sql = "SELECT * from Lms_Category WHERE category_status = '"+req.params.cnt+"'";
	}else{
		sql = "SELECT * from Lms_Category WHERE row_id = "+req.params.cnt;
	}

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getPaginatedCategory/:cnt',function(req,res){
	const limit = 10, page = req.params.cnt, offset = (page - 1) * limit;
	let sql = "SELECT * from Lms_Category ORDER BY created_on DESC limit "+limit+" OFFSET "+offset;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let resp1 = data;
			let sql = "SELECT COUNT(*) AS total from Lms_Category";
			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					res.json({
						status: 200,
						data: {
							data : resp1,
							total : data 
						},
						message: "Lists fetched successfully."
					});
				}
			})						
		}
	});
})

app.post('/changeLMSCatStatus',function(req,res) {
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "UPDATE Lms_Category SET category_status = '"+req.body.category_status+"', modified_by = '"+req.body.modified_by+"', modified_on = '"+reqdte+"' WHERE row_id="+req.body.row_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Category status changed successfully."
			});						
		}
	});
})

app.get('/getLMSCategoryImg/:id', function(req, res){
	let sql = "SELECT category_image_url from Lms_Category WHERE row_id = "+req.params.id;
	db.query(sql, function(err, data, fields) {
		if(data.length > 0){
			const file = data[0].category_image_url;
			if(file){
				res.sendFile(__dirname + file);
			}else{
				res.sendFile(__dirname + '/uploads/not-found/no-img-found-small.png');
			}
		}else{
			res.sendFile(__dirname + '/uploads/not-found/no-img-found-small.png');
		}  		
	});
});

app.post('/updateLMSCategory',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql;
	if(req.body.imgurl == ''){
		sql = "UPDATE Lms_Category SET category_name = '"+req.body.category_name+"', category_description = '"+req.body.category_description+"', modified_by = '"+req.body.modified_by+"', modified_on = '"+reqdte+"' WHERE row_id="+req.body.row_id;
	}else{
		sql = "UPDATE Lms_Category SET category_name = '"+req.body.category_name+"', category_description = '"+req.body.category_description+"', modified_by = '"+req.body.modified_by+"', category_image_url = '"+req.body.category_image_url+"', modified_on = '"+reqdte+"' WHERE row_id="+req.body.row_id;
	}

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Category Updated successfully."
			});						
		}
	});
});

/* Training Course (LMS) */
app.post('/addLMSCourse',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "INSERT INTO Lms_Course (course_name, category_id, course_description, course_image_url, created_by, created_on, course_status) VALUES ('"+req.body.course_name+"','"+req.body.category_id+"','"+req.body.course_description+"','"+req.body.course_image_url+"','"+req.body.created_by+"','"+reqdte+"','Y')";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Course Added successfully."
			});						
		}
	});
})

app.post('/addTrainingCourseImg/:course_name',lmscourseupload.single('image'),function(req,res){
	res.json({
		status: 200,
		message: "Course Image Added successfully.",
		filepath: photopath
	});
})

app.get('/getLMSCourseImg/:id', function(req, res){
	let sql = "SELECT course_image_url from Lms_Course WHERE row_id = "+req.params.id;
	db.query(sql, function(err, data, fields) {
		if(data.length > 0){
			const file = data[0].course_image_url;
	  		if(file){
				if(fs.existsSync(__dirname + file)){
					res.sendFile(__dirname + file);
				}else{
					res.sendFile(__dirname + '/uploads/not-found/no-img-found-small.png');
				}
			}else{
				res.sendFile(__dirname + '/uploads/not-found/no-img-found-small.png');
			}
		}else{
			res.sendFile(__dirname + '/uploads/not-found/no-img-found-small.png');
		}		
	});
});

app.get('/getLMSCourse/:cnt',function(req,res){
	let sql;
	if(req.params.cnt == 'all'){
		sql = "SELECT * from Lms_Course a INNER JOIN Lms_Category b ON a.category_id = b.row_id";
	}else if(req.params.cnt == 'Y'){
		sql = "SELECT * from Lms_Course WHERE course_status = '"+req.params.cnt+"'";
	}else{
		sql = "SELECT * from Lms_Course WHERE row_id = "+req.params.cnt;
	}

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getPaginatedCourse/:cnt',function(req,res){
	const limit = 10, page = req.params.cnt, offset = (page - 1) * limit;
	let sql = "SELECT *, a.row_id AS course_id from Lms_Course a INNER JOIN Lms_Category b ON a.category_id = b.row_id ORDER BY a.created_on DESC limit "+limit+" OFFSET "+offset;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let resp1 = data;
			let sql = "SELECT COUNT(*) AS total from Lms_Course";
			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					res.json({
						status: 200,
						data: {
							data : resp1,
							total : data 
						},
						message: "Lists fetched successfully."
					});
				}
			})						
		}
	});
})

app.get('/getMentors/:id',function(req,res){
	let sql = "SELECT user_id, user_email_id FROM users WHERE role_id IN (9,11) AND srs_id = "+req.params.id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getLMSCourseOnCat/:id',function(req,res){
	let sql = "SELECT * from Lms_Course WHERE category_id = "+req.params.id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getLMSCourseOnCatSelect/:id',function(req,res){
	let sql = "SELECT * from Lms_Course WHERE course_status = 'Y' AND category_id = "+req.params.id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.post('/changeLMSCourseStatus',function(req,res) {
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "UPDATE Lms_Course SET course_status = '"+req.body.course_status+"', modified_by = '"+req.body.modified_by+"', modified_on = '"+reqdte+"' WHERE row_id="+req.body.row_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Course status changed successfully."
			});						
		}
	});
})

app.post('/updateLMSCourse',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql;
	if(req.body.course_image_url == ''){
		sql = "UPDATE Lms_Course SET course_name = '"+req.body.course_name+"',category_id = '"+req.body.category_id+"', course_description = '"+req.body.course_description+"', modified_by = '"+req.body.modified_by+"', modified_on = '"+reqdte+"' WHERE row_id="+req.body.row_id;
	}else{
		sql = "UPDATE Lms_Course SET course_name = '"+req.body.course_name+"',category_id = '"+req.body.category_id+"', course_description = '"+req.body.course_description+"', modified_by = '"+req.body.modified_by+"', course_image_url = '"+req.body.course_image_url+"', modified_on = '"+reqdte+"' WHERE row_id="+req.body.row_id;
	}

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Course Updated successfully."
			});						
		}
	});
});

/* Training Lesson (LMS) */
app.post('/addLMSLesson',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "INSERT INTO Lms_Lesson (lesson_name, course_id, category_id, lesson_description, created_by, created_on, lesson_status) VALUES ('"+req.body.lesson_name+"','"+req.body.course_id+"','"+req.body.category_id+"','"+req.body.lesson_description+"','"+req.body.created_by+"','"+reqdte+"','Y')";

	db.query(sql, function(err, data, fields) {
		sql = "INSERT INTO Lms_Lesson_Video (video_url, video_title, lesson_id) VALUES ('"+req.body.video_url+"','"+req.body.video_title+"','"+data.insertId+"')";

		db.query(sql, function(err1, data1, fields1) {
			if(req.body.assessment_name){
				let sql = "INSERT INTO assessment (lesson_id, assessment_name, created_by, status) VALUES ('"+data.insertId+"','"+req.body.assessment_name+"','"+req.body.created_by+"','Y')";

				db.query(sql, function(err1, data1, fields1) {
					if(req.body.docdata.length > 0){
						var b =[], id = data.insertId, newArr=[];
						for(var i=0;i<req.body.docdata.length;i++){
							b.push(id);
							b.push('/uploads/lms/lesson/lesson_'+id+'_'+req.body.docdata[i].pdf_path);
							b.push(req.body.docdata[i].meeting_url);
							newArr.push(b);
							b=[];
						}
						let sql = "INSERT INTO Lms_Lesson_Doc (lesson_id, pdf_path, meeting_url) VALUES ?";
						db.query(sql, [newArr], function(err, data, fields) {
							if(err){
								res.json({
									status: null,
									message: err
								});
							}else{			
								res.json({
									status: 200,
									message: "Lesson Added successfully.",
									data: id
								});						
							}
						})
					}else{
						res.json({
							status: 200,
							message: "Lesson Added successfully.",
							data: id
						});	
					}
				});
			}else{
				if(req.body.docdata.length > 0){
					var b =[], id = data.insertId, newArr=[];
					for(var i=0;i<req.body.docdata.length;i++){
						b.push(id);
						b.push('/uploads/lms/lesson/lesson_'+id+'_'+req.body.docdata[i].pdf_path);
						b.push(req.body.docdata[i].meeting_url);
						newArr.push(b);
						b=[];
					}
					let sql = "INSERT INTO Lms_Lesson_Doc (lesson_id, pdf_path, meeting_url) VALUES ?";
					db.query(sql, [newArr], function(err, data, fields) {
						if(err){
							res.json({
								status: null,
								message: err
							});
						}else{			
							res.json({
								status: 200,
								message: "Lesson Added successfully.",
								data: id
							});						
						}
					})
				}else{
					res.json({
						status: 200,
						message: "Lesson Added successfully.",
						data: id
					});	
				}
			}
		})
	});
})

app.post('/addLessonDoc/:id',lessonupload.array('image',10),function(req,res){    
	res.json({
		status: 200,
		message: "Lesson Added successfully."
	});
})

app.post('/addTrainingLessonImg/:lesson_name',lmslessonupload.single('image'),function(req,res){
	res.json({
		status: 200,
		message: "Lesson Image Added successfully.",
		filepath: photopath
	});
})

app.get('/getLMSLessonImg/:id', function(req, res){
	let sql = "SELECT lesson_image_url from Lms_Lesson WHERE row_id = "+req.params.id;
	db.query(sql, function(err, data, fields) {
		if(data.length > 0){
			const file = data[0].lesson_image_url;
	  		if(file){
				res.sendFile(__dirname + file);
			}else{
				res.sendFile(__dirname + '/uploads/not-found/no-img-found-small.png');
			}
		}else{
			res.sendFile(__dirname + '/uploads/not-found/no-img-found-small.png');
		}
	});
});

app.get('/getLMSLesson/:cnt',function(req,res){
	let sql, type;
	if(req.params.cnt == 'all'){
		sql = "SELECT *, CONCAT(a.row_id) AS lesson_id from Lms_Lesson a INNER JOIN Lms_Category b ON a.category_id = b.row_id LEFT JOIN Lms_Course c ON a.course_id = c.row_id";
	}else if(req.params.cnt == 'Y'){
		sql = "SELECT * from Lms_Lesson WHERE lesson_status = '"+req.params.cnt+"'";
	}else{
		//sql = "SELECT *,b.row_id AS assessment_id, b.assessment_name from Lms_Lesson a LEFT JOIN assessment b ON b.lesson_id = a.row_id WHERE a.row_id = "+req.params.cnt;
		//SELECT row_id, assessment_name FROM assessment d WHERE d.lesson_id = "+req.params.cnt+"
		sql = "SELECT a.row_id, a.category_id, a.course_id, a.lesson_name, a.lesson_description, c.lesson_id, b.row_id AS assessment_id, b.assessment_name, c.video_url, c.video_title from Lms_Lesson a LEFT JOIN Lms_Lesson_Video c ON a.row_id = c.lesson_id LEFT JOIN assessment b ON b.lesson_id = a.row_id WHERE a.row_id = " +req.params.cnt;
		type = 'editlesson';
	}

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			if(type){
				let resp1 = data;
				sql = "SELECT * from Lms_Lesson_Doc WHERE lesson_id = "+req.params.cnt;
				db.query(sql, function(err, data, fields) {
					if(err){
						res.json({
							status: null,
							message: err
					   	});
					}else{
						let resp = {};
						resp.list = data;
						resp.data = resp1;
						res.json({
							status: 200,
							data: resp,
							message: "List fetched successfully."
						});
					}
				})
			}else{
				res.json({
					status: 200,
					data: data,
					message: "List fetched successfully."
				});
			}			
		}
	});
})

app.get('/getPaginatedLesson/:cnt',function(req,res){
	const limit = 10, page = req.params.cnt, offset = (page - 1) * limit;
	let sql = "SELECT *, CONCAT(a.row_id) AS lesson_id from Lms_Lesson a INNER JOIN Lms_Category b ON a.category_id = b.row_id LEFT JOIN Lms_Course c ON a.course_id = c.row_id ORDER BY a.created_on DESC limit "+limit+" OFFSET "+offset;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let resp1 = data;
			let sql = "SELECT COUNT(*) AS total from Lms_Lesson";
			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					res.json({
						status: 200,
						data: {
							data : resp1,
							total : data 
						},
						message: "Lists fetched successfully."
					});
				}
			})						
		}
	});
})

app.get('/removeDoc/:rowid/:lessonid',function(req,res){    
	let sql = "SELECT pdf_path FROM Lms_Lesson_Doc WHERE row_id = " + req.params.rowid;
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			if(data.length > 0){
				const pathToFile = __dirname + data[0].pdf_path;
				fs.unlinkSync(pathToFile);
			}
			
			let sql = "DELETE FROM Lms_Lesson_Doc WHERE row_id = " + req.params.rowid;
			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					res.json({
						status: 200,
						message: "Lessons deleted successfully."
				   	});
				}
			})
		}
	})
})

app.post('/changeLMSLessonStatus',function(req,res) {
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "UPDATE Lms_Lesson SET lesson_status = '"+req.body.lesson_status+"', modified_by = '"+req.body.modified_by+"', modified_on = '"+reqdte+"' WHERE row_id="+req.body.row_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Course status changed successfully."
			});						
		}
	});
})

app.post('/updateLMSLesson',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();
	var id = req.body.row_id;
	
	sql = "UPDATE Lms_Lesson SET lesson_name = '"+req.body.lesson_name+"',course_id = '"+req.body.course_id+"',category_id = '"+req.body.category_id+"', lesson_description = '"+req.body.lesson_description+"', modified_by = '"+req.body.modified_by+"', modified_on = '"+reqdte+"' WHERE row_id="+req.body.row_id;	

	db.query(sql, function(err, data, fields) {

		sql = "UPDATE Lms_Lesson_Video SET video_url = '"+req.body.video_url+"', video_title = '"+req.body.video_title+"' WHERE lesson_id="+req.body.row_id;

		db.query(sql, function(err1, data1, fields1) {
			if(req.body.assessment_name){
				sql = "UPDATE assessment SET assessment_name = '"+req.body.assessment_name+"' WHERE row_id="+req.body.assessment_id;	
				db.query(sql, function(err, data, fields) {
					var b =[], newArr=[], cnt=0;
					for(var i=0;i<req.body.docdata.length;i++){
						if(typeof req.body.docdata[i].row_id != 'number'){
							b.push(id);
							b.push('/uploads/lms/lesson/lesson_'+id+'_'+req.body.docdata[i].pdf_path);
							b.push(req.body.docdata[i].meeting_url);
							newArr.push(b);
							b=[];
							cnt++;
						}
					}
					if(cnt > 0){
						let sql = "INSERT INTO Lms_Lesson_Doc (lesson_id, pdf_path, meeting_url) VALUES ?";
						db.query(sql, [newArr], function(err, data, fields) {
							if(err){
								res.json({
									status: null,
									message: err
								});
							}else{			
								res.json({
									status: 200,
									message: "Lesson Updated successfully.",
									data: id
								});						
							}
						})
					}else{
						res.json({
							status: 200,
							message: "Lesson Updated successfully."
						});	
					}
				});
			}else{
				var b =[], newArr=[], cnt=0;
				for(var i=0;i<req.body.docdata.length;i++){
					if(typeof req.body.docdata[i].row_id != 'number'){
						b.push(id);
						b.push('/uploads/lms/lesson/lesson_'+id+'_'+req.body.docdata[i].pdf_path);
						b.push(req.body.docdata[i].meeting_url);
						newArr.push(b);
						b=[];
						cnt++;
					}
				}
				if(cnt > 0){
					let sql = "INSERT INTO Lms_Lesson_Doc (lesson_id, pdf_path, meeting_url) VALUES ?";
					db.query(sql, [newArr], function(err, data, fields) {
						if(err){
							res.json({
								status: null,
								message: err
							});
						}else{			
							res.json({
								status: 200,
								message: "Lesson Updated successfully.",
								data: id
							});						
						}
					})
				}else{
					res.json({
						status: 200,
						message: "Lesson Updated successfully."
					});	
				}
			}
		})
	});
});

app.post('/addLMSClass',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "INSERT INTO Lms_Class (class_name, start_date, end_date, connection_link, description, course_id, instructor_id, created_by, created_on, class_status, class_type, category_id) VALUES ('"+req.body.class_name+"','"+req.body.start_date+"','"+req.body.end_date+"','"+req.body.connection_link+"','"+req.body.description+"','"+req.body.course_id+"','"+req.body.instructor_id+"','"+req.body.created_by+"','"+reqdte+"','Y','"+req.body.class_type+"','"+req.body.cat_id+"')";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Class Added successfully."
			});						
		}
	});
})

app.get('/getCourseFromCat/:id',function(req,res){
	let sql = "SELECT row_id, course_name FROM Lms_Course WHERE category_id = " + req.params.id +" AND course_status = 'Y'";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.post('/generateCode',function(req,res) {
	let sql = "INSERT INTO generateClassCode (course_name, class_start_date) VALUES ('"+req.body.course_name+"','"+req.body.class_start_date_mon_yr+"')";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data.insertId,
				message: "Code Generated Successfully"
			});						
		}
	});
})

app.post('/updateLMSClass',function(req,res){
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "UPDATE Lms_Class SET class_name = '"+req.body.class_name+"',course_id = '"+req.body.course_id+"',start_date = '"+req.body.start_date+"', end_date = '"+req.body.end_date+"', description = '"+req.body.description+"', modified_by = '"+req.body.modified_by+"', modified_on = '"+reqdte+"', class_type = '"+req.body.class_type+"', category_id = '"+req.body.cat_id+"' WHERE row_id="+req.body.row_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Class Updated successfully."
			});
		}
	});
});

app.post('/addTrainingClassDoc/:class_name/:cnt',lmsclassupload.single('image'),function(req,res){	
	res.json({
		status: 200,
		message: "Document Added successfully.",
		filepath: photopath
	});
})

app.get('/getLMSClass/:cnt',function(req,res){
	let sql;
	if(req.params.cnt == 'all'){
		sql = "SELECT *, CONCAT(a.row_id) AS class_id from Lms_Class a LEFT JOIN Lms_Course b ON a.course_id = b.row_id";
	}else if(req.params.cnt == 'Y'){
		sql = "SELECT * from Lms_Class WHERE class_status = '"+req.params.cnt+"'";
	}else{
		sql = "SELECT * from Lms_Class WHERE row_id = "+req.params.cnt;
	}

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getPaginatedClass/:id/:cnt',function(req,res){
	const limit = 10, page = req.params.cnt, offset = (page - 1) * limit;
	let sql = "SELECT *, a.created_on AS class_created_on, CONCAT(a.row_id) AS class_id from Lms_Class a LEFT JOIN Lms_Course b ON a.course_id = b.row_id WHERE a.created_by = "+req.params.id+" ORDER BY a.created_on DESC limit "+limit+" OFFSET "+offset;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let resp1 = data;
			let sql = "SELECT COUNT(*) AS total from Lms_Class WHERE created_by = " + req.params.id;
			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					res.json({
						status: 200,
						data: {
							data : resp1,
							total : data 
						},
						message: "Lists fetched successfully."
					});
				}
			})						
		}
	});
})

app.get('/getAllNewPaginatedClass/:cnt',function(req,res){
	const limit = 10, page = req.params.cnt, offset = (page - 1) * limit;
	let sql = "SELECT *, a.created_on AS class_created_on, CONCAT(a.row_id) AS class_id from Lms_Class a LEFT JOIN Lms_Course b ON a.course_id = b.row_id ORDER BY a.created_on DESC limit "+limit+" OFFSET "+offset;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let resp1 = data;
			let sql = "SELECT COUNT(*) AS total from Lms_Class";
			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					res.json({
						status: 200,
						data: {
							data : resp1,
							total : data 
						},
						message: "Lists fetched successfully."
					});
				}
			})						
		}
	});
})

app.get('/getAllLMSClass',function(req,res){
	let sql = "SELECT a.class_name, b.course_name, c.user_first_name, c.user_last_name, a.start_date, a.end_date, a.class_status, CONCAT(a.row_id) AS class_id from Lms_Class a LEFT JOIN Lms_Course b ON a.course_id = b.row_id LEFT JOIN users c ON a.instructor_id = c.user_id";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getPaginatedAllClass/:cnt',function(req,res){
	const limit = 10, page = req.params.cnt, offset = (page - 1) * limit;
	let sql = "SELECT a.class_name, b.course_name, c.user_first_name, c.user_last_name, a.start_date, a.end_date, a.class_status, CONCAT(a.row_id) AS class_id from Lms_Class a LEFT JOIN Lms_Course b ON a.course_id = b.row_id LEFT JOIN users c ON a.instructor_id = c.user_id ORDER BY a.created_on DESC limit "+limit+" OFFSET "+offset;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let resp1 = data;
			let sql = "SELECT COUNT(*) AS total from Lms_Class";
			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					res.json({
						status: 200,
						data: {
							data : resp1,
							total : data 
						},
						message: "Lists fetched successfully."
					});
				}
			})						
		}
	});
})

app.get('/getLMSClassLesson/:id',function(req,res){
	let sql = "SELECT a.row_id, a.lesson_name FROM Lms_Lesson a INNER JOIN Lms_Class b ON a.course_id = b.course_id WHERE b.row_id = " + req.params.id;
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "Lesson List fetched successfully."
			});						
		}
	});
})

app.post('/updateLessonStatus',function(req,res){
	let sql;
	sql = "SELECT * FROM Lms_Class_Lesson WHERE class_id = "+req.body.class_id+" AND lesson_id = "+req.body.lesson_id;
	db.query(sql, function(err, data, fields) {
		if(data.length > 0){
			sql = "UPDATE Lms_Class_Lesson SET lesson_status = '"+req.body.lesson_status+"' WHERE class_id="+req.body.class_id+" AND lesson_id="+req.body.lesson_id;
		}else{
			sql = "INSERT INTO Lms_Class_Lesson (class_id, lesson_id, instructor_id, lesson_status, completion_date) VALUES ('"+req.body.class_id+"','"+req.body.lesson_id+"','"+req.body.instructor_id+"','"+req.body.lesson_status+"',NOW())";
		}
		db.query(sql, function(err, data, fields) {
			if(err){
				res.json({
					status: null,
					message: err
				});
			}else{			
				res.json({
					status: 200,
					message: "Lesson Status Updated successfully."
				});						
			}
		});
	});
})

app.post('/updateLessonMenteeStatus',function(req,res){
	let sql = "INSERT INTO Lms_Class_Lesson (class_id, lesson_id, instructor_id, lesson_status, mentee_id, completion_date) VALUES ?";

	db.query(sql, [req.body.dtls], function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Lesson Status Updated successfully."
			});						
		}
	});
})

app.get('/getActiveLesson/:id',function(req,res){
	let sql = "SELECT lesson_status, lesson_id from Lms_Class_Lesson WHERE class_id = " + req.params.id;
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getActiveAllLesson/:id',function(req,res){
	let sql = "SELECT lesson_status, lesson_id from Lms_Class_Lesson WHERE lesson_status = 'Y' AND class_id = " + req.params.id;
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getLMSClassList/:id',function(req,res){
	let sql = "SELECT *, CONCAT(a.row_id) AS class_id from Lms_Class a LEFT JOIN Lms_Course b ON a.course_id = b.row_id WHERE a.created_by = " + req.params.id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.post('/changeLMSClassStatus',function(req,res) {
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "UPDATE Lms_Class SET class_status = '"+req.body.class_status+"', modified_by = '"+req.body.modified_by+"', modified_on = '"+reqdte+"' WHERE row_id="+req.body.row_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Class status changed successfully."
			});						
		}
	});
})

app.post('/addMenteeToClass',function(req,res) {
	if(req.body.vals.length == 0){
		let sql = "UPDATE Lms_Mentees SET mentee_status = 'N' WHERE class_id = "+req.body.class_id;
		db.query(sql, function(err, data, fields) {
			if(err){
				res.json({
					status: null,
					message: err
			   	});
			}else{			
				res.json({
					status: 200,
					message: "Mentees List has been updated successfully."
				});						
			}
		});
	}else{
		var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
		month < 10 ? mon = "0"+month : mon = month;
		dte < 10 ? dt = "0"+dte : dt = dte;
		var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

		let sql = "DELETE FROM Lms_Mentees WHERE class_id = "+req.body.class_id;

		db.query(sql, function(err, data, fields) {
			let sql = "INSERT INTO Lms_Mentees (mentee_id, mentee_first_name, mentee_last_name, instructor_id, class_id, category_id, course_id, created_by, added_on, mentee_status) VALUES?";

			db.query(sql, [req.body.vals], function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{			
					res.json({
						status: 200,
						message: "Mentees added successfully."
					});						
				}
			});
		})
	}
})

app.get('/getMentees/:instructor_id/:sns_id',function(req,res){
	let sql = "SELECT users.user_id, users.user_first_name, users.user_last_name, users.parent_id from users WHERE users.parent_id = " + req.params.instructor_id + " AND users.srs_id = " + req.params.sns_id+" AND users.status = 'Enable'";
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getLmsMentees/:class_id',function(req,res){
	let sql = "SELECT mentee_id AS user_id, mentee_first_name AS user_first_name, mentee_last_name AS user_last_name, instructor_id AS parent_id, mentee_status from Lms_Mentees WHERE class_id = "+req.params.class_id;
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/getLmsClassMentees/:class_id',function(req,res){
	let sql = "SELECT row_id, mentee_id, mentee_first_name, mentee_last_name, instructor_id from Lms_Mentees WHERE class_id = "+req.params.class_id+" AND mentee_status='Y'";
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		}
	});
})

app.get('/disableMentee/:user_id/:id',function(req,res) {
	var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
	month < 10 ? mon = "0"+month : mon = month;
	dte < 10 ? dt = "0"+dte : dt = dte;
	var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();

	let sql = "UPDATE Lms_Mentees SET mentee_status = 'N', modified_by = '"+req.params.user_id+"', modified_on = '"+reqdte+"' WHERE row_id="+req.params.id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "Class status changed successfully."
			});						
		}
	});
})

app.get('/getAllUpComingCourse',function(req,res){
	let sql = "SELECT * FROM Lms_Course a LEFT JOIN Lms_Class b ON a.row_id = b.course_id WHERE DATE(b.start_date) > DATE(NOW())";

	db.query(sql, function(err, data, fields) {
		let imgArr = [];
		for(var i=0;i<data.length;i++){
			if(data.length > 0){
				if(data[i].course_image_url){
					let buff = fs.readFileSync(__dirname+data[i].course_image_url);
					let base64data = buff.toString('base64');				
					data[i].course_image_url = 'data:image/jpeg;base64,' + base64data;
					imgArr.push(data[i]);
				}else{			
					data[i].course_image_url = '';
					imgArr.push(data[i]);
				}
			}
		}
		res.json({
			status: 200,
			data: imgArr,
			message: "List fetched successfully."
		});
	});
})

app.get('/getMyCourseForMentees/:id',function(req,res){
	let sql = "SELECT * FROM Lms_Mentees a LEFT JOIN Lms_Course b ON a.course_id = b.row_id LEFT JOIN Lms_Class c ON b.row_id = c.course_id WHERE DATE(c.end_date) > DATE(NOW()) AND a.mentee_id = "+req.params.id;
	db.query(sql, function(err, data, fields) {
		let imgArr = [];
		for(var i=0;i<data.length;i++){
			if(data.length > 0){
				if(data[i].course_image_url){
					let buff = fs.readFileSync(__dirname+data[i].course_image_url);
					let base64data = buff.toString('base64');				
					data[i].course_image_url = 'data:image/jpeg;base64,' + base64data;
					imgArr.push(data[i]);
				}else{			
					data[i].course_image_url = '';
					imgArr.push(data[i]);
				}
			}
		}
		res.json({
			status: 200,
			data: imgArr,
			message: "List fetched successfully."
		});
	});
})

app.post('/addLMSMenteeToCourse',function(req,res){
	let sql = "INSERT INTO Lms_Mentees (mentee_id, mentee_first_name, mentee_last_name, instructor_id, class_id, category_id, course_id, added_on, mentee_status) VALUES ('"+req.body.mentee_id+"','"+req.body.mentee_first_name+"','"+req.body.mentee_last_name+"','"+req.body.instructor_id+"','"+req.body.class_id+"','"+req.body.category_id+"','"+req.body.course_id+"',NOW(),'Y')";

	db.query(sql,function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				message: "You have been added successfully."
			});						
		}
	});
})

app.get('/getCourseDtls/:course_id/:class_id',function(req,res){
	let sql = "SELECT a.course_name, a.course_description, b.class_name, b.start_date, b.end_date, b.connection_link, b.description, c.lesson_name, c.lesson_description, (SELECT CONCAT(d.user_first_name,' ',d.user_last_name) FROM users d WHERE d.user_id = b.instructor_id) AS mentor_name, b.class_type FROM Lms_Course a Left JOIN Lms_Class b ON a.row_id = b.course_id LEFT JOIN Lms_Lesson c ON c.course_id = a.row_id WHERE b.row_id = "+ req.params.class_id +" AND a.row_id = "+ req.params.course_id;

	db.query(sql, function(err, data, fields) {
		res.json({
			status: 200,
			data: data,
			message: "List fetched successfully."
		});
	});
})

app.get('/getUpComingCourseForMentees/:id',function(req,res){
	let sql = "SELECT * FROM Lms_Mentees a LEFT JOIN Lms_Course b ON a.course_id = b.row_id LEFT JOIN Lms_Class c ON a.class_id = c.row_id WHERE a.mentee_id="+ req.params.id+" AND DATE(c.start_date) > DATE(NOW())";
	db.query(sql, function(err, data, fields) {
		let imgArr = [];
		for(var i=0;i<data.length;i++){
			if(data.length > 0){
				if(data[i].course_image_url){
					let buff = fs.readFileSync(__dirname+data[i].course_image_url);
					let base64data = buff.toString('base64');				
					data[i].course_image_url = 'data:image/jpeg;base64,' + base64data;
					imgArr.push(data[i]);
				}else{			
					data[i].course_image_url = '';
					imgArr.push(data[i]);
				}
			}
		}
		res.json({
			status: 200,
			data: imgArr,
			message: "List fetched successfully."
		});
		/* if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		} */
	});
})

app.get('/getUpComingCourseForMentors/:id',function(req,res){
	let sql = "SELECT * FROM Lms_Mentees a LEFT JOIN Lms_Course b ON a.course_id = b.row_id LEFT JOIN Lms_Class c ON a.class_id = c.row_id WHERE a.instructor_id="+ req.params.id +" AND DATE(c.start_date) > DATE(NOW())";
	db.query(sql, function(err, data, fields) {
		let imgArr = [];
		for(var i=0;i<data.length;i++){
			if(data.length > 0){
				if(data[i].course_image_url){
					let buff = fs.readFileSync(__dirname+data[i].course_image_url);
					let base64data = buff.toString('base64');				
					data[i].course_image_url = 'data:image/jpeg;base64,' + base64data;
					imgArr.push(data[i]);
				}else{			
					data[i].course_image_url = '';
					imgArr.push(data[i]);
				}
			}
		}
		res.json({
			status: 200,
			data: imgArr,
			message: "List fetched successfully."
		});
		/* if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		} */
	});
})

app.get('/getOnGoingCourseForMentees/:id',function(req,res){
	let sql = "SELECT * FROM Lms_Mentees a LEFT JOIN Lms_Course b ON a.course_id = b.row_id LEFT JOIN Lms_Class c ON a.class_id = c.row_id WHERE a.mentee_id="+ req.params.id+" AND DATE(c.start_date) <= DATE(NOW()) AND DATE(c.end_date) >= DATE(NOW())"; 
	/*AND a.mentee_status = 'Y'*/
	db.query(sql, function(err, data, fields) {
		let imgArr = [];
		for(var i=0;i<data.length;i++){
			if(data.length > 0){
				if(data[i].course_image_url){
					let buff = fs.readFileSync(__dirname+data[i].course_image_url);
					let base64data = buff.toString('base64');				
					data[i].course_image_url = 'data:image/jpeg;base64,' + base64data;
					imgArr.push(data[i]);
				}else{			
					data[i].course_image_url = '';
					imgArr.push(data[i]);
				}
			}
		}
		res.json({
			status: 200,
			data: imgArr,
			message: "List fetched successfully."
		});
		/* if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		} */
	});
})

app.get('/getOnGoingCourseForMentors/:id',function(req,res){
	let sql = "SELECT * FROM Lms_Mentees a LEFT JOIN Lms_Course b ON a.course_id = b.row_id LEFT JOIN Lms_Class c ON a.class_id = c.row_id WHERE a.instructor_id="+ req.params.id +" AND DATE(c.start_date) <= DATE(NOW()) AND DATE(c.end_date) >= DATE(NOW())";
	db.query(sql, function(err, data, fields) {
		/* if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List fetched successfully."
			});						
		} */
		let imgArr = [];
		for(var i=0;i<data.length;i++){
			if(data.length > 0){
				if(data[i].course_image_url){
					let buff = fs.readFileSync(__dirname+data[i].course_image_url);
					let base64data = buff.toString('base64');				
					data[i].course_image_url = 'data:image/jpeg;base64,' + base64data;
					imgArr.push(data[i]);
				}else{			
					data[i].course_image_url = '';
					imgArr.push(data[i]);
				}
			}
		}
		res.json({
			status: 200,
			data: imgArr,
			message: "List fetched successfully."
		});
	});
})

app.get('/getMenteesCourse/:id',function(req,res){
	let sql = "SELECT * FROM Lms_Mentees a LEFT JOIN Lms_Course b ON a.course_id = b.row_id LEFT JOIN Lms_Class c ON a.class_id = c.row_id WHERE a.mentee_id="+ req.params.id+" AND DATE(c.start_date) <= DATE(NOW()) AND DATE(c.end_date) >= DATE(NOW())"; 
	/*AND a.mentee_status = 'Y'*/
	db.query(sql, function(err, data, fields) {
		let imgArr = [];
		for(var i=0;i<data.length;i++){
			if(data.length > 0){
				if(data[i].course_image_url){
					let buff = fs.readFileSync(__dirname+data[i].course_image_url);
					let base64data = buff.toString('base64');				
					data[i].course_image_url = 'data:image/jpeg;base64,' + base64data;
					imgArr.push(data[i]);
				}else{			
					data[i].course_image_url = '';
					imgArr.push(data[i]);
				}
			}
		}
		res.json({
			status: 200,
			data: imgArr,
			message: "List fetched successfully."
		});
	});
})

app.get('/getOnGoingCourseForMentors/:id',function(req,res){
	let sql = "SELECT * FROM Lms_Course a LEFT JOIN Lms_Class b ON a.row_id = b.course_id WHERE b.instructor_id="+ req.params.id +" AND DATE(b.start_date) <= DATE(NOW()) AND DATE(b.end_date) >= DATE(NOW())"
	db.query(sql, function(err, data, fields) {
		let imgArr = [];
		for(var i=0;i<data.length;i++){
			if(data.length > 0){
				if(data[i].course_image_url){
					let buff = fs.readFileSync(__dirname+data[i].course_image_url);
					let base64data = buff.toString('base64');				
					data[i].course_image_url = 'data:image/jpeg;base64,' + base64data;
					imgArr.push(data[i]);
				}else{			
					data[i].course_image_url = '';
					imgArr.push(data[i]);
				}
			}
		}
		res.json({
			status: 200,
			data: imgArr,
			message: "List fetched successfully."
		});
	});
})

app.get('/downloadPDF/:id', function(req, res){
	let sql = "SELECT document_url from Lms_Class WHERE row_id = "+req.params.id;
	db.query(sql, function(err, data, fields) {
  		const file = data[0].document_url;
  		fs.readFile(__dirname + file , function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });
	});
});

app.get('/downloadLessonPDF/:id', function(req, res){
	let sql = "SELECT pdf_path FROM Lms_Lesson_Doc WHERE lesson_id = '"+req.params.id+"'";
	db.query(sql, function(err, data, fields) {
  		const file = data[0].pdf_path;
  		fs.readFile(__dirname + file , function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });
	});
});

app.get('/getCourseDetailsForMentees/:id/:user_id/:class_id',function(req,res){
	//let sql = "SELECT *, CONCAT(b.row_id) AS class_id FROM Lms_Course a INNER JOIN Lms_Class b ON a.row_id = b.course_id INNER JOIN users c ON b.instructor_id = c.parent_id WHERE a.row_id = '"+ req.params.id+"' AND c.user_id = '"+ req.params.user_id+"'";

	let sql = "SELECT *, CONCAT(b.row_id) AS class_id, (SELECT d.course_description FROM Lms_Course d WHERE d.row_id = b.course_id) AS course_description FROM Lms_Class b WHERE b.course_id = '"+ req.params.id+"' AND b.row_id = " + req.params.class_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "Details fetched successfully."
			});						
		}
	});
})

app.get('/getCourseDetailsForMentor/:id/:user_id',function(req,res){
	let sql = "SELECT *, CONCAT(b.row_id) AS class_id FROM Lms_Course a INNER JOIN Lms_Class b ON a.row_id = b.course_id INNER JOIN users c ON b.instructor_id = "+ req.params.user_id+" WHERE a.row_id = "+ req.params.id+" AND c.user_id = "+ req.params.user_id;
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "Details fetched successfully."
			});						
		}
	});
})

app.get('/getLessonsForMentees/:id',function(req,res){
	let sql = "SELECT * FROM Lms_Lesson WHERE course_id = "+ req.params.id;
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "Details fetched successfully."
			});						
		}
	});
})

app.get('/getLessonsForMenteesDashboard/:id',function(req,res){
	let sql = "SELECT * FROM Lms_Lesson WHERE lesson_status = 'Y' AND course_id = "+ req.params.id;
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "Details fetched successfully."
			});						
		}
	});
})
 
app.get('/getPaginatedMentors/:cnt',function(req,res){
	const limit = 10, page = req.params.cnt, offset = (page - 1) * limit;

	let sql = "SELECT user_id, user_first_name, user_last_name, user_created_date, status, (SELECT COUNT(*) AS total from users WHERE role_id != 10) AS total FROM users WHERE role_id != 10 AND status != 'Pending' AND status != 'Disapprove' ORDER BY user_created_date DESC limit "+limit+" OFFSET "+offset;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data: data,
				message: "Details fetched successfully."
			});					
		}
	});
})

app.get('/getPaginatedMentees/:cnt',function(req,res){
	const limit = 10, page = req.params.cnt, offset = (page - 1) * limit;

	let sql = "SELECT user_id, user_first_name, user_last_name, user_created_date, status, (SELECT COUNT(*) AS total from users WHERE role_id = 10) AS total FROM users WHERE role_id = 10 AND status != 'Pending' AND status != 'Disapprove' ORDER BY user_created_date DESC limit "+limit+" OFFSET "+offset;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data: data,
				message: "Details fetched successfully."
			});				
		}
	});
})

app.get('/getPaginatedPending/:cnt',function(req,res){
	const limit = 10, page = req.params.cnt, offset = (page - 1) * limit;

	let sql = "SELECT b.user_id, b.user_first_name, b.role_id, b.user_last_name, b.user_created_date, b.user_contact_number, b.user_email_id, b.status, (SELECT COUNT(*) AS total from users c WHERE c.status = 'Pending') AS total, (SELECT role_name AS role_name from roles a WHERE a.role_id = b.role_id) AS role_name FROM users b WHERE b.status = 'Pending' ORDER BY b.user_created_date DESC limit "+limit+" OFFSET "+offset;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data: data,
				message: "Details fetched successfully."
			});				
		}
	});
})

app.get('/changeStatus/:type/:id',function(req,res){
	let status;
	(req.params.type == 'A') ? status = 'Enable' : status = 'Disapprove';

	let sql = "UPDATE users SET status = '"+status+"' WHERE user_id="+req.params.id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data: data,
				message: "User status changed successfully."
			});				
		}
	});
})

app.get('/getPaginatedSpecificUsers/:type/:id/:cnt',function(req,res){
	const limit = 10, page = req.params.cnt, offset = (page - 1) * limit; let sql;
	if(req.params.type == 'M'){
		sql = "SELECT a.user_id, a.user_first_name, a.user_last_name, a.user_created_date,a.status, b.role_name, c.srs_name, CONCAT(d.user_first_name, ' ', d.user_last_name) AS mentor_name FROM users a INNER JOIN roles b ON a.role_id = b.role_id LEFT JOIN srs_branch c ON a.srs_id = c.srs_id LEFT JOIN users d ON d.user_id = a.parent_id WHERE a.parent_id = "+req.params.id+" ORDER BY a.user_first_name, a.user_last_name DESC limit "+limit+" OFFSET "+offset;
	}else{
		sql = "SELECT a.user_id, a.user_first_name, a.user_last_name, a.user_created_date,a.status, b.role_name, c.srs_name, CONCAT(d.user_first_name, ' ', d.user_last_name) AS mentor_name FROM users a INNER JOIN roles b ON a.role_id = b.role_id LEFT JOIN srs_branch c ON a.srs_id = c.srs_id LEFT JOIN users d ON d.user_id = a.parent_id WHERE a.srs_id = "+req.params.id+" ORDER BY a.user_first_name, a.user_last_name DESC limit "+limit+" OFFSET "+offset;
	}

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let resp1 = data;
			if(req.params.type == 'M'){
				sql = "SELECT COUNT(*) AS total from users WHERE parent_id = "+req.params.id;
			}else{
				sql = "SELECT COUNT(*) AS total from users WHERE srs_id = "+req.params.id;
			}
			db.query(sql, function(err, data, fields) {
				if(err){
					res.json({
						status: null,
						message: err
				   	});
				}else{
					res.json({
						status: 200,
						data: {
							data : resp1,
							total : data 
						},
						message: "Details fetched successfully."
					});
				}
			})					
		}
	});
})

app.post('/filterUserList',function(req,res){
	let sql;
	sql = "SELECT user_id, user_first_name, user_last_name, user_created_date, status FROM users WHERE status != 'Pending' AND status != 'Disapprove' AND ";
	if(req.body.type == 'mentor'){
		sql = sql + "( user_first_name LIKE '%" + req.body.name + "%' OR user_last_name LIKE '%" + req.body.name + "%' )"
	}else if(req.body.type == 'mentee'){
		sql = sql + "( user_first_name LIKE '%" + req.body.mentee_name + "%' OR user_last_name LIKE '%" + req.body.mentee_name + "%' )"
	}else{
		sql = "SELECT b.user_id, b.user_first_name, b.role_id, b.user_last_name, b.user_created_date, b.user_contact_number, b.user_email_id, b.status, (SELECT COUNT(*) AS total from users c WHERE c.status = 'Pending') AS total, (SELECT role_name AS role_name from roles a WHERE a.role_id = b.role_id) AS role_name FROM users b WHERE b.status = 'Pending' AND ( user_first_name LIKE '%" + req.body.user_name + "%' OR user_last_name LIKE '%" + req.body.user_name + "%' )"
	}

	sql =  sql + " ORDER BY user_created_date DESC";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "List Fetched Successfully."
			});
		}
	});
});

app.post('/lms-visitors',function(req,res){
	let sql = "INSERT INTO visitors_contact (visitor_name, visitor_email_id, visitor_subject, visitor_contact_number, message, created_date) VALUES ('"+req.body.visitor_name+"','"+req.body.visitor_email_id+"','"+req.body.visitor_subject+"','"+req.body.visitor_contact_number+"','"+req.body.message+"', NOW())";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let param ={
				"visitor_name" : req.body.visitor_name,
				"visitor_email_id" : req.body.visitor_email_id,
				"visitor_contact_number" : req.body.visitor_contact_number,
				"message" : req.body.message
			}
			var description = contact_email.lmscontact(param);

		   	var mailOptions={
		        to : req.body.visitor_email_id,
		        cc : 'nayana@vecan.co',
				subject : req.body.visitor_subject,
				html : description
		    }

		    mailerdetails.sendMail(mailOptions, function(error, response){
			    if(error){
			        res.json({
						status: 200,
						message: error
					});
			    }else{
			        res.json({
						status: 200,
						message: "Message has been sent successfully."
					});
			    }
			});
		}
	});
});

app.post('/forgotpassword',function(req,res){
	let sql = "SELECT * FROM users WHERE user_email_id = '"+req.body.email_id+"'";
	db.query(sql, function(err, data, fields) {
		if(data.length > 0){
			let param = {
				redirectlink : constant.forgotredirectlink,
				url : req.body.url
			}
			var description = get_password.forgot_password(param);

		   	var mailOptions={
		        to: req.body.email_id,
		        cc: 'nayana@vecan.co',
				subject: 'PadahWeb - Forgot your Password',
				html: description
		    }

		    mailerdetails.sendMail(mailOptions, function(error, response){
			    if(error){
			        res.json({
			        	status:201,
			        	message:response,
			        	data:error
			        });
			    }else{
			        res.json({
						status: 200,
						message: "Email is sent successfully. Kindly check your Spam or Inbox for the same."
				   	});
			    }
			});
		}else{
			res.json({
	        	status:201,
	        	message: "No User with such Email Id exists"
	        });
		}		
	})
});

app.post('/resetpassword',function(req,res){
	let sql = "UPDATE users_password SET user_password = '"+req.body.password+"' WHERE user_email_id='"+req.body.email_id+"'";
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				message: "Your password has been resetted successfully."
		   	});
		}
	})
})

app.get('/getLessonsActivityForMentees/:class_id',function(req,res){
	let sql = "SELECT * FROM Lms_Class_Lesson WHERE class_id = '"+req.params.class_id+"'";
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "List fetched successfully."
		   	});
		}
	})
})

app.get('/getLessonsActivityForMentees/:class_id',function(req,res){
	let sql = "SELECT * FROM Lms_Class_Lesson WHERE class_id = '"+req.params.class_id+"'";
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "List fetched successfully."
		   	});
		}
	})
})

app.get('/getMenteeIDForClass/:class_id',function(req,res){
	let sql = "SELECT mentee_id FROM Lms_Mentees WHERE class_id = '"+req.params.class_id+"' AND mentee_status = 'Y'";
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "List fetched successfully."
		   	});
		}
	})
})

app.get('/getMenteeStatusForClass/:class_id/:user_id',function(req,res){
	let sql = "SELECT mentee_status FROM Lms_Mentees WHERE class_id = '"+req.params.class_id+"' AND mentee_id = '"+req.params.user_id+"'";
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "Status fetched successfully."
		   	});
		}
	})
})

app.get('/getDocsForLesson/:lesson_id',function(req,res){
	let sql = "SELECT lesson_id, pdf_path, meeting_url FROM Lms_Lesson_Doc WHERE lesson_id = '"+req.params.lesson_id+"'";
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "Status fetched successfully."
		   	});
		}
	})
})

app.get('/gethreeStepsForLessons/:lesson_id',function(req,res){
	let sql = "SELECT b.video_title, b.video_url FROM Lms_Lesson_Video b WHERE b.lesson_id = '"+req.params.lesson_id+"'";
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "Status fetched successfully."
		   	});
		}
	})
})

app.get('/getLssAssessment/:lesson_id',function(req,res){
	let sql = "SELECT row_id FROM assessment WHERE lesson_id = '"+req.params.lesson_id+"' AND status = 'Y'";
	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data[0],
				message: "Assessment ID fetched successfully."
		   	});
		}
	})
})

app.get('/getQuiz/:ass_id',function(req,res){
	let sql = "SELECT a.question, a.row_id, b.row_id AS answer_id, (SELECT b.options FROM quiz_answers b WHERE b.quiz_id = a.row_id AND b.is_answer = 'Y') AS answer, b.options, b.is_answer FROM quiz a INNER JOIN quiz_answers b ON a.row_id = b.quiz_id WHERE a.status = 'Y' AND a.assessment_id = " + req.params.ass_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			let reqArr = [], rslt = data, arr = [], b = [], obj = new Object(), cntr=0;
			for(var i=0; i<rslt.length; i++){
				cntr++;
				obj.question = rslt[i].question;
				obj.quiz_id = rslt[i].row_id;
				obj.answer = rslt[i].answer;
				arr.push({
					options: rslt[i].options,
					option_id: rslt[i].answer_id,
					is_answer: rslt[i].is_answer
				})
				if(cntr == 4){
					obj.options = arr; reqArr.push(obj);
					obj = {}; arr = []; cntr=0;
				}
			}
			res.json({
				status: 200,
				data:reqArr,
				message: "Assessment fetched successfully."
		   	});
		}
	})
})

/* Notes */
app.post('/addNotes',function(req,res){
	let sql = "INSERT INTO notes (class_id, user_id, course_id, content, title, notes_status) VALUES ('"+req.body.class_id+"','"+req.body.user_id+"','"+req.body.course_id+"','"+req.body.content+"','"+req.body.title+"','Y')";
	
	db.query(sql, function(err, data, fields) {			
		if(err){
			res.json({
				status: null,
				message: err
			});
		}else{
			res.json({
				status: 200,
				message: "Notes added successfully."
			});
		}			
	})
})

app.post('/updateNotes',function(req,res){
	let sql = "UPDATE notes SET content = '"+req.body.content+"', title = '"+req.body.title+"' WHERE row_id="+req.body.row_id;
	
	db.query(sql, function(err, data, fields) {			
		if(err){
			res.json({
				status: null,
				message: err
			});
		}else{
			res.json({
				status: 200,
				message: "Notes updated successfully."
			});
		}			
	})
}) 

app.post('/changeNoteStatus',function(req,res){
	let sql = "UPDATE notes SET notes_status = '"+req.body.notes_status+"' WHERE row_id="+req.body.note_id;
	
	db.query(sql, function(err, data, fields) {			
		if(err){
			res.json({
				status: null,
				message: err
			});
		}else{
			res.json({
				status: 200,
				message: "Notes removed successfully."
			});
		}			
	})
})

app.get('/getNotes/:user_id/:class_id/:course_id',function(req,res){
	let sql;
	if(req.params.user_id == 0){
		sql = "SELECT * FROM notes WHERE row_id = "+req.params.course_id;
	}else{
		sql = "SELECT * FROM notes WHERE user_id = "+req.params.user_id+" AND class_id = "+req.params.class_id+" AND notes_status = 'Y'";
	}

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "List fetched successfully."
		   	});
		}
	})
})

app.get('/isJoined/:user_id/:class_id/:course_id',function(req,res){
	let sql = "SELECT EXISTS(SELECT * FROM Lms_Mentees WHERE mentee_id = '"+req.params.user_id+"' AND class_id = '"+req.params.class_id+"' AND course_id = '"+req.params.course_id+"')  AS count";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "List fetched successfully."
		   	});
		}
	})
})

/* Socket
io.sockets.on('connection', (socket) => {  
	console.log('a user connected');
	socket.on('message', (msg) => {
		debugger;
		console.log(msg);
		socket.broadcast.emit('message-broadcast', msg);
	});
}); */

/* const users = {};
io.on('connection', (socket) => {  
	socket.on('new-user-joined', (name) => {
		users[socket.id] = name;
		socket.broadcast.emit('user-joined', name);
	});

	socket.on('send', (message) => {
		debugger;
		console.log(message);
		socket.broadcast.emit('receive', {
			message: message,
			name: users[socket.id]
		});
	});
}); */

const users = {};
io.sockets.on('connection', (socket) => {  
	socket.on('new-user-joined', (name) => {
		console.log("New User", name);
		users[socket.id] = name;
		socket.broadcast.emit('user-joined', name);
	});

	socket.on('send', (message) => {
		console.log(message);
		socket.broadcast.emit('receive', {
			message: message,
			name: users[socket.id]
		});
	});
});

/* Assessment */
app.post('/addAssessment',function(req,res){
	let sql = "INSERT INTO quiz (question, status, quiz_created_by, assessment_id) VALUES ('"+req.body.question+"','Y',"+req.body.user_id+","+req.body.row_id+")";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "Question created successfully"
		   	});
		}
	})
})

app.post('/addAssessmentOptions',function(req,res){
	let sql = "INSERT INTO quiz_answers (quiz_id, options, is_answer) VALUES ?";

	db.query(sql, [req.body.vals], function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{			
			res.json({
				status: 200,
				data: data,
				message: "Question created successfully"
			});						
		}
	});
})

app.get('/getAssessment/:type',function(req,res){
	let url;
	if(req.params.type == 'all'){
		url = "SELECT *, (SELECT a.lesson_name FROM Lms_Lesson a WHERE a.row_id = c.lesson_id) AS lesson_name, (SELECT CONCAT(b.user_first_name,' ',b.user_last_name) FROM users b WHERE b.user_id = c.created_by) AS name FROM assessment c";
	}else if(req.params.type == 'A'){
		url = "SELECT a.question, a.row_id, b.row_id AS answer_id, (SELECT b.options FROM quiz_answers b WHERE b.quiz_id = a.row_id AND b.is_answer = 'Y') AS answer, b.options, b.is_answer FROM quiz a INNER JOIN quiz_answers b ON a.row_id = b.quiz_id WHERE a.status = 'Y'";
	}else{
		//url = "SELECT a.question, a.row_id, b.row_id AS answer_id, b.options, b.is_answer FROM quiz a, quiz_answers b, assessment c WHERE a.row_id = " + req.params.type + " AND b.quiz_id = " + req.params.type;
		url = "SELECT *, b.lesson_name, b.row_id AS lss_id FROM assessment a LEFT JOIN Lms_Lesson b ON a.lesson_id = b.row_id WHERE a.row_id = " + req.params.type;
	}

	db.query(url, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "List fetched successfully"
		   	});
		}
	})
});

app.get('/getQuestion/:type',function(req,res){
	//let url = "SELECT a.question, a.row_id, b.row_id AS answer_id, b.options, b.is_answer FROM quiz a, quiz_answers b WHERE a.row_id = " + req.params.type + " AND b.quiz_id = " + req.params.type;
	let url;
	if(req.params.type == 'all'){
		url = "SELECT a.question, a.row_id, b.row_id AS answer_id, (SELECT b.options FROM quiz_answers b WHERE b.quiz_id = a.row_id AND b.is_answer = 'Y') AS answer, b.options, b.is_answer FROM quiz a INNER JOIN quiz_answers b ON a.row_id = b.quiz_id WHERE a.status = 'Y'";
	}else{
		url = "SELECT a.question, a.row_id, b.row_id AS answer_id, b.options, b.is_answer FROM quiz a, quiz_answers b WHERE a.row_id = " + req.params.type + " AND b.quiz_id = " + req.params.type;
	}

	db.query(url, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			//if(req.params.type == 'A'){
				let reqArr = [], rslt = data, arr = [], b = [], obj = new Object(), cntr=0;
				for(var i=0; i<rslt.length; i++){
					cntr++;
					obj.question = rslt[i].question;
					obj.quiz_id = rslt[i].row_id;
					obj.answer = rslt[i].answer;
					arr.push({
						options: rslt[i].options,
						option_id: rslt[i].answer_id,
						is_answer: rslt[i].is_answer
					})
					if(cntr == 4){
						obj.options = arr; reqArr.push(obj);
						obj = {}; arr = []; cntr=0;
					}
				}
				res.json({
					status: 200,
					data: reqArr,
					message: "Details fetched successfully"
				});
			/*}else{
				res.json({
					status: 200,
					data: data,
					message: "Details fetched successfully"
				});
			} */
		}
	})
})

/* app.get('/getQuestion/:type',function(req,res){
	let url;
	if(req.params.type == 'all'){
		url = "SELECT a.row_id, a.question, a.status, (SELECT b.options FROM quiz_answers b WHERE b.quiz_id = a.row_id AND b.is_answer = 'Y') AS answer FROM quiz a";
	}else if(req.params.type == 'A'){
		url = "SELECT a.question, a.row_id, b.row_id AS answer_id, (SELECT b.options FROM quiz_answers b WHERE b.quiz_id = a.row_id AND b.is_answer = 'Y') AS answer, b.options, b.is_answer FROM quiz a INNER JOIN quiz_answers b ON a.row_id = b.quiz_id WHERE a.status = 'Y'";
	}else{
		url = "SELECT a.question, a.row_id, b.row_id AS answer_id, b.options, b.is_answer FROM quiz a, quiz_answers b WHERE a.row_id = " + req.params.type + " AND b.quiz_id = " + req.params.type;
	}

	db.query(url, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			if(req.params.type == 'A'){
				let reqArr = [], rslt = data, arr = [], b = [], obj = new Object(), cntr=0;
				for(var i=0; i<rslt.length; i++){
					cntr++;
					obj.question = rslt[i].question;
					obj.quiz_id = rslt[i].row_id;
					obj.answer = rslt[i].answer;
					arr.push({
						options: rslt[i].options,
						option_id: rslt[i].answer_id,
						is_answer: rslt[i].is_answer
					})
					if(cntr == 4){
						obj.options = arr; reqArr.push(obj);
						obj = {}; arr = []; cntr=0;
					}
				}
				res.json({
					status: 200,
					data: reqArr,
					message: "Details fetched successfully"
				});
			}else{
				res.json({
					status: 200,
					data: data,
					message: "Details fetched successfully"
				});
			}
		}
	})
}) */

app.post('/updateStatusAssessment',function(req,res){
	let sql = "UPDATE assessment SET status = '"+req.body.status+"' WHERE row_id = "+ req.body.row_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "Status updated successfully"
		   	});
		}
	})
})

app.post('/disableQuestion',function(req,res){
	let sql = "UPDATE quiz SET status = '"+req.body.questionstatus+"' WHERE row_id = "+ req.body.row_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "Status updated successfully"
		   	});
		}
	})
})

app.post('/updateAssessment',function(req,res){
	let sql = "UPDATE quiz SET question = '"+req.body.question+"' WHERE row_id = "+ req.body.row_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "Details updated successfully"
		   	});
		}
	})
})

app.post('/updateAssessmentAnswer',function(req,res){
	var request = req.body.vals;
	//let sql = "UPDATE quiz_answers SET options = '"+request[0][1]+"', is_answer = '"+request[0][2]+"' WHERE row_id = "+ request[0][0] + "; UPDATE quiz_answers SET options = '"+request[1][1]+"', is_answer = '"+request[1][2]+"' WHERE row_id = "+ request[1][0] + "; UPDATE quiz_answers SET options = '"+request[2][1]+"', is_answer = '"+request[2][2]+"' WHERE row_id = "+ request[2][0] + "; UPDATE quiz_answers SET options = '"+request[3][1]+"', is_answer = '"+request[3][2]+"' WHERE row_id = "+ request[3][0] + ";"
	let sql = "UPDATE quiz_answers SET options = (case when row_id = "+ request[0][0] + " then '"+request[0][1]+"' when row_id = "+ request[1][0] + " then '"+request[1][1]+"' when row_id = "+ request[2][0] + " then '"+request[2][1]+"' when row_id = "+ request[3][0] + " then '"+request[3][1]+"' end), is_answer = (case when row_id = "+ request[0][0] + " then '"+request[0][2]+"' when row_id = "+ request[1][0] + " then '"+request[1][2]+"' when row_id = "+ request[2][0] + " then '"+request[2][2]+"' when row_id = "+ request[3][0] + " then '"+request[3][2]+"' end) WHERE row_id in ("+ request[0][0] + ", "+ request[1][0] + ", "+ request[2][0] + ", "+ request[3][0] + ")"

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "Details updated successfully"
		   	});
		}
	})
})

app.get('/getActiveLesson',function(req,res){
	let sql = "SELECT lesson_name, row_id from Lms_Lesson WHERE lesson_status = 'Y'";

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "List fetched successfully"
		   	});
		}
	})
})

app.get('/certificate/:user_id/:class_id/:course_id',function(req,res){
	let sql = "SELECT a.mentee_first_name, a.mentee_last_name, b.end_date, c.course_name FROM Lms_Mentees a LEFT JOIN Lms_Class b ON a.class_id = b.row_id LEFT JOIN Lms_Course c ON a.course_id = c.row_id WHERE a.mentee_id = " + req.params.user_id + " AND a.class_id = " + req.params.class_id + " AND a.course_id = " + req.params.course_id;

	db.query(sql, function(err, data, fields) {
		if(err){
			res.json({
				status: null,
				message: err
		   	});
		}else{
			res.json({
				status: 200,
				data:data,
				message: "Details fetched successfully."
		   	});
		}
	})
})


//httpServer.listen(webSocketPort, () => console.log(`Example app listening on port ${webSocketPort}!`));
app.listen(port, () => console.log(`API listening on port ${port}!`));
