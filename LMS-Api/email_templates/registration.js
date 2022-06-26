module.exports = {
	event_register: function(param) {
		return(
			"<h3>Welcome to PadahWeb</h3>"+
			"<p>You have successfully your for the event. The event details are as follows :- </p>"+
			"<table>"+
			"<tr><td>Event Name</td><td>"+param.event_name+"</td></tr>"+
			"<tr><td>Event Date</td><td>"+param.event_start_date+"</td></tr>"+
			"<tr><td>Event Time</td><td>"+param.event_start_time+"</td></tr>"+
			"<tr><td>Event Venue</td><td>"+param.venue_name+"</td></tr>"+
			"</table>"
		)
	},

	event_register_link: function(param) {
		return(
			"<h3>Welcome to PadahWeb</h3>"+
			"<p>You have successfully your for the event. The event details are as follows :- </p>"+
			"<table>"+
			"<tr><td>Event Name</td><td>"+param.event_name+"</td></tr>"+
			"<tr><td>Event Date</td><td>"+param.event_start_date+"</td></tr>"+
			"<tr><td>Event Time</td><td>"+param.event_start_time+"</td></tr>"+
			"<tr><td>Event Venue</td><td>"+param.venue_name+"</td></tr>"+
			"<tr><td>Meeting Link</td><td><a href='"+param.connection_link+"'>"+param.connection_link+"</td></tr>"+
			"</table>"
		)
	},

	mentee_register: function(param) {
		return(
			'<h3>Welcome to PadahWeb</h3>'+
			'<p>Please click on the below link to register yourself as an Instructor.</p>'+
			'<a href="'+param.redirectlink + param.url+'">Click Here !!</a>'
		)
	},

	user_register: function(param) {
		return(
			'<h3>Welcome to PadahWeb</h3>'+
			'<p>You have been successfully registered at PadahWeb. Below are your login details :-</p>'+
			"<table>"+
			"<tr><td>Email ID</td><td>"+param.email_id+"</td></tr>"+
			"<tr><td>Password</td><td>"+param.password+"</td></tr>"+
			"</table>"
		)
	}
}