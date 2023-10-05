var tokens = require('csrf')
const data = new tokens({
    saltLength: 10,
    secretLength: 18,
});
const secret = data.secretSync();

const generateCSRFToken = (req, res, next) => {
    try {
        var token = data.create(secret);
        if(!req.session.csrfToken){
            req.session.csrfToken = token;
        }
        res.locals.csrfToken = req.session.csrfToken;
        console.log("HEY");
        console.log(req.session.csrfToken);
        next()
    } catch (error) {
        console.log(error);
    }
}



const verifyCSRFToken = (req, res, next) => {
    try {
        const csrfFromSession = req.session.csrfToken;
        const csrfFromRequest = req.body.csrfToken;
        // Verify the tokens
        if(csrfFromRequest !== csrfFromSession){
            console.log("BREAK");
            console.log(csrfFromRequest);
            console.log(csrfFromSession);
            console.log(req.body);
            res.status(403).json({
                result: false,
                message: "Invalid Token" + csrfFromRequest + csrfFromSession
            })
        }

        delete req.session.csrfToken
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
