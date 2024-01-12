const router = require("express").Router();
const user = require("../models/user");
const { registerValidation } = require("../validation");

// registration

router.post("/register", async (req, res) => {
    // validate the user and password
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
        

    // check if the email is already registered

    // has the password

    // create a user object and save in the DB

});


// login
router.post("/login", async (req, res) => {
    //
    return res.status(200).json({msg: "Login route..."});
});

module.exports = router;