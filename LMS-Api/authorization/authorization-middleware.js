const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = (credentials = []) => {
	return (req, res, next) => {
		const token = req.headers['authorization'];

		// Allow for a string or array
		if(typeof credentials === 'string'){
			credentials = [credentials]
		}

		if(token){
			// Validate JWT
			const tokenBody = token.slice(7);
			jwt.verify(tokenBody,config.JWT_SECRET,(err,decoded) => {
				if(err){
					res.json({
						status: 403,
						message: "Access Denied. You are not authorized to access without logging in."
					});
				}else{
					if(decoded){
						if(credentials.length > 0){
							if(
								decoded.scopes &&
								decoded.scopes.length && 
								credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)
							){
								next();
							}else{
								res.json({
									status: 403,
									message: "Access Denied. You are not authorized to access without logging in."
								});
							}
						}else{
							next();
						}
					}else{
						res.json({
							status: 403,
							message: "Access Denied. You are not authorized to access without logging in."
						});
					}
				}
			});
		}else{
			res.json({
				status: 403,
				message: "Access Denied. You are not authorized to access without logging in."
			});
		}
	}
}


