var tokens = require('csrf')
const data = new tokens({
    saltLength: 10,
    secretLength: 18,
});
const secret = data.secretSync();

const generateCSRFToken = (req, res, next) => {
    try {
        if(!req.session.csrfToken){
            var token = data.create(secret);
            req.session.csrfToken = token;
        }
        res.locals.csrfToken = req.session.csrfToken;
        console.log(req.session.csrfToken + "gen");
        console.log("\n")
        next()
    } catch (error) {
        console.log(error);
    }
}



const verifyCSRFToken = (req, res, next) => {
    console.log("REACHED VERIFYING TOKEN");
    try {
        const csrfFromSession = req.session.csrfToken;
        const csrfFromRequest = req.body.csrfToken;
        console.log("\n");
        console.log(csrfFromSession + "\n" + csrfFromRequest + " " + "verifytoken");
        // Verify the tokens
        if(csrfFromRequest !== csrfFromSession){
            console.log(req.body);
            return res.status(403).json({
                result: false,
                message: "Invalid Token" + csrfFromRequest + " " + csrfFromSession
            })
        }
        next()
    } catch (error) {
        console.log(error);
        return
    }
}


module.exports = {
    generateCSRFToken,
    verifyCSRFToken,
}
