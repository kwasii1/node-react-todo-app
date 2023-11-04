const protectRoute = (req,res,next) => {
    console.log("auth middleware");
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return res.json({user:req.user,auth:true})
    }

    return res.json({auth:false})
}

module.exports = {
    protectRoute
}