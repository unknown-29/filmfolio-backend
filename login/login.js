const express = require('express');
const { User } = require('../db/schemas');
const app = express();
const router = express.Router();
router.use(express.json());
router.route('/').post(async (req, res) => {
	// //console.log(req.body);
	try {
		const data = await User.find({
			username: req.body.username,
		});
		if (data.length == 0) {
			res.statusCode = 404;
			res.end('username not found');
		} else if (data[0].password == req.body.password) {
			req.session.username = req.body.username;
			res.statusCode = 200;
			
			// localStorage.setItem('username',req.session.username);
			setTimeout(()=>{res.end(`hello ${req.body.username}`);},1000);
			
			
		} else {
			res.statusCode = 404;
			res.end('incorrect password');
		}
		// //console.log(req.session);
	} catch (error) {
		res.statusCode = 404;
		res.end(`error: ${error}`);
	}
});
module.exports.router = router;
