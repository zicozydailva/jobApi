const valid = (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(401).json("Email and Password field cannot be empty")        
    }
    next()
}

module.exports = valid