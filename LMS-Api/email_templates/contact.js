module.exports = {
	contact: function(param) {
		return(
			"<h3>You have got a new visitor</h3>"+
			"<p>The details of the visitor are as belows :- </p>"+
			"<table>"+
			"<tr><td>Visitor's Name</td><td>"+param.visitor_name+"</td></tr>"+
			"<tr><td>Visitor's Email ID</td><td>"+param.visitor_email_id+"</td></tr>"+
			"<tr><td>Visitor's Contact No.</td><td>"+param.visitor_contact_number+"</td></tr>"+
			"<tr><td>Visitor's Country</td><td>"+param.visitor_state+"</td></tr>"+
			"<tr><td>Visitor's City</td><td>"+param.visitor_city+"</td></tr>"+
			"<tr><td>Visitor's Pincode</td><td>"+param.visitor_pincode+"</td></tr>"+
			"<tr><td>Message</td><td>"+param.message+"</td></tr>"+
			"</table>"
		)
	},
	lmscontact: function(param) {
		return(
			"<h3>You have got a new visitor</h3>"+
			"<p>The details of the visitor are as belows :- </p>"+
			"<table>"+
			"<tr><td>Visitor's Name</td><td>"+param.visitor_name+"</td></tr>"+
			"<tr><td>Visitor's Email ID</td><td>"+param.visitor_email_id+"</td></tr>"+
			"<tr><td>Visitor's Contact No.</td><td>"+param.visitor_contact_number+"</td></tr>"+
			"<tr><td>Message</td><td>"+param.message+"</td></tr>"+
			"</table>"
		)
	},
	enquiry: function(param) {
		return(
			"<h3>You have got a new Enquiry</h3>"+
			"<p>The details of the visitor are as belows :- </p>"+
			"<table>"+
			"<tr><td>Visitor's Name</td><td>"+param.visitor_name+"</td></tr>"+
			"<tr><td>Visitor's Email ID</td><td>"+param.visitor_email_id+"</td></tr>"+
			"<tr><td>Message</td><td>"+param.message+"</td></tr>"+
			"</table>"
		)
	}
}