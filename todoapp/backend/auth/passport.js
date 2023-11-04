//js
const bcrypt = require("bcrypt");
LocalStrategy = require("passport-local").Strategy;
//Load model
const User = require("../models/user");
const loginCheck = passport => {
	passport.use(
		new LocalStrategy({ usernameField: "email" ,passReqToCallBack: true}, (email, password, done) => {
		//Check customer
		
		User.findByEmail(email)
			.then((user) => {
			if (!user) {
				return done(null, false, { message: 'Incorrect email or password.' });
			}
			//Match Password
			bcrypt.compare(password, user.password, (error, isMatch) => {
				if (error) throw error;
				if (isMatch) {
					return done(null, user);
				} 
				else {
					return done(null, false, { message: 'Incorrect email or password.' });
				}
			});
			})
			.catch((error) => console.log(error));
		})
	);
	//  If successfully verified, Passport will call the serializeUser function
	passport.serializeUser((user, done) => {
		console.log("serialized");
		done(null, user.user_id);
	});
	// When the session is authenticated, Passport will call the deserializeUser function
	passport.deserializeUser((user_id, done) => {
		User.findById(user_id).then((user) => {
			// console.log(error[0] + "HEY");
			done(null,user)
		}).catch(done);
	});
};





module.exports = {
	loginCheck,
};